// ==UserScript==
// @name         网页定制（ChatGPT版）
// @namespace    your-namespace
// @version      1
// @description  自动生成网页定制脚本，支持深色模式、隐藏元素等功能，自动拉取更新脚本代码
// @match        https://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
  'use strict';
  // 仓库信息
  var owner = 'zyqq';
  var repo = 'chatgpt-web';
  var commit = 'main'

  // 下载最新的代码
  GM_xmlhttpRequest({
    method: 'GET',
    url:
      'https://raw.githubusercontent.com/' +
      owner +
      '/' +
      repo +
      '/' +
      commit +
      '/drawIframe.js',
    onload: function (response) {
      var scriptCode = response.responseText;
      eval(scriptCode);
    },
  });
})();
