// ==UserScript==
// @name         网页定制（ChatGPT版）
// @author       yiqiuzheng
// @version      2023.05.20.01
// @description  自动生成网页定制脚本，支持深色模式、隐藏元素等功能
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAH1UExURUxpcXeqn3WqnHWonHSpnHWonHWpnG22knWpnHWpnHSmm3apm3SpnHWonHWpnHSonHWpnHWpm3apnXWpnHWpm3WpnP///8fc19fm43mrn67Nxf7///r8+6HFvNPk4JS8ssXb1XirnsDY0sPa1Pj7+qbHv5i/tXeqnvz9/X6uoo65roq2q+Tu7P3+/qrKwqDEu9bm4vP39qfIwPv9/NXl4ezz8Xqsn+nx73msn5/Dusnd2N7q59zp5pC6r4CwpKLFvIOxpszf2oSypsTa1fn7+/P49t/r6JrAt8LZ1L/X0d3q53aqnczf287h3Ie0qc7g3Pr8/LTQybDOxpvBuObv7c/h3PX5+Ory8ODr6OPt65G7sLnTzYWzp/n7+oi1qv7+/tTk4J7Cucve2Z3Cub7X0H+vo8LZ053CuKnJwff6+tnn4/3+/fD29XytoYWzqJe+tJa+tHapnHeqnaHEu8vf2oGxpazLw3utoMre2ZW9s7XRyu/19H2uou/186XHv6jJwNDi3sjd2OLt6u308ufw7tfm4rjTzK3MxOjw7tvp5dHi3sjd15m/tvL39q/Nxvb5+OPu64y3rIOyptnn5LbSy+Ds6eHs6tbl4cHZ0/v8/H6vo4GwpZ7Dus/h3fb6+ZK7sfT49/f6+aLFvavLw6zLxM3g28bc1pQLf2QAAAAVdFJOUwAtv5bz1PQH/dUuj5WQ/CyYwJHykqKEGP8AAAAJcEhZcwAAAHYAAAB2AU57JggAAAIcSURBVDjLhdNle9swEABgFdK0Kw7uHMfp6iTeAksaThpoUmZuV1x5zMxbx8wM7Xj7nZNjx/L2rNl9kXR6H51snwmhsWFTWQn8FSWGygKihLGmFP4ZpUXG7P5GWDcKZVEDeaKC1mfnHxUvoSV19YQOVFWTLdpiUfJ2POx/jOEzAy4tWU7KctPG95FpOjT0IA2PT80aSHEOpKQ5mSUxIA7bD2OzI5vdTNTt1QXBDvAxMT/7qkE+h8PdyoYC+DX0YgYyX4W+FwBunqYOhpp0YAl/1eN22Or5DPD8Jd6sBTiOZgYa8SfUysAMH+wWW/AK3ndbUWRADKUVMGIex1YrRGcs3uvYxcCzKVCAJTb66FZsFGDXTgHPMjD2WgWcFeCkHd/uoOshj0MD16QoLOI2+Q406ifpPXh4gisaOIXD4JiZXUoqwARx/Ab80zB7TJMzmK17nr4BK2eCOnocJGMMBBH9tO6FqYhveUJSwZsxBrpRDDltl6G3G7/8+K6AtLOZARu65hYwcLfL8s4l30EGCTzGwH6MA3Tew9u0Tp1HBmYOT+u+xZ62nl4AB91uGRQ+ZWAZ53HQqgMwgn3n6BC90+bl0nLJB51qH+QaphUD3EWuHVNuuhiQwlrPaS3n6zhEW+2G3I3TkSE3A5XalG860o/j/sSkcGAf62tS8MdvFfe3Oyf2tugyhBRB3qC/XuF/ADFWVOUHhFSXG4rXA78BYbiLJDUXqsMAAABXelRYdFJhdyBwcm9maWxlIHR5cGUgaXB0YwAAeJzj8gwIcVYoKMpPy8xJ5VIAAyMLLmMLEyMTS5MUAxMgRIA0w2QDI7NUIMvY1MjEzMQcxAfLgEigSi4A6hcRdPJCNZUAAAAASUVORK5CYII=
// @namespace    http://tampermonkey.net/
// @version      1.1
// @updateURL    https://raw.githubusercontent.com/zyqq/chatgpt-web/main/drawIframe.js
// @downloadURL  https://raw.githubusercontent.com/zyqq/chatgpt-web/main/drawIframe.js
// @match        http*://*/*
// @exclude      https://chatgpt-echo.zeabur.app/*
// @exclude      https://graph.qq.com/*
// @exclude      https://open.weixin.qq.com/*
// @grant        GM_addStyle
// @run-at         document-end
// ==/UserScript==

