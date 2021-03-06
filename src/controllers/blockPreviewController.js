/**
 * Block preview controller
 * @param $
 * @param selector
 * @param gmApi
 * @param addRule
 * @returns {{init: init}}
 * @constructor
 */
/* global Ioc */
var BlockPreviewController = function ($, selector, gmApi, addRule) { // jshint ignore:line
    var contentDocument = null;
    var selectedElement = null;
    var selectedPath = null;
    var iframeCtrl = Ioc.get('iframeController');

    /*
     Called from IframeController.showMenuItem to initialize view
     */
    var init = function (iframe, options) {
        selectedElement = options.element;
        selectedPath = options.path;
        currentElement = options.currentElement;
        contentDocument = iframe.contentDocument;
        selector.reset();
        bindEvents();
        hideElement();
    };

    var close = function () {
        showElement();
        iframeCtrl.removeIframe();
    };

    var bindEvents = function () {
        var menuEvents = {
            '.close': close,
            '#select-another-element': selectAnotherElement,
            '#end-preview': showDetailedMenu,
            '#block-element': blockElement
        };
        Object.keys(menuEvents).forEach(function (item) {
            $(contentDocument.querySelectorAll(item)).on('click', menuEvents[item]);
        });
    };

    var hideElement = function () {
        if (!selectedElement) {
            return;
        }
        $(selectedElement).addClass('sg_hide_element');
    };

    var showElement = function () {
        if (!selectedElement) {
            return;
        }
        $(selectedElement).removeClass('sg_hide_element');
    };

    var selectAnotherElement = function () {
        showElement();
        iframeCtrl.showSelectorMenu();
    };

    var blockElement = function () {
        if (gmApi.ADG_addRule) {
            gmApi.ADG_addRule(selectedPath, function () {
                iframeCtrl.removeIframe();
                CommonUtils.reloadPageBypassCache();
            });
        } else {
            selectedElement.style.display = 'none';
            addRule(selectedPath);
            iframeCtrl.removeIframe();
        }
    };

    var showDetailedMenu = function () {
        showElement();
        iframeCtrl.showSliderMenu(currentElement, selectedElement);
    };

    return {
        init: init
    };
};
