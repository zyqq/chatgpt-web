// ==UserScript==
// @name           网页定制（ChatGPT版）
// @namespace      http://tampermonkey.net/
// @version        2023.03.30.01
// @author         yiqiuzheng
// @description    ChatGPT助手，无须繁琐的注册流程，无须key，直接与AI对话！
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAH1UExURUxpcXeqn3WqnHWonHSpnHWonHWpnG22knWpnHWpnHSmm3apm3SpnHWonHWpnHSonHWpnHWpm3apnXWpnHWpm3WpnP///8fc19fm43mrn67Nxf7///r8+6HFvNPk4JS8ssXb1XirnsDY0sPa1Pj7+qbHv5i/tXeqnvz9/X6uoo65roq2q+Tu7P3+/qrKwqDEu9bm4vP39qfIwPv9/NXl4ezz8Xqsn+nx73msn5/Dusnd2N7q59zp5pC6r4CwpKLFvIOxpszf2oSypsTa1fn7+/P49t/r6JrAt8LZ1L/X0d3q53aqnczf287h3Ie0qc7g3Pr8/LTQybDOxpvBuObv7c/h3PX5+Ory8ODr6OPt65G7sLnTzYWzp/n7+oi1qv7+/tTk4J7Cucve2Z3Cub7X0H+vo8LZ053CuKnJwff6+tnn4/3+/fD29XytoYWzqJe+tJa+tHapnHeqnaHEu8vf2oGxpazLw3utoMre2ZW9s7XRyu/19H2uou/186XHv6jJwNDi3sjd2OLt6u308ufw7tfm4rjTzK3MxOjw7tvp5dHi3sjd15m/tvL39q/Nxvb5+OPu64y3rIOyptnn5LbSy+Ds6eHs6tbl4cHZ0/v8/H6vo4GwpZ7Dus/h3fb6+ZK7sfT49/f6+aLFvavLw6zLxM3g28bc1pQLf2QAAAAVdFJOUwAtv5bz1PQH/dUuj5WQ/CyYwJHykqKEGP8AAAAJcEhZcwAAAHYAAAB2AU57JggAAAIcSURBVDjLhdNle9swEABgFdK0Kw7uHMfp6iTeAksaThpoUmZuV1x5zMxbx8wM7Xj7nZNjx/L2rNl9kXR6H51snwmhsWFTWQn8FSWGygKihLGmFP4ZpUXG7P5GWDcKZVEDeaKC1mfnHxUvoSV19YQOVFWTLdpiUfJ2POx/jOEzAy4tWU7KctPG95FpOjT0IA2PT80aSHEOpKQ5mSUxIA7bD2OzI5vdTNTt1QXBDvAxMT/7qkE+h8PdyoYC+DX0YgYyX4W+FwBunqYOhpp0YAl/1eN22Or5DPD8Jd6sBTiOZgYa8SfUysAMH+wWW/AK3ndbUWRADKUVMGIex1YrRGcs3uvYxcCzKVCAJTb66FZsFGDXTgHPMjD2WgWcFeCkHd/uoOshj0MD16QoLOI2+Q406ifpPXh4gisaOIXD4JiZXUoqwARx/Ab80zB7TJMzmK17nr4BK2eCOnocJGMMBBH9tO6FqYhveUJSwZsxBrpRDDltl6G3G7/8+K6AtLOZARu65hYwcLfL8s4l30EGCTzGwH6MA3Tew9u0Tp1HBmYOT+u+xZ62nl4AB91uGRQ+ZWAZ53HQqgMwgn3n6BC90+bl0nLJB51qH+QaphUD3EWuHVNuuhiQwlrPaS3n6zhEW+2G3I3TkSE3A5XalG860o/j/sSkcGAf62tS8MdvFfe3Oyf2tugyhBRB3qC/XuF/ADFWVOUHhFSXG4rXA78BYbiLJDUXqsMAAABXelRYdFJhdyBwcm9maWxlIHR5cGUgaXB0YwAAeJzj8gwIcVYoKMpPy8xJ5VIAAyMLLmMLEyMTS5MUAxMgRIA0w2QDI7NUIMvY1MjEzMQcxAfLgEigSi4A6hcRdPJCNZUAAAAASUVORK5CYII=
// @updateURL      https://raw.githubusercontent.com/zyqq/chatgpt-web/main/drawIframe.js
// @downloadURL    https://raw.githubusercontent.com/zyqq/chatgpt-web/main/drawIframe.js
// @match          http*://*/*
// @run-at         document-end
// @require        https://cdn.staticfile.org/vue/2.7.0/vue.min.js
// @require        https://unpkg.com/element-ui/lib/index.js
// @grant          GM_log
// @grant          GM_notification
// @grant          unsafeWindow
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_setClipboard
// @grant          GM_xmlhttpRequest
// @grant          GM_addElement
// @grant          GM_openInTab
// @grant          GM_getResourceText
// @grant          GM_registerMenuCommand
// @grant          GM_info
// @license        MIT
// ==/UserScript==

