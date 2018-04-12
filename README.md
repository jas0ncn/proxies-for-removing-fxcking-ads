# Proxies For Removing Fxcking Ads

Proxies For Removing Fxcking Ads（以下简称 PFRFA），顾名思义，依靠代理，实现中间人劫持删除那些傻x的广告。

## 部署方法

### Docker

本项目提供了 Dockerfile 可以使用 Dockerfile 一键构建镜像并部署

### 手动部署

下载本项目代码，在服务器上安装 Node.js (>= 8)，执行如下命令

```bash
# 安装依赖
npm i

# 运行
npm start
```

## 设置

本项目使用 alibaba 开源的 [AnyProxy](https://github.com/alibaba/anyproxy)，相关配置项可以直接修改 `package.json` 的 `start` 命令中的参数。

具体文档查看：[http://anyproxy.io/cn/](http://anyproxy.io/cn/)

## 如何使用

除了以下已经实现的过滤规则，你还可以自定义规则。PFRFA 实现了一个简易的规则配置系统。

在 `rules` 文件夹中创建一个任意文件名的 `.js` 文件，每个 `.js` 文件将被视为一个规则，规则按要求导出以下字段 `name`, `trigger`, `hook` 三个字段，分

- `<string>name` 规则名，将被打印出来用作调试
- `trigger(requestDetail, responseDetail): void` 触发函数，触发函数将依次传入 AnyProxy 的 `requestDetail`, `responseDetail` 对象（详见[开发示例](http://anyproxy.io/cn/#%E5%BC%80%E5%8F%91%E7%A4%BA%E4%BE%8B)），要求该函数返回一个 `Boolean` 值，若为 `true`，则代表命中规则，PFRFA 将会直接调用对应的 `hook` 函数。
- `hook(requestDetail, responseDetail): Promise<any> | IterableIterator<any>` 处理函数，将依次传入 AnyProxy 的 `requestDetail`, `responseDetail` 对象（详见[开发示例](http://anyproxy.io/cn/#%E5%BC%80%E5%8F%91%E7%A4%BA%E4%BE%8B)），要求该函数返回一个 `Promise` 或 `IterableIterator`（即 `generator` 函数）对象，PFRFA 会将这个函数直接返回给 AnyProxy，具体开发查看 AnyProxy 的[开发示例](http://anyproxy.io/cn/#%E5%BC%80%E5%8F%91%E7%A4%BA%E4%BE%8B)）。

#### 示例文件

```javascript
module.exports = {
    name: 'Zhihu remove ads',
    trigger (requestDetail, responseDetail) {
        // ...
    },
    hook (requestDetail, responseDetail) {
        return new Promise((resolve, reject) => {
            // ...
            resolve({ response: newResponse })
        })
    }
}

```

## 已实现

- 知乎 Feed 流广告过滤

## 待实现

- 知乎问题详情页
- 知乎回答评论

## LICENSE

[MIT LICENSE](https://jas0ncn.mit-license.org/)

Copyright (c) 2017-present, JasonChen (Junyi Chen).

