// ==UserScript==
// @name         网页定制（ChatGPT版）自动更新
// @author       yiqiuzheng
// @description  自动生成网页定制脚本，支持深色模式、隐藏元素等功能，自动拉取更新脚本代码
// @namespace    http://tampermonkey.net/
// @version      1.1
// @updateURL    https://raw.githubusercontent.com/zyqq/chatgpt-web/main/drawIframe.js
// @downloadURL  https://raw.githubusercontent.com/zyqq/chatgpt-web/main/drawIframe.js
// @match        http*://*/*
// @exclude      https://chatgpt-echo.zeabur.app/*
// @exclude      https://graph.qq.com/*
// @exclude      https://open.weixin.qq.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
  'use strict';
  // https://github.com/zyqq/ChatGPT-Tampermonkey.git
  // 仓库信息
  var owner = 'zyqq';
  var repo = 'chatgpt-web';

  // 如果您需要从 Github 拉取私有仓库的代码，您需要做以下几个步骤：
  // 在 Github 上创建一个新的 Personal access token。您可以在 Github 的 Settings 页面中的 Developer settings 下的 Personal access tokens 中创建一个新的 token。在创建 token 时，请确保选择了 repo 权限，以便使用 API 访问私有仓库。
  // 将 Personal access token 添加到油猴脚本中。您可以使用 GM_xmlhttpRequest 或 fetch API 发送请求时添加 Authorization 头，值为 Bearer xxx，其中 xxx 是您的 Personal access token。
  // Personal access token
  var accessToken = '';

  // 获取仓库信息
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://api.github.com/repos/' + owner + '/' + repo,
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    onload: function (response) {
      var repoData = JSON.parse(response.responseText);

      // 获取最新的提交 ID
      var commit = repoData.default_branch;
      if (repoData.hasOwnProperty('head_commit')) {
        commit = repoData.head_commit.id;
      }

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
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        onload: function (response) {
          var scriptCode = response.responseText;
          // console.log('scriptCode', scriptCode);
          // 存储最新的代码
          // GM_setValue('your-script', scriptCode);
          // 加载最新的代码
          // GM_getValue('your-script').then(function (scriptCode) {
            // if (scriptCode) {
              // eval(scriptCode);
            // }
          // });
          eval(scriptCode);
        },
      });
    },
  });
})();
