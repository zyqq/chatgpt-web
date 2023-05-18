// ==UserScript==
// @name         网页定制（ChatGPT版）
// @author       yiqiuzheng
// @description  自动生成网页定制脚本，支持深色模式、隐藏元素等功能
// @namespace    http://tampermonkey.net/
// @version      1.1
// @updateURL    https://raw.githubusercontent.com/zyqq/chatgpt-web/main/drawIframe.js
// @downloadURL  https://raw.githubusercontent.com/zyqq/chatgpt-web/main/drawIframe.js
// @match        http*://*/*
// @exclude      https://chatgpt-echo.zeabur.app/*
// @exclude      https://graph.qq.com/*
// @exclude      https://open.weixin.qq.com/*
// @grant        GM_addStyle
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

  const postMsg = ({ type, ...data }) => {
    const chatgptIframe = document.getElementById('chatgpt-iframe');
    chatgptIframe.contentWindow.postMessage(
            { data, type, origin: 'parent' },
            domain
        );
  }

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
        let temp = ""; // 临时变量用来拼接字符串
        for (let i = 0; i < str.length; i++) {
        temp += str[i];
        if ((i + 1) % maxLength === 0 || i === str.length - 1) { // 到达最大长度，或者到达字符串最后
            strArr.push(temp);
            temp = "";
        }
        }
        return strArr; 
    }
    const formatResult = splitStr(result)
    console.log('formatResult', formatResult)
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
            postMsg({ type: 'read', content: article })
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
        postMsg({ type: 'selectText', content: selectionText })
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
            <p>请跳转网页版体验：https://chatgpt-echo.zeabur.app/。</p>
           `;
    };

    // TODO:网页内容读取
  };

  // 执行主函数
  main();
  console.log('这是最新代码11');
})();
