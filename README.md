# 网页定制油猴插件

## 一、简介

> 油猴插件下载地址：<https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo>

这是一个定制网页的油猴脚本插件相关代码，展示如下：
![插件](./assets/plugins.png)
![内容](./assets/chatgpt-iframe.png)

## 二、目录结构

### 1、drawIframe.js

编写了插件的交互逻辑及样式：网页右下角的按钮，点击可以弹出内嵌的ChatGPT网站iframe，内嵌的iframe项目地址为：<https://github.com/zyqq/ChatGPT-Next-Web>

### 2、autoUpdate.js

放在油猴插件中的代码，会自动更新drawIframe.js中的代码。将其复制到油猴插件中即可。
