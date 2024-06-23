# Javascript高级相关（高不高级我也不知道能看就行）

## 模块化

好处：

1. 提高了代码的复用性

2. 提高了代码的可维护性

3. 可以实现按需加载

### CommonJS

- CommonJS 源自社区
- CommonJS 的出现早于 ES Module 规范
- CommonJS 被大量使用在 node.js 中
- 使用 module.exports 导出模块，使用 require 导入模块
- exports 也可以导出模块，它的本质还是引用了 module.exports
- CommonJS 是同步加载模块，这点与 ES Module 不同

导出：

可以导出任意类型

```js
// module.js
module.exports = {
    name:'banana',
    age:18,
    eat:function(){
        console.log('I like eating bananas')
    }
}
module.exports.userName = 'admin'
```

导入：

```js
// app.js
const obj = require('./module.js')
console.log(obj) // { name: 'banana', age: 18, eat: [Function: eat], userName: 'admin' }

// 如果只想导入某个属性，可以使用解构赋值
const { name } = require('./module')
console.log(name) // 'banana
```

Commonjs 不适用浏览器

因为 CommonJS 是同步加载模块，而加载模块就是去服务端获取模块，加载速度会受网络影响，假如一个模块加载很慢，后面的程序就无法执行，页面就会假死。而服务端能够使用 CommonJS 的原因是代码本身就存储于服务器，加载模块就是读取磁盘文件，这个过程会快很多，不用担心阻塞的问题。
所以浏览器加载模块只能使用异步加载，这就是 AMD 规范的诞生背景。


### ES Module

- ES Module 是 ES6 之后新增的模块化规范，它从 Javascript 本身的语言层面，实现了模块化
- ES Module 想要完成浏览器端、服务端的模块化大一统，成为通用解决方案
- 使用 export 导出模块，使用 import 导入模块
- 通过 as 关键词，对导出对象重命名，也可以通过 as 对导入对象重命名


导出：

可以导出任意类型

```js
// module.js
const obj = {
    name:'banana',
    age:18,
    eat:()=>{
        console.log('I like eating bananas')
    }
}
const userName = 'admin'

export { obj,userName }
```

导入：

```js
// app.js
import { obj,userName } from './module.js'
```

通过 as 重命名导出:

```js
// module.js
const userName = 'admin'
const passWorld = '密码是我生日'

export { 
    userName as name,
    passWorld as pass
}

// app.js
import { name,pass } from './module.js'
```

default 默认导出:

```js
//默认导出一个成员
// module.js
const name = 'nz'
export default name

// app.js
import newName from './module.js' // 此时可以用新的变量名接收

// 默认导出多个

// module.js
export default {
    name:'nz',
    age:18,
    eat:()=>{
        console.log('喜欢手冲，wc，拦不住的')
    }
}

// app.js
import handle from './module.js'
console.log(handle.name) // nz
handle.eat() // 喜欢手冲，wc，拦不住的
```

注意点:

当我们只想运行模块，而不是获取其中变量时，可以这么写 import './module.js'

需要导出大量成员时，可以用一个变量来接收

```js
export { name,age,address,tel,gender,...... } // 导出了很多的成员
import * as obj from './module.js' // 使用 obj 来接收
```

同时导出命名成员和默认成员

```js
const name='banana',age=18;
export { name,age }
export default 'default value'

import { name, age, default as title } from './module.js' // 此时默认成员需要用 default as 来接收
import title, { name, age } from './module.js' // 简写的方式，将默认成员放在最前面
```

使用 ES Module 执行 JS 代码:

通过给 script 标签添加 type="module" 属性，可以用 ES Module 的标准来执行 JS 代码
使用 ES Module 的 JS,会延迟执行，有点类似于 defer 属性

```html
<!-- 默认使用严格模式 -->
<script type="module">
  console.log(this) //undefined
</script>

<!-- 每个 ES Modules 都是一个私有作用域 -->
<script type="module">
  const name = 'banana'
</script>
<script type="module">
  console.log(name) //undefined
</script>

<!-- 外部文件是通过 CORS 的方式请求的，需要后端加请求头，否则无法加载 js -->
<script type="module" src="http://www.baidu.com" /> // 报错

<!-- ESM 的 script 标签会延迟执行，当 html 加载完毕后，再执行 script，相当于添加了 defer 属性 -->
<script>
  // 阻塞下面的 p 标签显示
  alert('hello')
</script>
<p>内容1</p>
<script type="module">
  // 不会阻塞下面的 p 标签显示
  alert('hello')
</script>
<p>内容2</p>
```

node 对 ES Module 的支持:

node@8.0 之前的版本还不支持 ES Module，不过可以通过 babel 来解决

8.0之后可用在 `package.json` 加入 `"type":"module "` （版本存疑未，但方法没问题）


```js
// 安装 babel 插件
yarn add @babel/node @babel/core @babel/preset-env -D

// 运行babel
yarn babel-node

// 运行文件和插件
yarn babel-node index.js --persets=@babel/preset-env
```