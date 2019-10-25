## 概述
在开发联调的时候，通过 `noahv start` 命令启动的server和数据API不满足同源条件，所以在浏览器调用的时候会存在跨域的问题，具体表现为浏览器的调试窗口中出现如下错误：

<div class="normal-code">

```
Access to Font at 'xxx' from origin 'a' as been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```
</div>

## 跨域错误解决方法

为了解决上述问题，NoahV中引入了代理功能，可以将浏览器的的请求代理到目标server上，从而绕过浏览器同源策略的安全限制，实现跨域数据访问，只需在 `src/common/devProxy.js` 中加入相关配置。


如下为示例配置:

* 其中target为需要将请求代理到的server，如: `http://b.baidu.com:9099/` 
* path为需要代理的接口路径，如需要将接口路径为 `http://a.baidu.com/api/` 开头的请求全部代理到 `http://b.baidu.com:9099/`，只需将 path 设置为: ['/api'];

<div class="normal-code">

```javascript
proxy: {
    path: ['/api'],
    option: {
        target: 'http://b.baidu.com:9099/',
        changeOrigin: true
    }
}
```
</div>

将上述代理配置好后使用 `noahv start` 命令重启NoahV，就能看到请求成功。

## 接口鉴权

如果代理的目标地址的接口是有鉴权的，如通过内网的 `uuap` 进行账户验证，这种情况下上述的配置还不够，因为NoahV的代理无法获得目标地址的cookie，需要手动配置或者采用host配置的方式实现跨域鉴权。

### 1. 通过配置hosts代理

> 对于当前server和目标代理server只是端口不同的情况，建议采用这种方案，几乎不需要做任何操作。

采用这种方式有两个条件：
<br>

* 1.Cookie需要尽可能的种在根域名下
* 2.NoahV启动的server必须和目标代理server在相同根域上

<br>

如果当前server和目标代理server只是端口不同，上述两个条件直接满足，只需配置上述的 `target` 和 `path` 。

对于地址不同情况，假设目标代理server为: `a.test.baidu.com`

NOAHV默认的启动目录是http://localhost的，可以在 `/etc/hosts` 文件中配置如下代理：


<div class="normal-code">

```bash
127.0.0.1 b.test.baidu.com
```

</div>

总之需要让NoahV启动的server和目标代理server在相同的根域上，然后在目标代理server中将cookie种到'.test.baidu.com'
<br>

### 2. 通过在配置中加入跨域代理相关配置

这种方式是在配置中直接将目标代理server的cookie捕获，配置到代理文件中，这样每次请求到代理server的时候就会直接带上cookie。

访问目标代理server，打开浏览器调试窗口，在network中任选一个请求，复制 `Request Header` 中的 `Cookie` 内容

将cookie内容复制到 `proxy.option.headers` 中，如下列示例所示：

<div class="normal-code">

```javascript
proxy: {
    path: ['/api'],
    option: {
        target: 'http://b.baidu.com:9099/',
        changeOrigin: true,
        headers: {
            Cookie: 'sessionid=g310esj7rnxdzac863ne2hf70o2k7ak0;' //此处为从浏览器中获取的cookie信息
        }   
    }
}
```
</div>

如果希望配置多个目标代理server，可以使用router功能，详见[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)文档。

