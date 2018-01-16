/**
 * String utils
 */
var StringUtils = { // jshint ignore:line
    /**
     * Replaces the format items in a specified String with the text equivalents of the values of corresponding object instances.
     * @param format
     */
    format: function (format) {
        for (var i = 1; i < arguments.length; i++) {
            format = format.replace('{' + (i - 1) + '}', arguments[i]);
        }
        return format;
    }
};

/**
 * Common utils
 * @type {{getParentsLevel: Function, getNodeName: Function, getAllChilds: Function, getSingleChildren: Function, cropDomain: Function}}
 */
var CommonUtils = { // jshint ignore:line

    getParentsLevel: function (element) {
        var parent = element;
        var parentArr = [];
        while ((parent = parent.parentNode) && this.getNodeName(parent) !== "BODY") {
            parentArr.push(parent);
        }
        return parentArr;
    },

    getNodeName: function (element) {
        return element && element.nodeName ? element.nodeName.toUpperCase() : "";
    },

    getAllChildren: function (element) {
        var childArray = [];
        var child = element;
        while ((child = this.getSingleChildren(child))) {
            childArray.push(child);
        }
        return childArray;
    },

    getSingleChildren: function (element) {
        var children = element.childNodes;
        if (children) {
            var count = 0;
            var child;
            var i;
            for (i = 0; i < children.length; i++) {
                if (children[i].nodeType === 1) {
                    child = children[i];
                    count++;
                }
            }
            return count === 1 ? child : null;
        }
    },

    cropDomain: function (domain) {
        return domain.replace("www.", "").replace(/:\d+/, '');
    },

    /**
     * Force clear page cache
     * see: https://stackoverflow.com/questions/10719505/force-a-reload-of-page-in-chrome-using-javascript-no-cache/27058362#27058362
     */
    reloadPageBypassCache: function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', window.location.href, true);

        xhr.setRequestHeader('Pragma', 'no-cache');
        xhr.setRequestHeader('Expires', -1);
        xhr.setRequestHeader('Cache-Control', 'no-cache');

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                window.location.reload(true);
            }
        };

        xhr.send();
    },

    objectAssign: function() {
        var from;
        var to = {};

        for (var s = 0; s < arguments.length; s++) {
            from = Object(arguments[s]);

            if (from != null) {
                for (var key in from) {
                    if (hasOwnProperty.call(from, key)) {
                        to[key] = from[key];
                    }
                }
            }
        }

        return to;
    }
};

/**
 * Base64 implementation
 * @type {{_keyStr: string, encode: Base64.encode, decode: Base64.decode, _utf8_encode: Base64._utf8_encode, _utf8_decode: Base64._utf8_decode}}
 */
var Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            // jshint ignore:start
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            // jshint ignore:end

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
                Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = Base64._keyStr.indexOf(input.charAt(i++));
            enc2 = Base64._keyStr.indexOf(input.charAt(i++));
            enc3 = Base64._keyStr.indexOf(input.charAt(i++));
            enc4 = Base64._keyStr.indexOf(input.charAt(i++));

            // jshint ignore:start
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            // jshint ignore:end

            output = output + String.fromCharCode(chr1);

            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        // jshint ignore:start
        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        // jshint ignore:end

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c2 = 0;
        var c3 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63)); // jshint ignore:line
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)); // jshint ignore:line
                i += 3;
            }

        }
        return string;
    }
};