(function () {
  'use strict';
  // 本地调试ChatGPT的iframe
  // const domain = 'http://localhost:3000/#/';
  // 线上ChatGPT的iframe地址
    const domain = 'https://chatgpt-echo.zeabur.app/';
  console.log('domain', domain);

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
    closeButton.textContent = '×';
    closeButton.addEventListener('click', function () {
      drawer.style.right = '-500px';
    });

    // 创建聊天室
    var chatRoom = document.createElement('div');
    chatRoom.id = 'customization-chat-room';
    chatRoom.style.height = '100%';

    chatRoom.innerHTML = `
        <iframe id="chatgpt-iframe" width="99%" height="99%" src="${domain}"></iframe>
      `;

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

    // 美化页面
    GM_addStyle(`
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

  // 谷歌搜索ChatGPT应答
  const generateSearchEnhance = () => {
    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'chatgpt-search-enhance';
    messageWrapper.innerHTML = `
        <div class="header-7QHGYk">
          <div class="lt-znd2I9">
            <a class="title-N8X-fJ" href="${domain}" target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" fill="none" class="user-avatar"><defs><path id="bot_svg__a" d="M0 0h30v30H0z"></path><path id="bot_svg__c" d="M0 0h20.455v20.455H0z"></path></defs><g><rect fill="#E7F8FF" width="30" height="30" rx="10"></rect><mask id="bot_svg__b" fill="#fff"><use xlink:href="#bot_svg__a"></use></mask><g mask="url(#bot_svg__b)"><g transform="translate(4.773 4.773)"><mask id="bot_svg__d" fill="#fff"><use xlink:href="#bot_svg__c"></use></mask><g mask="url(#bot_svg__d)"><path fill-rule="evenodd" d="M19.11 8.37c.17-.52.26-1.06.26-1.61 0-.9-.24-1.79-.71-2.57a5.24 5.24 0 0 0-4.53-2.59c-.37 0-.73.04-1.09.11A5.201 5.201 0 0 0 9.17 0h-.04C6.86 0 4.86 1.44 4.16 3.57A5.11 5.11 0 0 0 .71 6.04C.24 6.83 0 7.72 0 8.63c0 1.27.48 2.51 1.35 3.45-.18.52-.27 1.07-.27 1.61 0 .91.25 1.8.71 2.58 1.13 1.94 3.41 2.94 5.63 2.47a5.18 5.18 0 0 0 3.86 1.71h.05c2.26 0 4.27-1.44 4.97-3.57a5.132 5.132 0 0 0 3.45-2.47c.46-.78.7-1.67.7-2.58 0-1.28-.48-2.51-1.34-3.46ZM8.947 18.158c-.04.03-.08.05-.12.07.7.58 1.57.89 2.48.89h.01c2.14 0 3.88-1.72 3.88-3.83v-4.76c0-.02-.02-.04-.04-.05l-1.74-.99v5.75c0 .23-.13.45-.34.57l-4.13 2.35Zm-.67-1.153 4.17-2.38c.02-.01.03-.03.03-.05v-1.99l-5.04 2.87c-.21.12-.47.12-.68 0l-4.13-2.35c-.04-.02-.09-.06-.12-.07-.04.21-.06.43-.06.65 0 .67.18 1.33.52 1.92v-.01c.7 1.19 1.98 1.92 3.37 1.92.68 0 1.35-.18 1.94-.51ZM3.903 5.168v-.14c-.85.31-1.57.9-2.02 1.68a3.78 3.78 0 0 0-.52 1.91c0 1.37.74 2.64 1.94 3.33l4.17 2.37c.02.01.04.01.06 0l1.75-1-5.04-2.87a.64.64 0 0 1-.34-.57v-4.71Zm13.253 3.337-4.18-2.38c-.02 0-.04 0-.06.01l-1.74.99 5.04 2.87c.21.12.34.34.34.58v4.85c1.52-.56 2.54-1.99 2.54-3.6 0-1.37-.74-2.63-1.94-3.32ZM8.014 5.83c-.02.01-.03.03-.03.05v1.99L13.024 5a.692.692 0 0 1 .68 0l4.13 2.35c.04.02.08.05.12.07.03-.21.05-.43.05-.65 0-2.11-1.74-3.83-3.88-3.83-.68 0-1.35.18-1.94.51l-4.17 2.38Zm1.133-4.492c-2.15 0-3.89 1.72-3.89 3.83v4.76c0 .02.02.03.03.04l1.75 1v-5.75c0-.23.13-.45.34-.57l4.13-2.35c.04-.03.09-.06.12-.07-.7-.58-1.58-.89-2.48-.89ZM7.983 11.51l2.24 1.27 2.25-1.27V8.95l-2.25-1.28-2.24 1.28v2.56Z" style="fill: rgb(31, 148, 140);"></path></g></g></g></g></svg>
              <span>ChatGPT</span>
            </a>
          </div>
          <div class="rt-FR4JFM">
            <div class="mode-GtcyE3">
              <div class="mode-box-5-6c1L">
                <div class="title-N8X-fJ">询问 ChatGPT</div>
              </div>
            </div>
          </div>
        </div>
        <div class="answer">
        </div>
    `;
    const footer = document.createElement('div');
    footer.className = 'footer';
    footer.innerHTML = `
        <div class="footer"><div class="monica-btn btn continue-chat primary-outline-button"><svg aria-hidden="true" focusable="false" role="img" class="octicon octicon-comment" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;"><path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg><span class="text">在聊天中继续</span></div></div>
    `
    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';
    toolbar.innerHTML = `
      <span class="toolbar-item-EhZYV5">
        <svg width="16" height="16" fill="none" viewBox="0 0 16 16" style="min-width: 16px; min-height: 16px;">
          <g><path fill="currentColor" d="M6.667 4.814 4.402 6.667H2v2.667h2.402l2.265 1.853V4.814Zm-2.741 5.853H1.333A.666.666 0 0 1 .667 10V6a.667.667 0 0 1 .666-.666h2.593l3.53-2.888A.333.333 0 0 1 8 2.704v10.593a.333.333 0 0 1-.545.258l-3.528-2.888h-.001Zm9.011 2.756-.944-.944A5.985 5.985 0 0 0 14 8a5.988 5.988 0 0 0-2.203-4.645l.947-.947A7.317 7.317 0 0 1 15.334 8a7.315 7.315 0 0 1-2.397 5.423Zm-2.362-2.362-.948-.948A2.662 2.662 0 0 0 10.667 8c0-.953-.5-1.79-1.254-2.261l.96-.96A3.995 3.995 0 0 1 12 8a3.991 3.991 0 0 1-1.425 3.061Z" data-follow-fill="#838BA7"></path></g></svg></span><span class="toolbar-item-EhZYV5"><svg width="16" height="16" fill="none" viewBox="0 0 16 16" style="min-width: 16px; min-height: 16px;"><g><path data-follow-stroke="currentColor" d="M12.243 12.243a6 6 0 1 1 0-8.485C12.795 4.31 14 5.666 14 5.666" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path data-follow-stroke="currentColor" d="M14 2.668v3h-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg></span><span class="toolbar-item-EhZYV5"><svg width="16" height="16" fill="none" viewBox="0 0 16 16" style="min-width: 16px; min-height: 16px;"><g><path data-follow-stroke="currentColor" d="M4.334 4.145v-1.54c0-.517.42-.937.937-.937h8.125c.518 0 .938.42.938.937v8.125c0 .518-.42.938-.938.938H11.84" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path data-follow-stroke="currentColor" d="M10.729 4.332H2.604a.937.937 0 0 0-.938.938v8.125c0 .517.42.937.938.937h8.125c.517 0 .937-.42.937-.938V5.27a.937.937 0 0 0-.938-.938Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></g>
        </svg>
      </span>
    `
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
      .header-7QHGYk .lt-znd2I9 .title-N8X-fJ span {
        font-size: 15px;
        color: #000;
        font-weight: 700;
    }
      .chatgpt-search-enhance .header-7QHGYk .lt-znd2I9 {
          display: inline-flex;
          align-items: center;
          gap: 6px;
      }
      .chatgpt-search-enhance .header-7QHGYk .lt-znd2I9 .title-N8X-fJ {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          gap: 6px;
      }
      .chatgpt-search-enhance .header-7QHGYk .rt-FR4JFM {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
      }
      .chatgpt-search-enhance .header-7QHGYk .rt-FR4JFM .mode-GtcyE3 {
          height: 24px;
      }
      .toolbar {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #595959;
      }
      .chatgpt-search-enhance .header-7QHGYk .rt-FR4JFM .mode-GtcyE3 .mode-box-5-6c1L {
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
      .chatgpt-search-enhance .header-7QHGYk .rt-FR4JFM .mode-GtcyE3 .mode-box-5-6c1L .title-N8X-fJ {
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
      .title-N8X-fJ:hover {
        cursor: pointer;
        user-select: none;
        -webkit-user-drag: none;
        text-decoration: none;
        color: #3872e0!important;
        background-color: transparent;
      }
      .mode-box-5-6c1L .title-N8X-fJ:hover {
          background: rgba(235,202,254,.24);
          text-decoration: none!important;
      }
      .footer {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        margin-bottom: 16px;
      }
      .footer .continue-chat {
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
      .footer .continue-chat .text {
          margin-left: 8px;
      }
    `);
    const searchBox = document.getElementById('rhs');
    searchBox?.appendChild(messageWrapper);
  };

  // 谷歌搜索ChatGPT应答
  const handleGoogleSearch = () => {
    window.addEventListener('load', () => {
      generateSearchEnhance();
    });
  };

  const postMsg = ({ type, ...data }) => {
    const chatgptIframe = document.getElementById('chatgpt-iframe');
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

  // 处理监听ChatGPT-web的消息
  const handlePostMessage = () => {
    // 父级，在frame处抛出接收事件
    window.addEventListener(
      'message',
      (event) => {
        // console.log('msg', event.data, event);
        if (event.data.origin && event.data.origin === 'chatgpt-web') {
          console.log('chatgpt-web', event.data, event);
          if (event.data.type === 'code') {
            const myFunc = new Function(event.data.data.content);
            myFunc();
          }
          if (event.data.type === 'read') {
            console.log('阅读文章');
            const article = extractArticle();
            postMsg({ type: 'read', content: article });
          }
        }
      },
      false
    );
  };

  // 主函数
  var main = function () {
    // 创建用户界面
    createUI();
    // 初始化配置
    initConfig();

    // 处理监听ChatGPT-web的消息
    handlePostMessage();

    document.addEventListener('mouseup', function (e) {
      let selectionText = window.getSelection().toString();
      if (selectionText) {
        // 如果选中的是文本，而不是DOM元素
        const chatgptIframe = document.getElementById('chatgpt-iframe');
        console.log('选中了文本：', selectionText, chatgptIframe);
        // chatgptIframe.contentWindow.postMessage(
        //   { selectionText, origin: 'parent' },
        //   domain
        // );
        postMsg({ type: 'selectText', content: selectionText });
      } else {
        let selectedElement = document.getSelection()?.focusNode?.parentNode;
        console.log('选中的元素是：', selectedElement);
      }
    });

    const iframe = document.getElementById('chatgpt-iframe');

    iframe.onerror = function () {
      // iframe 加载失败
      const chatRoom = document.getElementById('customization-chat-room');
      chatRoom.innerHTML = `
            <p>抱歉，由于某些原因，无法加载此内容。</p>
            <p>请跳转网页版体验：${domain}。</p>
           `;
    };

    // TODO:网页内容读取
    if (window.location.host === 'www.google.com') {
      handleGoogleSearch();
    }
  };

  // 执行主函数
  main();
  console.log('这是最新代码11');
})();
