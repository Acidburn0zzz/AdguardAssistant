// ==UserScript==
// @name Adguard Assistant
// [NAMES_IN_OTHER_LANGUAGES_PLACEHOLDER]
// @namespace Adguard
// @description Provides easy and convenient way to manage filtering right from the browser
// [DESCRIPTIONS_IN_OTHER_LANGUAGES_PLACEHOLDER]
// @version 4.0.15
// @downloadURL [DOWNLOAD_URL]
// @updateURL [UPDATE_URL]
// @include *
// @exclude *://mil.ru/*
// @exclude *://feedly.com/*
// @exclude *wikipedia.org*
// @exclude *icloud.com*
// @exclude *hangouts.google.com*
// @exclude *www.facebook.com/plugins/сomments*
// @exclude *www.facebook.com/v2.9/plugins*
// @exclude *disqus.com/embed/comments*
// @exclude *vk.com/widget*
// @exclude *twitter.com/intent/*
// @exclude *www.youtube.com/embed/*
// @exclude *player.vimeo.com*
// @exclude *coub.com/embed*
// @exclude *staticxx.facebook.com/connect/xd_arbiter/*
// @exclude *vk.com/q_frame*
// @exclude *tpc.googlesyndication.com*
// @exclude *syndication.twitter.com*
// @exclude *platform.twitter.com*
// @require src\utils\css.escape.js
// @require src\ioc.js
// @require src\log.js
// @require src\balalaika.patched.js
// @require src\settings.js
// @require src\utils\ui-utils.js
// @require src\utils\common-utils.js
// @require src\utils\punycode.js
// @require src\event.js
// @require src\selector\diff_match_patch.js
// @require src\selector\dom.patched.js
// @require src\selector\adguard-selector.js
// @require src\adguard-rules-constructor.js
// @require src\iframe.js
// @require src\gm.js
// @require src\slider-widget.js
// @require src\wot.js
// @require src\_locales\ru.js
// @require src\_locales\en.js
// @require src\_locales\fa.js
// @require src\_locales\he.js
// @require src\_locales\it.js
// @require src\_locales\pl.js
// @require src\_locales\uk.js
// @require src\_locales\zh.js
// @require src\_locales\de.js
// @require src\_locales\tr.js
// @require src\_locales\ja.js
// @require src\_locales\ar.js
// @require src\_locales\es-419.js
// @require src\_locales\pt-BR.js
// @require src\_locales\ko.js
// @require src\localization.js
// @require src\controllers\mainMenuController.js
// @require src\controllers\selectorMenuController.js
// @require src\controllers\sliderMenuController.js
// @require src\controllers\blockPreviewController.js
// @require src\controllers\settingsMenuController.js
// @require src\button.js
// @require src\main.js
// @resource button.css src\styles\button.css
// @resource selector.css src\styles\selector.css
// @resource button.html    src\templates\button.html
// @resource style.css  src\styles\style.css
// @resource mainMenu.html src\templates\mainMenu.html
// @resource selectorMenu.html src\templates\selectorMenu.html
// @resource sliderMenu.html src\templates\sliderMenu.html
// @resource blockPreview.html src\templates\blockPreview.html
// @resource settingsMenu.html src\templates\settingsMenu.html
// @grant   GM_getValue
// @grant   GM_setValue
// @grant   GM_getResourceText
// @grant   GM_addStyle
// @grant   property:settings
// ==/UserScript==
