# Node 基础

## package.json

配置文件会声明项目的一些信息，以及管理依赖

主要看下这些：

```json
// 开发依赖 生产环境就不需要了
// 如 webpack vite rollup
{
  "devDependencies": {
    "vitepress": "^1.2.3"
  }
}

// 生产依赖
// 如 vue vuex vue-router
{
  "dependencies": {
    "vue": "^1.2.3"
  }
}

// 对等依赖 给编写插件或npm包的开发人员使用的
// 比如要开发一个vite插件 那就在这里装vite，因为插件要依赖vite
// 插件装在生产环境就行了 避免再次在生产环境装vite
{
    "dependencies": {
        "vite-plugin": "^1.2.3"
    },
    "peerDependencies": {
        "vite": "^1.2.3"
    }
}
```

## npm config list

查看当前配置，切换镜像什么的在我的博客里有这里就不赘述了

## npm install

安装依赖,所有依赖都会存放在`node_modules`目录下,
,默认采用**扁平化**的方式安装，排序规则：

.bin -> @xxx ->首字母排序

使用广度优先遍历依赖树，会首先处理根目录下的依赖，然后逐层处理每个依赖包的依赖，直到所有依赖处理完

处理依赖时还会检查版本是否符合依赖树中其他依赖的版本要求，不符合会尝试安装合适的依赖

当然扁平化是理想的状态下，如果在二级模块使用了相同的依赖但是不同版本，那就会重新搞一层 `node_modules` 目录，就是非扁平化了

运行`npm install` 时会首先读取 config 配置文件，其顺序如下：
npm config list -> 项目级.npmrc -> 用户级.npmrc （在 c 盘用用户目录） -> 全局的.npmrc （c 盘 AppData>npm）-> npm 内置.npmrc （nodejs 装在哪就在哪里）

随后检查是否存在 package-lock.json

- 有：
  1. 比较依赖版本，版本不同就根据 package.json 的版本去下载然后更新 package-lock.json 中的版本
  2. 版本相同就检查是否有缓存，有就使用缓存，没有就去下载
- 没有：

  1. 根据 package.json 获取包的信息构建依赖树与扁平化（同时进行）
  2. 检查缓存，有就使用缓存，没有就去下载


举例 .npmrc 文件：

```sh
registry=http://registry.npmjs.org/

定义 npm 的 registry，即 npm 的包下载源


proxy=http://proxy.example.com:8080/

定义 npm 的代理服务器，用于访问网络

https-proxy=http://proxy.example.com:8080/

定义 npm 的 https 代理服务器，用于访问网络

strict-ssl=true

是否在 SSL 证书验证错误时退出

cafile=/path/to/cafile.pem

定义自定义 CA 证书文件的路径

user-agent=npm/{npm-version} node/{node-version} {platform}

自定义请求头中的 User-Agent

save=true

安装包时是否自动保存到 package.json 的 dependencies 中

save-dev=true

安装包时是否自动保存到 package.json 的 devDependencies 中

save-exact=true

安装包时是否精确保存版本号

engine-strict=true

是否在安装时检查依赖的 node 和 npm 版本是否符合要求

scripts-prepend-node-path=true

是否在运行脚本时自动将 node 的路径添加到 PATH 环境变量中
```

## package-lock.json

喜闻乐见锁定依赖版本号，抛开 `package` 字段，

- `version` 该参数指定了当前包的版本号
- `resolved` 该参数指定了当前包的下载地址
- `integrity` 用于验证包的完整性
- `dev` 是否是一个开发依赖包
- `bin` 该参数指定了当前包中可执行文件的路径和名称
- `engines` 该参数指定了当前包所依赖的Node.js版本范围

缓存就是用依赖的 `integrity`、`version`和名字生成唯一key，在cache 里查找

可以使用 npm cofig list 查看 cache 路径


## npm run xxx

运行 `package.json` 中的 `scripts` 字段配置的命令

