/**
 * Simple ioc implementation
 * @type {{add, get}}
 */
var Ioc = (function () { // jshint ignore:line
    var dependencies = {};

    var register = function (qualifier, obj) {
        dependencies[qualifier] = obj;
    };

    var get = function (func) {
        if (typeof func === 'string') {
            var resolved = dependencies[func];
            if (!resolved) {
                throw "Can't resolve " + func;
            }
            return resolved;
        }
        var resolvedDependencies = resolveDependencies(func);

        function FuncWrapper() {
            return func.apply(func, resolvedDependencies);
        }

        FuncWrapper.prototype = func.prototype;
        return new FuncWrapper();
    };

    var resolveDependencies = function (func) {
        var args = getArguments(func);
        var resolved = [];
        for (var i = 0; i < args.length; i++) {
            var depName = args[i].trim();
            var dep = dependencies[depName];
            if (!dep) {
                throw  "Can't find dependency: " + depName;
            }
            resolved.push(dependencies[depName]);
        }
        return resolved;
    };

    var getArguments = function (func) {
        //This regex is from require.js
        var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        var args = func.toString().match(FN_ARGS)[1].split(',');
        if (args[0] === "") {
            return [];
        }
        return args;
    };

    return {
        register: register,
        get: get
    };

})();