(function () {
  'use strict';

  const $ = (selector) => {
    return document.querySelector(selector);
  }
  const linkEl = document.createElement('link');
  linkEl.rel = 'stylesheet';
  linkEl.href =
    'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.15.13/theme-chalk/index.min.css';
  
  $("head").appendChild(linkEl);

  // 聊天按钮样式
  GM_addStyle(`
    .continue-chat {
        height: 32px;
        border-radius: 16px;
        font-weight: 400;
    }
    .primary-outline-button.btn {
        background: #ffffff;
        border: 1px solid rgba(56,114,224,.48);
        border-radius: 6px;
        align-items: center;
        height: 36px;
        display: flex;
        justify-content: center;
        font-weight: 700;
        font-size: 14px;
        color: #3872e0;
        line-height: 24px;
    }
    .primary-outline-button.btn:hover {
        background: #eff3ff;
    }
    .monica-btn {
        box-sizing: border-box;
        padding: 0 15px;
        cursor: pointer;
        user-select: none;
        -webkit-user-drag: none;
        white-space: nowrap;
    }
    .continue-chat .text {
        margin-left: 8px;
    }
  `)

  GM_addStyle(`
  
      .btn-area .btn-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          box-sizing: border-box;
          border: 1px solid #611fec;
          box-shadow: 0 2px #611fec;
          border-radius: 6px;
          background: rgba(255,255,255,.45);
          transition: background-color .2s ease,top .1s ease,box-shadow .1s ease;
          color: #212b36;
          cursor: pointer;
          user-select: none;
          -webkit-user-drag: none;
          position: relative;
          top: -1px;
      }
      .btn-area .btn-box .title {
          flex: 1;
          height: 100%;
          line-height: 24px;
          font-weight: 700;
          box-sizing: border-box;
          padding: 0 4px 0 8px;
          min-width: 0;
          max-width: 150px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          border-radius: 4px 0 0 4px;
          transition: all .2s ease-in-out;
      }
      .btn-box .title:hover {
          background: rgba(235,202,254,.24);
          text-decoration: none!important;
      }
    `)

  // 公用样式类
  GM_addStyle(`
    .flex {
      display: flex;
    }
    .flex-1 {
      flex: 1;
    }
    .items-center {
      align-items: center;
    }
    .justify-center {
      justify-content: center;
    }
    .mb-1 {
      margin-bottom: 10px;
    }
  `)

    //公共效果
  GM_addStyle(`
      #app{
        min-width:539px;
        right: 20px;
        top: 100px;
        z-index: 9999;
      }
    `
  )

  let vm = null;
  const createTabBox = () => {
    const tabBox = document.createElement('div')
    tabBox.id = 'app';
    tabBox.innerHTML = `
      <el-link type="success">成功执行：</el-link>
    `
    $('#customization-chat-room').appendChild(tabBox);
  }

  // 本地调试ChatGPT的iframe
  const domain = 'http://localhost:3000/#/';
  // 线上ChatGPT的iframe地址
  // const domain = 'https://chatgpt-echo.zeabur.app/';
  console.log('domain', domain);

  const isDomain = (platform) => {
    return window.location.host.includes(platform);
  };
  const getSearchContent = () => {
    if (isDomain('baidu')) {
      return $('#kw').value;
    } else if (isDomain('google')) {
      return $('#APjFqb').innerHTML;
    } else {
      return '';
    }
  };

  // 默认选项
  var defaultOptions = {
    apiKey: '',
    model: 'microsoft/DialoGPT-large',
    customization: [],
  };

  // 获取配置选项，并使用默认选项填充未定义的选项
  var getConfig = function () {
    var config = JSON.parse(localStorage.getItem('pageCustomizationConfig'));
    if (config) {
      config = Object.assign({}, defaultOptions, config);
    } else {
      config = defaultOptions;
    }
    return config;
  };

  // 保存新的配置选项
  var saveConfig = function (config) {
    localStorage.setItem('pageCustomizationConfig', JSON.stringify(config));
  };

  // 初始化配置
  var initConfig = function () {
    var config = getConfig();
    var apiKeyInput = document.querySelector('#api-key');
    if (apiKeyInput) {
      // “API密钥”输入框
      apiKeyInput.value = config.apiKey;
      apiKeyInput.addEventListener('change', function () {
        config.apiKey = apiKeyInput.value;
        saveConfig(config);
      });
    }
    var modelSelect = document.querySelector('#model-select');
    if (modelSelect) {
      // “交互模型”下拉框
      modelSelect.value = config.model;
      modelSelect.addEventListener('change', function () {
        config.model = modelSelect.value;
        saveConfig(config);
      });
    }
    var customizationInput = document.querySelector(
      '#customization-user-input'
    );
    if (customizationInput) {
      // “对网页的定制要求”输入框
      customizationInput.value = config.customization.join('\n');
      customizationInput.addEventListener('change', function () {
        config.customization = customizationInput.value
          .split('\n')
          .map(function (item) {
            return item.trim();
          });
        saveConfig(config);
      });
    }

    var saveButton = document.querySelector('#save-button');
    if (saveButton) {
      // “保存”按钮
      saveButton.addEventListener('click', function () {
        console.log('“保存”按钮');
        const userInput = document.querySelector('#customization-user-input');
        const chatHistory = document.querySelector(
          '#customization-chat-history'
        );
        var message = userInput.value.trim();
        if (message === '') {
          alert('请先输入定制要求！');
          return;
        }
        // 清空用户输入框
        userInput.value = '';
        // 在历史记录区域中显示用户发送的消息
        // var userMessage = document.createElement('p');
        // userMessage.className = 'customization-user-message';
        // userMessage.style.marginBottom = '10px';
        // userMessage.style.textAlign = 'right';
        // userMessage.textContent = message;
        // chatHistory.appendChild(userMessage);
        addUserMessage(message);
        var config = getConfig();
        getCode(config)
          .then(function (code) {
            const res = addCustomization(code);
            console.log('成功执行：', code, res);
            addAiMessage(code);
          })
          .catch(function (error) {
            console.log(error);
          });

        // 提示保存成功
        var successMessage = document.createElement('div');
        successMessage.innerHTML = '保存成功';
        successMessage.style.position = 'fixed';
        successMessage.style.top = '50%';
        successMessage.style.left = '50%';
        successMessage.style.transform = 'translate(-50%, -50%)';
        successMessage.style.backgroundColor = '#fff';
        successMessage.style.border = '2px solid #ddd';
        successMessage.style.padding = '10px';
        document.body.appendChild(successMessage);

        // 3 秒后移除提示信息
        setTimeout(function () {
          document.body.removeChild(successMessage);
        }, 3000);
      });
    }
  };

  // 获取chatgpt生成的代码
  var getCode = function (config) {
    // 调用chatgpt接口，获取生成的代码
    var url = 'https://chat.i.woa.com/api/generate';
    var headers = {
      'Content-Type': 'application/json',
    };
    var promise = fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        messages: Array.isArray(config.customization.join(''))
          ? config.customization.join('')
          : [
              {
                role: 'user',
                content: config.customization.join('')
                  ? config.customization.join('') +
                    '生成对应js代码，直接返回代码即可'
                  : config.customization.join(''),
              },
            ],
      }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('chatgpt接口调用出错');
        }
        return response.text();
      })
      .then(function (data) {
        var code = data;
        // 替换特殊字符，以便在脚本里使用
        const regex = /(?<=\`).*?(?=\`)/g;
        const matches = code.match(regex);

        return matches ? matches[0] : code;
      });
    return promise;
  };
  // 创建用户界面
  var createUI = function () {
    // 创建悬浮按钮
    var button = document.createElement('div');
    button.id = 'customization-button';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.borderRadius = '50%';
    button.style.backgroundColor = '#409EFF';
    button.style.color = '#fff';
    button.style.fontSize = '24px';
    button.style.textAlign = 'center';
    button.style.lineHeight = '50px';
    button.style.cursor = 'pointer';
    button.textContent = '⚙';

    // 创建侧边栏抽屉
    var drawer = document.createElement('div');
    drawer.id = 'customization-drawer';
    drawer.style.position = 'fixed';
    drawer.style.top = '0';
    drawer.style.right = '-500px';
    drawer.style.width = '500px';
    drawer.style.height = '100%';
    drawer.style.backgroundColor = '#f0f0f0';
    drawer.style.transition = 'right 0.3s ease';
    drawer.style.overflowY = 'auto';
    drawer.style.zIndex = '2000';

    // 创建关闭按钮
    var closeButton = document.createElement('div');
    closeButton.id = 'customization-close-button';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.width = '20px';
    closeButton.style.height = '20px';
    closeButton.style.borderRadius = '50%';
    closeButton.style.backgroundColor = '#aaa';
    closeButton.style.color = '#fff';
    closeButton.style.fontSize = '12px';
    closeButton.style.textAlign = 'center';
    closeButton.style.lineHeight = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '10000';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', function () {
      drawer.style.right = '-500px';
    });

    // 创建聊天室
    var chatRoom = document.createElement('div');
    chatRoom.id = 'customization-chat-room';
    chatRoom.style.height = '100%';

    chatRoom.innerHTML = `
      <el-tabs v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane label="ChatGPT" name="chatgpt">
          <div id="chatgpt-box" class="tab-item">
            <iframe id="chatgpt-iframe" src="${domain}"></iframe>
          </div>
        </el-tab-pane>
        <el-tab-pane label="插件管理" name="plugins">
          <div class="tab-item">
            <el-alert
              class="mb-1"
              title="勾选即下次进入网页自动生效，单击按钮即单次执行生效"
              type="success"
              show-icon>
            </el-alert>
            <el-collapse>
              <el-collapse-item :key="item.key" v-for="item in localCode">
                <template slot="title">
                  <el-checkbox @change="(isChecked) => handleCheckboxChange(isChecked, item)" v-model="item.isChecked">
                    <el-button size="mini" @click.stop="evalCode(item.content)">{{item.name}}</el-button>
                  </el-checkbox>
                </template>
                <el-input 
                  class="mb-1"
                  type="textarea"
                  autosize
                  v-model="item.content"
                ></el-input>
                <div class="flex justify-center">
                  <el-button class="flex-1" size="mini" @click.stop="updateStorageItem(item)">更新</el-button>
                  <el-button class="flex-1" size="mini" @click.stop="deleteStorageItem(item.key)">删除</el-button>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>
        <el-tab-pane label="跳转网页版" name="web">
          <div class="tab-item">
            跳转网页版
          </div>
        </el-tab-pane>
      </el-tabs>
    `;

            // <div :key="item.key" v-for="item in localCode">
            //   <el-checkbox v-model="item.isChecked">
            //     <el-button size="mini" @click="evalCode(item.content)">{{item.name}}</el-button>
            //   </el-checkbox>
            //   <el-input 
            //     type="textarea"
            //     autosize
            //     v-model="item.content"
            //   ></el-input>
            // </div>
    // 将聊天室添加到侧边栏抽屉中
    drawer.appendChild(closeButton);
    drawer.appendChild(chatRoom);

    // 将悬浮按钮和侧边栏抽屉添加到页面上
    document.body.appendChild(button);
    document.body.appendChild(drawer);

    // 点击悬浮按钮显示侧边栏抽屉
    button.addEventListener('click', function () {
      if (drawer.style.right === '-500px') {
        drawer.style.right = '0';
      } else {
        drawer.style.right = '-500px';
      }
    });

    // element
    GM_addStyle(`
      #customization-chat-room .el-tabs {
        height: 100%;
        background: #e7f8ff;
        overflow: hidden;
      }
      .el-tabs__active-bar {
        width: 58px!important;
      }
      
      .el-tabs__content {
        height: 99%;
        box-sizing: border-box;
      }
      
      .el-tab-pane {
        height: 99%;
        box-sizing: border-box;
      }
      .el-tabs__header {
        margin: 0;
        padding: 0 10px;
      }
      #chatgpt-iframe {
        width: 99%;
        height: 99%;
      }
      .el-collapse-item__header {
        padding: 0 10px;
      }
      .el-collapse-item__wrap {
        padding: 0 10px;
      }
    `)

    // 美化页面
    GM_addStyle(`
            .tab-item {
              margin: 10px;
              height: 100%;
            }
            #customization-chat-room {
                border-left: 1px solid #e5e8eb;
            }
            iframe {
                border: medium none;
            }
            #customization-button:hover {
                background-color: #66b1ff;
            }

            #customization-close-button:hover {
                background-color: #ff7875;
            }

            #customization-drawer::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }

            #customization-drawer::-webkit-scrollbar-thumb {
                background: #aaa;
                border-radius: 6px;
            }

            #customization-drawer::-webkit-scrollbar-track {
                background: #f0f0f0;
                border-radius: 6px;
            }

            #customization-user-input:focus {
                outline: none;
                border-color: #409eff;
            }
            #save-button:hover {
                background-color: #66b1ff;
            }
            #customization-chat-history {
                display: flex;
                flex-direction: column;
            }
            .customization-message-wrapper {
                margin: 10px;
                display: flex;
                justify-content: flex-end;
            }
            .customization-message-wrapper:hover {
                background-color: #eee;
                cursor: pointer;
            }
            .customization-message-bubble {
                max-width: 80%;
                padding: 10px;
                border-radius: 10px;
                margin-top: 5px;
                margin-bottom: 5px;
                font-size: 16px;
            }
            .customization-user-message {
                align-self: flex-end;
            }
            .customization-ai-message {
                align-self: flex-start;
            }
            .customization-user-message, .customization-ai-message {
                background-color: #409eff;
                color: white;
                padding: 8px;
                border-radius: 10px;
            }
            .customization-save-icon-wrapper {
                position: absolute;
                bottom: -10px;
            }
        `);
  };

  // 添加保存图标的函数
  var addSaveIcon = function (element) {
    var iconWrapper = document.createElement('span');
    iconWrapper.className = 'customization-save-icon-wrapper';
    iconWrapper.innerHTML = '💾';
    element.appendChild(iconWrapper);
    iconWrapper.addEventListener('click', function (event) {
      event.stopPropagation();
      var messageBubble = this.parentNode.querySelector(
        '.customization-message-bubble'
      );
      var config = getConfig();
      config.customization.push(messageBubble.textContent);
      saveConfig(config);
      // 提示保存成功
      var successMessage = document.createElement('div');
      successMessage.innerHTML = '保存成功';
      successMessage.style.position = 'fixed';
      successMessage.style.top = '50%';
      successMessage.style.left = '50%';
      successMessage.style.transform = 'translate(-50%, -50%)';
      successMessage.style.backgroundColor = '#fff';
      successMessage.style.border = '2px solid #ddd';
      successMessage.style.padding = '10px';
      document.body.appendChild(successMessage);

      // 3 秒后移除提示信息
      setTimeout(function () {
        document.body.removeChild(successMessage);
      }, 3000);
    });
  };

  const evalCode = (content) => {
    const myFunc = new Function(content);
    myFunc();
  }

  const showToast = (tips) => {
    // 提示保存成功
    var successMessage = document.createElement('div');
    successMessage.innerHTML = tips;
    successMessage.style.position = 'fixed';
    successMessage.style.top = '50%';
    successMessage.style.left = '50%';
    successMessage.style.transform = 'translate(-50%, -50%)';
    successMessage.style.backgroundColor = '#fff';
    successMessage.style.border = '1px solid #ddd';
    successMessage.style.borderRadius = '10px';
    successMessage.style.padding = '10px';
    successMessage.style.zIndex = '10000';
    document.body.appendChild(successMessage);

    // 3 秒后移除提示信息
    setTimeout(function () {
      document.body.removeChild(successMessage);
    }, 3000);
  };

  // 在历史记录区域中显示用户发送的消息
  var addUserMessage = function (message) {
    const chatHistory = document.querySelector('#customization-chat-history');
    var messageWrapper = document.createElement('div');
    messageWrapper.className = 'customization-message-wrapper';
    var messageBubble = document.createElement('div');
    messageBubble.className =
      'customization-message-bubble customization-user-message';
    messageBubble.textContent = message;
    messageWrapper.appendChild(messageBubble);
    chatHistory.appendChild(messageWrapper);
    // addSaveIcon(messageWrapper);
  };

  // 在历史记录区域中显示 AI 回复的消息
  var addAiMessage = function (message) {
    console.log('addAiMessage', message);
    const chatHistory = document.querySelector('#customization-chat-history');
    var messageWrapper = document.createElement('div');
    messageWrapper.className = 'customization-message-wrapper-left';
    var messageBubble = document.createElement('div');
    messageBubble.className =
      'customization-message-bubble customization-ai-message';
    messageBubble.textContent = message;
    messageWrapper.appendChild(messageBubble);
    chatHistory.appendChild(messageWrapper);

    // 在历史记录区域中显示 AI 回复的消息
    // var aiMessage = document.createElement('p');
    // aiMessage.className = 'customization-ai-message';
    // aiMessage.style.marginBottom = '10px';
    // aiMessage.style.textAlign = 'left';
    // aiMessage.textContent = code;
    // chatHistory.appendChild(aiMessage);
    // addSaveIcon(messageWrapper);
  };
  // 添加定制功能
  var addCustomization = function (code) {
    try {
      eval(code);
    } catch (err) {
      console.log(err);
    }
  };

  function copyToClipboard(text) {
    try {
      navigator.clipboard.writeText(text);
      showToast('复制成功');
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        showToast('复制成功');
      } catch (error) {
        showToast('复制失败，请手动复制');
      }
      document.body.removeChild(textArea);
    }
  }

  const handleTextAutoHeight = () => {
    var textarea = document.querySelector('textarea');
    
    textarea.addEventListener('input', (e) => {
        textarea.style.height = '100px';
        textarea.style.height = e.target.scrollHeight + 'px';
    });
  }

  const creatChatBtn = (parentNode) => {
    const btnBox = document.createElement('div');
    btnBox.id = 'chatBtn';
    btnBox.className = "monica-btn btn continue-chat primary-outline-button"
    btnBox.innerHTML = `
      <svg aria-hidden="true" focusable="false" role="img" class="octicon octicon-comment" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;"><path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
      </svg>
      <span class="text">在聊天中继续</span>
    `

    parentNode && parentNode.appendChild(btnBox);
    $('#chatBtn').addEventListener('click', () => {
      $('#customization-drawer').style.right = 0;
    });
  }

  const creatBtn = ({parentNode, btnText, clickFn}) => {
    console.log('creatBtn', parentNode, btnText)
    const btnBox = document.createElement('div');
    btnBox.className = 'btn-area'
    btnBox.innerHTML = `
      <div class="btn-box">
        <div class="title">${btnText}</div>
      </div>
    `
    parentNode && parentNode.appendChild(btnBox);
    btnBox.addEventListener('click', () => {
      clickFn && clickFn();
    })
  }

  // 谷歌搜索ChatGPT应答
  const generateSearchEnhance = () => {
    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'chatgpt-search-enhance';
    messageWrapper.id = 'chatgpt-search-enhance';
    // <span class="toolbar-item-EhZYV5">
    //   <svg width="16" height="16" fill=" none" viewBox="0 0 16 16" style="min-width: 16px; min-height: 16px;">
    //     <g><path fill="currentColor" d="M6.667 4.814 4.402 6.667H2v2.667h2.402l2.265 1.853V4.814Zm-2.741 5.853H1.333A.666.666 0 0 1 .667 10V6a.667.667 0 0 1 .666-.666h2.593l3.53-2.888A.333.333 0 0 1 8 2.704v10.593a.333.333 0 0 1-.545.258l-3.528-2.888h-.001Zm9.011 2.756-.944-.944A5.985 5.985 0 0 0 14 8a5.988 5.988 0 0 0-2.203-4.645l.947-.947A7.317 7.317 0 0 1 15.334 8a7.315 7.315 0 0 1-2.397 5.423Zm-2.362-2.362-.948-.948A2.662 2.662 0 0 0 10.667 8c0-.953-.5-1.79-1.254-2.261l.96-.96A3.995 3.995 0 0 1 12 8a3.991 3.991 0 0 1-1.425 3.061Z" data-follow-fill="#838BA7"></path></g></svg>
    // </span>
    // <span class="toolbar-item-EhZYV5">
    //   <svg width="16" height="16" fill="none" viewBox="0 0 16 16" style="min-width: 16px; min-height: 16px;"><g><path data-follow-stroke="currentColor" d="M12.243 12.243a6 6 0 1 1 0-8.485C12.795 4.31 14 5.666 14 5.666" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path data-follow-stroke="currentColor" d="M14 2.668v3h-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></g>
    //   </svg>
    // </span>
    messageWrapper.innerHTML = `
        <div class="header-7QHGYk">
          <div class="lt-znd2I9">
            <a class="title" href="${domain}" target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" fill="none" class="user-avatar"><defs><path id="bot_svg__a" d="M0 0h30v30H0z"></path><path id="bot_svg__c" d="M0 0h20.455v20.455H0z"></path></defs><g><rect fill="#E7F8FF" width="30" height="30" rx="10"></rect><mask id="bot_svg__b" fill="#fff"><use xlink:href="#bot_svg__a"></use></mask><g mask="url(#bot_svg__b)"><g transform="translate(4.773 4.773)"><mask id="bot_svg__d" fill="#fff"><use xlink:href="#bot_svg__c"></use></mask><g mask="url(#bot_svg__d)"><path fill-rule="evenodd" d="M19.11 8.37c.17-.52.26-1.06.26-1.61 0-.9-.24-1.79-.71-2.57a5.24 5.24 0 0 0-4.53-2.59c-.37 0-.73.04-1.09.11A5.201 5.201 0 0 0 9.17 0h-.04C6.86 0 4.86 1.44 4.16 3.57A5.11 5.11 0 0 0 .71 6.04C.24 6.83 0 7.72 0 8.63c0 1.27.48 2.51 1.35 3.45-.18.52-.27 1.07-.27 1.61 0 .91.25 1.8.71 2.58 1.13 1.94 3.41 2.94 5.63 2.47a5.18 5.18 0 0 0 3.86 1.71h.05c2.26 0 4.27-1.44 4.97-3.57a5.132 5.132 0 0 0 3.45-2.47c.46-.78.7-1.67.7-2.58 0-1.28-.48-2.51-1.34-3.46ZM8.947 18.158c-.04.03-.08.05-.12.07.7.58 1.57.89 2.48.89h.01c2.14 0 3.88-1.72 3.88-3.83v-4.76c0-.02-.02-.04-.04-.05l-1.74-.99v5.75c0 .23-.13.45-.34.57l-4.13 2.35Zm-.67-1.153 4.17-2.38c.02-.01.03-.03.03-.05v-1.99l-5.04 2.87c-.21.12-.47.12-.68 0l-4.13-2.35c-.04-.02-.09-.06-.12-.07-.04.21-.06.43-.06.65 0 .67.18 1.33.52 1.92v-.01c.7 1.19 1.98 1.92 3.37 1.92.68 0 1.35-.18 1.94-.51ZM3.903 5.168v-.14c-.85.31-1.57.9-2.02 1.68a3.78 3.78 0 0 0-.52 1.91c0 1.37.74 2.64 1.94 3.33l4.17 2.37c.02.01.04.01.06 0l1.75-1-5.04-2.87a.64.64 0 0 1-.34-.57v-4.71Zm13.253 3.337-4.18-2.38c-.02 0-.04 0-.06.01l-1.74.99 5.04 2.87c.21.12.34.34.34.58v4.85c1.52-.56 2.54-1.99 2.54-3.6 0-1.37-.74-2.63-1.94-3.32ZM8.014 5.83c-.02.01-.03.03-.03.05v1.99L13.024 5a.692.692 0 0 1 .68 0l4.13 2.35c.04.02.08.05.12.07.03-.21.05-.43.05-.65 0-2.11-1.74-3.83-3.88-3.83-.68 0-1.35.18-1.94.51l-4.17 2.38Zm1.133-4.492c-2.15 0-3.89 1.72-3.89 3.83v4.76c0 .02.02.03.03.04l1.75 1v-5.75c0-.23.13-.45.34-.57l4.13-2.35c.04-.03.09-.06.12-.07-.7-.58-1.58-.89-2.48-.89ZM7.983 11.51l2.24 1.27 2.25-1.27V8.95l-2.25-1.28-2.24 1.28v2.56Z" style="fill: rgb(31, 148, 140);"></path></g></g></g></g></svg>
              <span>ChatGPT</span>
            </a>
          </div>
          <div id="header-right" class="header-right">
            <div id="toolbar" class="toolbar">
               <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                <span title="复制" class="toolbar-item-EhZYV5">
                  <svg id="copy" width="16" height="16" fill="none" viewBox="0 0 16 16" style="min-width: 16px; min-height: 16px;"><g><path data-follow-stroke="currentColor" d="M4.334 4.145v-1.54c0-.517.42-.937.937-.937h8.125c.518 0 .938.42.938.937v8.125c0 .518-.42.938-.938.938H11.84" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path data-follow-stroke="currentColor" d="M10.729 4.332H2.604a.937.937 0 0 0-.938.938v8.125c0 .517.42.937.938.937h8.125c.517 0 .937-.42.937-.938V5.27a.937.937 0 0 0-.938-.938Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></g>
                  </svg>
                </span>
              </el-tooltip>
            </div>

          </div>
        </div>
        <div id="answer" class="answer">
        </div>
        <div id="footer" class="footer">
        </div>
    `;
    GM_addStyle(`
      .chatgpt-search-enhance {
        border-radius: 8px;
        border: 1px solid #dadce0;
        padding: 0 16px;
      }
      .chatgpt-search-enhance .header-7QHGYk {
          height: 56px;
          display: flex;
          box-sizing: border-box;
      }
      .header-7QHGYk .lt-znd2I9 .title span {
        font-size: 15px;
        color: #000;
        font-weight: 700;
    }
      .chatgpt-search-enhance .header-7QHGYk .lt-znd2I9 {
          display: inline-flex;
          align-items: center;
          gap: 6px;
      }
      .chatgpt-search-enhance .header-7QHGYk .lt-znd2I9 .title {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          gap: 6px;
      }
      .chatgpt-search-enhance .header-7QHGYk .header-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
      }
      .chatgpt-search-enhance .header-7QHGYk .header-right .btn-area {
          height: 24px;
      }
      .toolbar {
          display: none;
          align-items: center;
          gap: 8px;
          color: #595959;
      }
      .toolbar-item-EhZYV5 svg:hover {
        cursor: pointer;
      }
      .title:hover {
        cursor: pointer;
        user-select: none;
        -webkit-user-drag: none;
        text-decoration: none;
        color: #3872e0!important;
        background-color: transparent;
      }
      .footer {
        box-sizing: border-box;
        display: none;
        align-items: center;
        margin: 16px 0;
      }
    `);
    const searchBox = document.getElementById(
      isDomain('google') ? 'rhs' : 'content_right'
    );
    searchBox?.appendChild(messageWrapper);
    creatChatBtn($('#footer'));
    creatBtn({
      parentNode: $('#header-right'), 
      btnText: '询问ChatGPT', 
      clickFn: () => {
        postMsg({
          type: 'search', 
          content: getSearchContent()
        })
        $('#answer').innerHTML = '加载中...'
      }
    })
    $('#copy').addEventListener('click', () => {
      const text = $('#answer').innerHTML;
      console.log('text', text);
      copyToClipboard(text);
    });
  };

  // 谷歌搜索ChatGPT应答
  const handleGoogleSearch = () => {
    window.addEventListener('load', () => {
      generateSearchEnhance();
    });
  };

  const postMsg = ({ type, ...data }) => {
    const chatgptIframe = $('#chatgpt-iframe');
    chatgptIframe.contentWindow.postMessage(
      { data, type, origin: 'parent' },
      domain
    );
  };

  const extractArticle = () => {
    // 判断节点是否是文本节点
    function isText(node) {
      return node.nodeType === Node.TEXT_NODE;
    }

    // 获取节点的纯文本内容
    function getTextContent(node) {
      return node.textContent.trim();
    }

    // 判断节点是否是文章相关的节点
    function isArticleNode(node) {
      // 判断节点是否是 P 标签
      if (node.nodeName === 'P') {
        // 判断节点是否是空节点
        if (getTextContent(node) === '') {
          return false;
        }

        return true;
      }

      // 判断节点是否是 H 标签
      if (/^H[1-6]$/.test(node.nodeName)) {
        // 判断节点是否是空节点
        if (getTextContent(node) === '') {
          return false;
        }

        return true;
      }

      // 判断节点是否是 UL 和 OL 标签
      if (node.nodeName === 'UL' || node.nodeName === 'OL') {
        // 判断节点下是否有 LI 标签
        return node.querySelector('li') !== null;
      }

      // 判断节点是否是 DIV 标签
      if (node.nodeName === 'DIV') {
        // 判断节点是否是空节点
        if (getTextContent(node) === '') {
          return false;
        }

        // 判断节点是否属于文章的正文部分
        if (
          node.classList.contains('page-main_content') ||
          node.classList.contains('content-main')
        ) {
          return true;
        }

        return false;
      }

      // 判断节点是否是 SECTION 和 ARTICLE 标签
      if (node.nodeName === 'SECTION' || node.nodeName === 'ARTICLE') {
        // 判断节点下是否存在 P、H、UL、OL、DIV 标签
        return node.querySelector('p,h1,h2,h3,h4,h5,h6,ul,ol,div') !== null;
      }

      return false;
    }

    // 获取文章相关的节点列表
    function getArticleNodes() {
      const articleNodes = [];

      function traverse(node) {
        // 如果节点是文章相关的节点，则加入列表
        if (isArticleNode(node)) {
          articleNodes.push(node);
        }

        // 遍历节点的子节点
        node.childNodes.forEach((childNode) => {
          traverse(childNode);
        });
      }

      traverse(document.body);

      return articleNodes;
    }

    // 获取文章的纯文本内容
    function getArticleText() {
      const articleNodes = getArticleNodes();

      let text = '';

      articleNodes.forEach((node) => {
        text += getTextContent(node) + '\n';
      });

      // 去掉多余的空格和换行符
      text = text.replace(/\s{2,}/g, ' ').trim();

      return text;
    }

    const result = getArticleText();
    console.log(result);
    const splitStr = (str) => {
      const maxLength = 4400; // 每个字符串的最大长度
      const strArr = []; // 存放切割后的字符串数组
      let temp = ''; // 临时变量用来拼接字符串
      for (let i = 0; i < str.length; i++) {
        temp += str[i];
        if ((i + 1) % maxLength === 0 || i === str.length - 1) {
          // 到达最大长度，或者到达字符串最后
          strArr.push(temp);
          temp = '';
        }
      }
      return strArr;
    };
    const formatResult = splitStr(result);
    console.log('formatResult', formatResult);
    return formatResult;
  };

  // 计算输入框大小
  // input：(必填)输入框
  // rowh：(必填)当没有内容时默认高度，如果不传当没有内容时会没高度
  // colw：(可选)当没有内容时默认宽度，如果不传宽度会很窄
  function inputSizeChange (textarea) {
    let text = textarea.value;
    let lines = text.split("\n");
    let lineHeight = 32;
    let height = lines.length * lineHeight;
    console.log('inputSizeChange', lineHeight, lines.length, lines)
    textarea.style.height = height + "px";
  }

  // 获取油猴脚本信息
  const getCodeInfo = (content) => {
    const match = content.match(/@name\s+([\w\s]+)\n/);
    const name = match ? match[1].trim() : "未命名脚本";
    console.log(name); // 输出 "滚动到顶部按钮"
    return {name};
  }

  // 处理监听ChatGPT-web的消息
  const handlePostMessage = () => {
    // 父级，在frame处抛出接收事件
    window.addEventListener(
      'message',
      (event) => {
        // console.log('msg', event.data, event);
        if (event.data.origin && event.data.origin === 'chatgpt-web') {
          console.log('chatgpt-web', event.data, event);
          const { content, key } = event.data.data
          if (event.data.type === 'code') {
            evalCode(content);
            const chatgptKey = `chatgpt-${key}`
            const item = localStorage.getItem(chatgptKey)
            console.log('chatgpt-web', item)
            const {name} = getCodeInfo(content);
            const storageItem = 
              {
                content,
                key: chatgptKey,
                isChecked: true,
                name,
              };
            localStorage.setItem(
              chatgptKey, JSON.stringify(storageItem));
              console.log('chatgpt-web222', vm);
            vm.$options.methods.updateStorageItem(storageItem)
          }
          if (event.data.type === 'read') {
            console.log('阅读文章');
            const article = extractArticle();
            postMsg({ type: 'read', content: article });
          }
          if (event.data.type === 'search') {
            $('#answer').innerHTML =
              event.data.data.content;
            $('#footer').style.display = 'flex';
            $('#toolbar').style.display = 'inline-flex';
          }
          if(event.data.type === 'selectText') {
            console.log('re', event.data.data.content)
            $('#selectResult').value = event.data.data.content;
            $('#selectResult').addec
            inputSizeChange($('#selectResult'))
          }
        }
      },
      false
    );
  };

  let dialogBox = null;
  function setDialogBoxPos() {
    let sel = window.getSelection();
    let range = sel.getRangeAt(0);
    let rect = range.getBoundingClientRect();

    dialogBox.style.top = rect.bottom + window.pageYOffset + 'px';
    dialogBox.style.left =
      (rect.left + rect.right) / 2 + window.pageXOffset + 'px';
  }

  function addClickAndPostMsg({targetId, type, content, resultId, clickFn}) {
    $(`#${targetId}`).addEventListener('click', () => {
      postMsg({type, content});
      $(`#${resultId}`).value = '加载中...'
      clickFn && clickFn();
    })
  }

  function createDialogBox() {
    dialogBox = document.createElement('div');
    dialogBox.id = 'floatDialog';
    dialogBox.style.position = 'absolute';
    dialogBox.style.backgroundColor = 'white';
    dialogBox.style.padding = '10px';
    dialogBox.style.zIndex = '999';
    dialogBox.style.display = "none";
    dialogBox.style.borderRadius = "8px";
    dialogBox.style.border = "1px solid #dadce0";
    const briefContent = document.createElement('div');
    briefContent.id = 'briefContent';
    briefContent.style.alignItems = 'center';
    briefContent.innerHTML = `
      <div class="brief-title lt-znd2I9">
        <a class="title" href="${domain}" target="_blank" rel="noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" fill="none" class="user-avatar"><defs><path id="bot_svg__a" d="M0 0h30v30H0z"></path><path id="bot_svg__c" d="M0 0h20.455v20.455H0z"></path></defs><g><rect fill="#E7F8FF" width="30" height="30" rx="10"></rect><mask id="bot_svg__b" fill="#fff"><use xlink:href="#bot_svg__a"></use></mask><g mask="url(#bot_svg__b)"><g transform="translate(4.773 4.773)"><mask id="bot_svg__d" fill="#fff"><use xlink:href="#bot_svg__c"></use></mask><g mask="url(#bot_svg__d)"><path fill-rule="evenodd" d="M19.11 8.37c.17-.52.26-1.06.26-1.61 0-.9-.24-1.79-.71-2.57a5.24 5.24 0 0 0-4.53-2.59c-.37 0-.73.04-1.09.11A5.201 5.201 0 0 0 9.17 0h-.04C6.86 0 4.86 1.44 4.16 3.57A5.11 5.11 0 0 0 .71 6.04C.24 6.83 0 7.72 0 8.63c0 1.27.48 2.51 1.35 3.45-.18.52-.27 1.07-.27 1.61 0 .91.25 1.8.71 2.58 1.13 1.94 3.41 2.94 5.63 2.47a5.18 5.18 0 0 0 3.86 1.71h.05c2.26 0 4.27-1.44 4.97-3.57a5.132 5.132 0 0 0 3.45-2.47c.46-.78.7-1.67.7-2.58 0-1.28-.48-2.51-1.34-3.46ZM8.947 18.158c-.04.03-.08.05-.12.07.7.58 1.57.89 2.48.89h.01c2.14 0 3.88-1.72 3.88-3.83v-4.76c0-.02-.02-.04-.04-.05l-1.74-.99v5.75c0 .23-.13.45-.34.57l-4.13 2.35Zm-.67-1.153 4.17-2.38c.02-.01.03-.03.03-.05v-1.99l-5.04 2.87c-.21.12-.47.12-.68 0l-4.13-2.35c-.04-.02-.09-.06-.12-.07-.04.21-.06.43-.06.65 0 .67.18 1.33.52 1.92v-.01c.7 1.19 1.98 1.92 3.37 1.92.68 0 1.35-.18 1.94-.51ZM3.903 5.168v-.14c-.85.31-1.57.9-2.02 1.68a3.78 3.78 0 0 0-.52 1.91c0 1.37.74 2.64 1.94 3.33l4.17 2.37c.02.01.04.01.06 0l1.75-1-5.04-2.87a.64.64 0 0 1-.34-.57v-4.71Zm13.253 3.337-4.18-2.38c-.02 0-.04 0-.06.01l-1.74.99 5.04 2.87c.21.12.34.34.34.58v4.85c1.52-.56 2.54-1.99 2.54-3.6 0-1.37-.74-2.63-1.94-3.32ZM8.014 5.83c-.02.01-.03.03-.03.05v1.99L13.024 5a.692.692 0 0 1 .68 0l4.13 2.35c.04.02.08.05.12.07.03-.21.05-.43.05-.65 0-2.11-1.74-3.83-3.88-3.83-.68 0-1.35.18-1.94.51l-4.17 2.38Zm1.133-4.492c-2.15 0-3.89 1.72-3.89 3.83v4.76c0 .02.02.03.03.04l1.75 1v-5.75c0-.23.13-.45.34-.57l4.13-2.35c.04-.03.09-.06.12-.07-.7-.58-1.58-.89-2.48-.89ZM7.983 11.51l2.24 1.27 2.25-1.27V8.95l-2.25-1.28-2.24 1.28v2.56Z" style="fill: rgb(31, 148, 140);"></path></g></g></g></g></svg>
        </a>
      </div>
      <div class="action-bar-lite-window-vuGdUx action-bar-SA76od" style="opacity: 1;">
        <div class="box-NzPGeV">
          <span id="explain" data-id="751059" class="tag-button tag-button-active-y5uMAc" style="opacity: 1; pointer-events: auto;"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" style="min-width: 16px; min-height: 16px;"><g><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="currentColor" d="M16.5 3v9l-3-2.25-3 2.25V3M4.5 20.25V21H18" data-follow-stroke="#000"></path><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="currentColor" d="M4.5 20.25A2.25 2.25 0 0 1 6.75 18H19.5V3H6.75A2.25 2.25 0 0 0 4.5 5.25v15Z" data-follow-stroke="#000"></path></g></svg>
            <span class="text-wrapper-92ojRl" data-text="解释">
              <span class="text-0Pw8ng">解释</span>
            </span>
          </span>
      </div>
    `
    dialogBox.appendChild(briefContent);
    const complateContent = document.createElement('div');
    complateContent.id = 'complateContent';

    complateContent.innerHTML = `
      <div id="dialogBoxSelectBox">
        <h5 id="dialogBoxSelectTitle">选中文本<h5/>
        <textarea class="text-area" id="selectVal"></textarea>
      <div>
      <div id="selectActions">
        <div class="action-bar-lite-window-vuGdUx action-bar-SA76od" style="opacity: 1;">
          <div class="box-NzPGeV">
            <div id="summary" data-id="751061" class="tag-button" style="opacity: 1; pointer-events: auto;">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style="min-width: 16px; min-height: 16px;"><g><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="currentColor" d="M10.5 10.5h6M10.5 13.5h6M19.5 3.75h-15a.75.75 0 0 0-.75.75v15c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75v-15a.75.75 0 0 0-.75-.75ZM7.5 3.75v16.5" data-follow-stroke="#000"></path></g></svg>
              <div class="text-wrapper-92ojRl" data-text="总结"><div class="text-0Pw8ng">摘要</div></div></div>
            <span id="grammar" data-id="1924664" class="tag-button" style="opacity: 1; pointer-events: auto;"><svg width="16" height="16" fill="none" viewBox="0 0 32 32" style="min-width: 16px; min-height: 16px;"><g><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="currentColor" d="m27 26-5-10-5 10M18.428 23.143h7.143M5 18h9M5 23h9M5.006 8h21M5.006 13h21" data-follow-stroke="#000"></path></g></svg>
              <span class="text-wrapper-92ojRl" data-text="语法"><span class="text-0Pw8ng">语法</span></span></span>
            <span id="explainCode" data-id="1924663" class="tag-button" style="opacity: 1; pointer-events: auto;"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" style="min-width: 16px; min-height: 16px;"><g><path fill="currentColor" d="M7.8 19.2H7A1.2 1.2 0 0 1 5.8 18v-4.1a1.8 1.8 0 0 0-1.236-1.71L3.987 12l.577-.19A1.8 1.8 0 0 0 5.8 10.1V6A1.2 1.2 0 0 1 7 4.8h.8V3.2H7A2.8 2.8 0 0 0 4.2 6v3.7a1.7 1.7 0 0 1-1.7 1.7h-.3v1.2h.3a1.7 1.7 0 0 1 1.7 1.7V18A2.8 2.8 0 0 0 7 20.8h.8v-1.6ZM16.2 19.2h.8a1.2 1.2 0 0 0 1.2-1.2v-4.1a1.8 1.8 0 0 1 1.236-1.71l.577-.19-.577-.19A1.8 1.8 0 0 1 18.2 10.1V6A1.2 1.2 0 0 0 17 4.8h-.8V3.2h.8A2.8 2.8 0 0 1 19.8 6v3.7a1.701 1.701 0 0 0 1.7 1.7h.3v1.2h-.3a1.7 1.7 0 0 0-1.7 1.7V18a2.8 2.8 0 0 1-2.8 2.8h-.8v-1.6Z" clip-rule="evenodd" fill-rule="evenodd" data-follow-fill="#09121F"></path></g></svg>
              <span class="text-wrapper-92ojRl" data-text="解释代码"><span class="text-0Pw8ng">解释代码</span></span></span>
            <span id="rewrite" data-id="1924662" class="tag-button" style="opacity: 1; pointer-events: auto;"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" style="min-width: 16px; min-height: 16px;"><g><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="currentColor" d="M12.75 6 18 11.25M20.25 20.25H9l-5.202-5.202" data-follow-stroke="#000"></path><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="currentColor" d="M9 20.25H4.5a.75.75 0 0 1-.75-.75v-4.19a.75.75 0 0 1 .22-.53L15.22 3.53a.75.75 0 0 1 1.06 0l4.19 4.19a.75.75 0 0 1 0 1.06L9 20.25Z" data-follow-stroke="#000"></path></g></svg>
              <span class="text-wrapper-92ojRl" data-text="重写"><span class="text-0Pw8ng">重写</span></span></span>
            <span id="explain" data-id="751059" class="tag-button tag-button-active-y5uMAc" style="opacity: 1; pointer-events: auto;"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" style="min-width: 16px; min-height: 16px;"><g><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="currentColor" d="M16.5 3v9l-3-2.25-3 2.25V3M4.5 20.25V21H18" data-follow-stroke="#000"></path><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="currentColor" d="M4.5 20.25A2.25 2.25 0 0 1 6.75 18H19.5V3H6.75A2.25 2.25 0 0 0 4.5 5.25v15Z" data-follow-stroke="#000"></path></g></svg>
              <span class="text-wrapper-92ojRl" data-text="解释"><span class="text-0Pw8ng">解释</span></span></span>
            <span id="translate" data-id="751060" class="tag-button" style="opacity: 1; pointer-events: auto;"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" style="min-width: 16px; min-height: 16px;"><g><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="currentColor" d="M21.75 20.25 16.5 9.75l-5.25 10.5M12.75 17.25h7.5M8.25 3v2.25M2.25 5.25h12M11.25 5.25a9 9 0 0 1-9 9" data-follow-stroke="#000"></path><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="currentColor" d="M5.763 8.25a9.004 9.004 0 0 0 8.486 5.997" data-follow-stroke="#000"></path></g></svg>
              <span class="text-wrapper-92ojRl" data-text="翻译"><span class="text-0Pw8ng">翻译</span></span></span>
            <span id="qa" data-id="1924661" class="tag-button" style="opacity: 1; pointer-events: auto;"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" style="min-width: 16px; min-height: 16px;"><g><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="currentColor" d="M20.95 11.625a8.625 8.625 0 0 1-8.625 8.625H3.7v-8.625a8.625 8.625 0 0 1 17.25 0Z" data-follow-stroke="#000"></path><path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="currentColor" d="M12.325 13.62v-1.725a2.587 2.587 0 1 0-2.588-2.588" data-follow-stroke="#000"></path><path fill="currentColor" d="M12.325 17.501a1.078 1.078 0 1 0 0-2.156 1.078 1.078 0 0 0 0 2.156Z" clip-rule="evenodd" fill-rule="evenodd" data-follow-fill="#000"></path></g></svg>
              <span class="text-wrapper-92ojRl" data-text="问答"><span class="text-0Pw8ng">问答</span></span></span>
            <span id="expansion" data-id="1924660" class="tag-button" style="opacity: 1; pointer-events: auto;"><svg width="16" height="16" fill="none" viewBox="0 0 16 16" style="min-width: 16px; min-height: 16px;"><g><path data-follow-stroke="#637381" d="M10 3h3v3m-3.5.5L13 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path data-follow-stroke="#37404A" d="M6 13H3v-3m3.5-.5L3 13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
              <span class="text-wrapper-92ojRl" data-text="扩写"><span class="text-0Pw8ng">扩写</span></span></span></div>
        </div>
      </div>
      <div>
        <h5 id="dialogBoxResultTitle">结果<h5/>
        <textarea class="text-area" id="selectResult"></textarea>
      <div>
    `;
    GM_addStyle(`
      .brief-title {
        margin-right: 10px;
      }
      .text-area {
        width: 99%;
      }
      #selectActions {
        margin-top: 10px;
      }
      .action-bar-SA76od.action-bar-lite-window-vuGdUx .box-NzPGeV {
          justify-content: left;
      }
      .action-bar-SA76od .box-NzPGeV {
          min-width: 0;
          display: inline-flex;
          flex-flow: wrap;
          height: 24px;
          gap: 10px;
          align-content: flex-start;
          justify-content: right;
      }
      .action-bar-SA76od .box-NzPGeV {
          min-width: 0;
          display: inline-flex;
          flex-flow: wrap;
          height: 24px;
          gap: 10px;
          align-content: flex-start;
          justify-content: right;
      }
      .tag-button {
          position: relative;
          cursor: pointer;
          user-select: none;
          -webkit-user-drag: none;
          height: 24px;
          min-height: 24px;
          padding: 0 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(56,114,224,.48);
          border-radius: 4px;
          font-size: 13px;
          color: #3872e0;
          gap: 4px;
          max-width: 150px;
          background: #fff;
      }
      .tag-button .text-wrapper-92ojRl {
          flex: 1;
          min-width: 0px;
          display: flex;
          flex-direction: column;
      }
      .tag-button .text-wrapper-92ojRl {
          flex: 1;
          min-width: 0px;
          display: flex;
          flex-direction: column;
      }
      .tag-button:hover {
          background: rgba(235,202,254,.24);
          text-decoration: none!important;
      }
    `);
    dialogBox.appendChild(complateContent);
    document.body.appendChild(dialogBox);
    creatChatBtn(complateContent);
    $('#briefContent').addEventListener('click', () => {
      $('#briefContent').style.display = 'none';
      complateContent.style.display= 'block';
    })
    addClickAndPostMsg({
      targetId: 'summary',
      clickFn: () => {
        postMsg({
            type: 'selectText',
            content: `用原文语言概括这段文字：${$('#selectVal').value}`,
        })
      },
      resultId: 'selectResult',
    });
    addClickAndPostMsg({
      targetId: 'grammar',
      clickFn: () => {
        postMsg({
          type: 'selectText',
          content: `校对并纠正这段文字：${$('#selectVal').value}`,
        })
      },
      resultId: 'selectResult',
    });
    addClickAndPostMsg({
      targetId: 'explainCode', 
      clickFn: () => {
        postMsg({
          type: 'selectText',
          content: '解释以下代码：```'+ $('#selectVal').value + '```',
        })
      },
      resultId: 'selectResult',
    })
    addClickAndPostMsg({
      targetId: 'rewrite', 
      clickFn: () => {
        postMsg({
          type: 'selectText',
          content: `重新表述这段文字：${$('#selectVal').value}`,
        })
      },
      resultId: 'selectResult',
    })
    addClickAndPostMsg({
      targetId: 'explain', 
      clickFn: () => {
        postMsg({
          type: 'selectText',
          content: `解释${$('#selectVal').value}, 并说明其中使用的任何技术术语。`,
        })
      },
      resultId: 'selectResult',
    })
    addClickAndPostMsg({
      targetId: 'translate',
      clickFn: () => {
        postMsg({
          type: 'selectText',
          content: `将这段文字翻译成英文：${$('#selectVal').value}`,
        })
      },
      resultId: 'selectResult',
    });
    addClickAndPostMsg({
      targetId: 'qa',
      clickFn: () => {
        postMsg({
          type: 'selectText',
          content: `回答这个问题：${$('#selectVal').value}`,
        })
      },
      resultId: 'selectResult',
    });
    addClickAndPostMsg({
      targetId: 'expansion',
      clickFn: () => {
        postMsg({
          type: 'selectText',
          content: `详细说明这段文字：${$('#selectVal').value}`,
        })
      },
      resultId: 'selectResult',
    });

    return dialogBox;
  }

  const isInDialogBox = () => {
    const element = $('#floatDialog'); // 获取需要检查的元素
    const rect = element.getBoundingClientRect(); // 获取元素位置和尺寸信息
    const x = event.clientX; // 获取鼠标点击的X坐标
    const y = event.clientY; // 获取鼠标点击的Y坐标
    let selectedElement = document.getSelection()?.focusNode?.parentNode;
    console.log('选中的元素是：', document.getSelection(), selectedElement,  {rect, x, y});

    // 判断鼠标点击的坐标是否在元素位置之内
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      console.log("点击的位置处于该元素之中！");
    } else {
      console.log("点击的位置不在该元素之中。");
    }
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
  }

  const handleSelect = () => {
    let selectionText = 
    document.addEventListener("mouseup", function(){
      selectionText = window.getSelection().toString();
      if (selectionText && !isInDialogBox()) {
        // 如果选中的是文本，而不是DOM元素
        console.log('选中了文本：', selectionText, $('#floatDialog'));
        $('#selectVal').value = selectionText;
        dialogBox.style.display = "block";
        $('#briefContent').style.display = 'flex';
        $('#complateContent').style.display = 'none';
        setDialogBoxPos()

        // postMsg({ type: 'selectText', content: selectionText });
      } else {
        let selectedElement = document.getSelection()?.focusNode?.parentNode;
        !isInDialogBox() && (dialogBox.style.display = "none");
      }
    });

    // document.addEventListener("selectionchange", function() {
    //   // let sel = window.getSelection().toString();
    //   // if (sel) {
    //   //   // dialogBox = createDialogBox(sel);
    //   // } else {
    //     if (dialogBox) {
    //       dialogBox.style.display = "none";
    //     }
    //   // }
    // });



  }

  // 主函数
  var main = function () {
    // 创建用户界面
    createUI();
    // 初始化配置
    initConfig();

    // 处理监听ChatGPT-web的消息
    handlePostMessage();

    // document.addEventListener('mouseup', function (e) {
    //   let selectionText = window.getSelection().toString();
    //   if (selectionText) {
    //     // 如果选中的是文本，而不是DOM元素
    //     const chatgptIframe = $('#chatgpt-iframe');
    //     console.log('选中了文本：', selectionText, chatgptIframe);
    //     // chatgptIframe.contentWindow.postMessage(
    //     //   { selectionText, origin: 'parent' },
    //     //   domain
    //     // );
    //     postMsg({ type: 'selectText', content: selectionText });
    //   } else {
    //     let selectedElement = document.getSelection()?.focusNode?.parentNode;
    //     console.log('选中的元素是：', selectedElement);
    //   }
    // });

    // 处理选中文本
    handleSelect();

    createDialogBox();
    handleTextAutoHeight();
    // createTabBox();

    vm = new Vue({
      el: '#customization-chat-room',
      data: {
        activeName: 'chatgpt',
        localCode: []
      },
      watch() {
        // localCode() {

        // }
      },
      mounted() {
        console.log('==mounted')
        window.addEventListener("storage", this.handleStorageChange);
        this.handleStorageChange()
      },
      beforeUnmount() {
        window.removeEventListener("storage", this.handleStorageChange)
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
          if(tab.name === 'web') {
            window.open(domain, '_blank');
          }
        },
        evalCode(content) {
          const myFunc = new Function(content);
          myFunc();
        },
        handleCheckboxChange(isChecked, item) {
          console.log('handleCheckboxChange', isChecked, item);
          item.isChecked = isChecked;
          this.updateStorageItem(item);
        },
        deleteStorageItem(key) {
          this.localCode = this.localCode.filter(item => item.key !== key);
          localStorage.removeItem(key);
        },
        updateStorageItem(item) {
          console.log('updateStorageItem', item)
          localStorage.setItem(item.key, JSON.stringify(item));
          this.handleStorageChange()
        },
        handleStorageChange() {
          for(let key in localStorage){
            if(key.split('-')[0] === 'chatgpt'){
              const storageItem = JSON.parse(localStorage.getItem(key))
              const storage = this.localCode.filter(item => item.key !== storageItem.key)
              storage.length === 0 && this.localCode.push(storageItem);
              if(storageItem.isChecked) {
                evalCode(storageItem.content);
              }
              console.log('===localCode', key, this.localCode);
            }
          }
        }
      }
    });
    console.log('vm', vm);

    const iframe = $('#chatgpt-iframe');

    iframe.onerror = function () {
      // iframe 加载失败
      const chatRoom = $('#customization-chat-room');
      chatRoom.innerHTML = `
            <p>抱歉，由于某些原因，无法加载此内容。</p>
            <p>请跳转网页版体验：${domain}。</p>
           `;
    };

    // 网页内容读取
    if (isDomain('google') || isDomain('baidu')) {
      handleGoogleSearch();
    }
  };

  // 执行主函数
  main();
  console.log('这是最新代码11');
})();