命令会注入到 `node_modules` 的 `.bin` 目录下
- .sh 给 Unix Linux MacOS用
- .cmd .ps1 分别给 Windows用的 cmd 和 powershell用
（这就是为毛能跨平台）

优先在项目的`node_modules/.bin`找，找不到就去全局的`node_modules`找,还找不到就去环境变量找，再找不到就报错

### pre 与 post

相当于生命周期一样，执行顺序为：prexxx > xxx > postxxx

```json
{
  "scripts": {
    "predev": "node xxx.js",
    "dev": "node xxx.js",
    "postdev": "node xxx.js"
  }
}
```

## npx

命令行工具，npm 5.2.0 以上自带
低版本手动安装
```sh
npm install npx -g
```

在上面我们会在`script`配置命令来执行一些可执行文件或命令，npx则可以直接来执行

优势：
- 避免全局安装：npx允许你执行npm package，而不需要你先全局安装它
- 总是使用最新版本：如果你没有在本地安装相应的npm package， npx会从npm的package仓库中下载并使用最新版
- 执行任意npm包：npx不仅可以执行在package.json的scripts部分定义的命令，还可以执行任何npm package
- 执行GitHub gist：npx甚至可以执行GitHub gist或者其他公开的JavaScript文件

### npm与npx的区别

- npx 侧重于执行命令，虽然会自动安装模块（执行结束后自动删除掉下载的模块而且都是最新的）
- npm 侧重于安装卸载某个模块

> npm ls -g 可以查看全局安装了哪些可执行文件

## npm私服

使用 `verdaccio` 快速构建私服

安装：
```sh
npm install verdaccio -g
```

执行命令：
```sh
# 默认直接运行
verdaccio

#指定端口 (默认端口 4873)
verdaccio --listen 3000
```
指定端口后会有一个可以访问的页面，里面有注册的命令，登录的命令等，发包还是使用 `npm publish --registry 这里要本地的地址`

自己的npm私服，也可以使用`npm config set registry`指定私服地址后再进行`npm publish`，下载仍然是`npm install`

## 模块化

`cjs`和`esm`，详情看这里：[模块化](../js-md/senior.md#模块化)

`esm`在node环境下天然不支持导入json,在高版本下可以使用 `assert {type:json}`强行支持

区别：
- cjs是基于运行时的同步加载，esm是基于编译时的异步加载
- cjs是可以修改值的，esm值并且不可修改（可读的）
- cjs不可以tree shaking，esm支持tree shaking
- commonjs中顶层的this指向这个模块本身，而ES6中顶层this指向undefined


## 全局变量

>node中没有DOM和BOM的API，但其他的ECMAscriptAPI基本都能用

使用`global`来定义全局变量(仅node环境)

```js
global.a = 1
```

使用`globalThis`来定义全局变量（会自己判断环境,浏览器环境window访问定义的变量，*ECMAScript 2020 引入globalThis*）

```js
globalThis.b = 1
```

### dirname 

dirname 获取文件所在目录的绝对路径

```js
//当前执行脚本的目录
console.log(__dirname);
```
### filename

filename 获取当前执行脚本的文件名

```js
//会带有当前执行脚本的目录及文件名
console.log(__filename);

const path = require('path')
console.log(path.basename(__filename))//文件名
```
### Buffer
Buffer是一个类似数组的对象，用来操作二进制数据

### process

process 进程信息

```js
// 比如 运行 node index.js --nb66
console.log(process.argv);//返回值是个数组里面有 nb66

// 也可获取路径
console.log(process.cwd());

// 杀死进程
process.exit()
```

## CSR SSR SEO

### CSR

客户端渲染，不依赖服务器，vue，react SPA单页面应用

ToB 后台管理系统，大屏可视化

### SSR

服务端渲染，依赖服务器

ToC 新闻，博客，电子商务，门户网站

### SEO

搜索引擎优化，提升用户体验

TDK:`title` ,`description`, `keywords`

使用语义化标签