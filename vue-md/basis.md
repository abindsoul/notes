# Vue 基础

## 父子传值

父 > 子

父组件用 `:`（v-bind）绑定一个变量在子组件上 如 `:title='我是天才'`

子组件 
vue3 用 `defineProps` 宏接收父组件绑定的变量名（接收title）,
vue2 用 `props` 接收父组件绑定的变量名（同上）

```js
// vue3 可以在模板直接使用 title
// 要在其他代码中使用titile 则需要将 defineProps 用变量接一下
const props =  defineProps({ 
    title: {
        type: String, // 类型校验，可选，不写默认any类型
        required: true, // 是否必传，可选，不写默认false
        default:'我是默认值'
    }
})
console.log(props.title)
// ts 特有的 定义默认值
withDefaults(defineProps<{
    title:string,
    nb:number[]
}>(),{
    title:'我是默认值' // 默认值
    // 复杂类型要用一个函数返回
    nb:()=>[666,999]
})


// vu2 则需要用 this.title 访问 props 变量，其他同上
props:{
    title:{
        type:String, 
        default:'我是默认值'
    }
}
```

子 > 父

子组件要一个事件来触发通知父组件，父组件要一个方法来接收子组件的通知，子组件触发事件时，将数据作为参数传递给父组件的方法。父组件的方法中，将数据绑定到父组件的变量上。

vu3 子组件触发事件时，用 `emit` 
vue2 子组件触发事件时，用 `$emit` 

```js
//vue3
// 子组件
<div @click="send">哈哈哈我要传值给老爹</div>

const emit = defineEmits(['on-click']) //这里相当一自定义的了事件名称，父组件需要用这个名称来接收事件
const send=()=>{
    emit('on-click','我是子组件传的值') // 触发事件，并传递参数给父组件
}
// 父组件
<child @on-click="childMsg"></child>
const childMsg=(val)=>{
        console.log('我是父组件拿到了:'val) 
}
// ts
const emit = defineEmits<{
    // 可以有多个不同的事件，每个事件可以有不同的参数类型
     (e: 'on-click', val: string): void 
     (e: 'nb', val: number): void 
     (e: 'hhh', val: number[]): void 
}>() // 这里定义了事件名称和参数类型，父组件需要用这个名称来接收事件，并且参数类型需要一致，否则会报错。

// vue2
// 子组件
<div @click="send">哈哈哈我要传值给老爹</div>

methods:{
    send(){ // 触发事件，并传递参数给父组件
        this.$emit('nb','我是子组件传的值') // 触发事件，并传递参数给父组件
    }
}
// 父组件
<child @nb="childMsg"></child>

methods:{
    childMsg(val){
        console.log(val) // 这个值你想拿来干啥就看你需求了
    }
}
```
---

其他手段（获取实例等）： 

**attrs** (子组件调用父组件):

vue2: 子组件使用 `this.$attrs` 可以获得父组件除了props传递的属性和特性绑定属性 (class和 style)之外的所有属性，子组件使用 `$listeners` 可以获得父组件(不含.native修饰器的)所有 `v-on` 事件监听器

vu3: 不仅可以获得父组件传来的属性也可以获得父组件v-on事件监听器 (无$listeners 已合并至 `attrs` 内)（Vue3中使用 attrs 调用父组件方法时，方法前需要加上on；如 parentFun -> onParentFun）(Attributes 继承详情参考官方文档)

```js
import { useAttrs } from "vue";
const attrs = useAttrs()
console.log(attrs)
```
---

**$parent,$children** （vue2特有）:

$parent: 子组件获取父组件Vue实例，可以获取父组件的属性方法等

$children: 父组件获取子组件Vue实例，是一个数组，是直接儿子的集合，但并不保证子组件的顺序

```js
import Child from './Child'
export default {
  components: {
    Child
  },
  created(){
    console.log(this.$children) //[Child实例]
    console.log(this.$parent)//父组件实例
  }
}
```

---

**provide/inject** （依赖注入）(跨辈分 如： 爷 > 孙):

provide：是一个对象，或者是一个返回对象的函数。里面包含要给子孙后代属性

inject：一个字符串数组，或者是一个对象。获取父组件或更高层次的组件provide的值，既在任何后代组件都可以通过inject获得


```js
// 选项式 api
// 父组件
data() {
    return {
      msg1: '子组件msg1',
      msg2: '子组件msg2'
    }
  },
  provide() { // 注入了 好爽
    return {
      msg1: this.msg1,
      msg2: this.msg2
    }
  }
// 子组件
export default {
inject: ['msg1', 'msg2'], // 获取父组件provide的值，既在任何后代组件都可以通过inject获得，这里获取到了父组件的msg1和msg2属性。
  created(){
    //获取高层级提供的属性
    console.log(this.msg1) //子组件msg1
    console.log(this.msg2) //子组件msg2
  }
}

// 组合式 api
// 父组件 
import { ref, defineComponent,provide } from "vue";
export default defineComponent({
  components:{
    Child
  },
  setup() {
    const msg1 = ref('子组件msg1')
    const msg2 = ref('子组件msg2')
    provide("msg1", msg1)
    provide("msg2", msg2)
    return {
      
    }
  },
});
// 子组件
export default defineComponent({
    setup() {
        console.log(inject('msg1').value) //子组件msg1
        console.log(inject('msg2').value) //子组件msg2
    },
});

// setup 语法糖
// 父组件
import { ref,provide } from "vue";
const msg1 = ref('子组件msg1')
const msg2 = ref('子组件msg2')
provide("msg1",msg1)
provide("msg2",msg2)
// 子组件
import { inject } from "vue";
console.log(inject('msg1').value) //子组件msg1
console.log(inject('msg2').value) //子组件msg2
```

---

**ref,defineExpose** (获取组件实例 , 父取子)

vue2： `$refs` 可以直接获取元素属性，同时也可以直接获取子组件实例

vue3：expose&ref

```js
// 选项式 api
// 父组件
<Child ref="child" /> // 给子组件加上 ref 值 child 要和下面 $refs. 对上

 mounted(){ // dom 挂载完成后才能获取到
    //获取子组件属性
    console.log(this.$refs.child.msg) //子组件元素

    //调用子组件方法
    this.$refs.child.childFun('父组件信息') // $refs.child 就是子组件的实例，可以调用子组件的方法和属性。
  }
// 子组件
methods:{
    childFun(val){
      console.log(`子组件方法被调用,值${val}`)
    }
  }

// 组合式 api
// 父组件
<Child ref="child" />
import Child from './Child'
import { ref, defineComponent, onMounted } from "vue";
export default defineComponent({
  components: {
    Child
  },

  setup() {
    const child = ref() //注意命名需要和template中ref对应
    onMounted(() => {
      //获取子组件属性
      console.log(child.value.msg) //子组件元素
      //调用子组件方法
      child.value.childFun('父组件信息')
    })
    return {
      child //必须return出去 否则获取不到实例
    }
  },
});
// 子组件
import { defineComponent, ref } from "vue";
export default defineComponent({
    setup() {
        const msg = ref('子组件元素')
        const childFun = (val) => {
            console.log(`子组件方法被调用,值${val}`)
        }
        return {
            msg,
            childFun
        }
    },
});

// setup 语法糖
// 父组件
<Child ref="child" />
import { ref, onMounted } from "vue";
const child = ref() 
onMounted(() => {
  //获取子组件属性
  console.log(child.value.msg) //子组件元素
  //调用子组件方法
  child.value.childFun('父组件信息')
})
// 子组件
const msg = ref('子组件元素')
const childFun = (val) => {
    console.log(`子组件方法被调用,值${val}`)
}
//必须暴露出去父组件才会获取到 !!! defineExpose
defineExpose({
    childFun,
    msg
})
// ts
// 父组件
import Child from './Child'
const child = ref<InstanceType<typeof Child>>() // 类型判断 Child的
```




## 兄弟传值

有共同父组件的情况：

参考上文，兄弟一可以通过子向父的方式向父组件传递，然后这个共同父组件接收当做桥梁，向另一个兄弟二以父向子的方式传递即可。

没有共同父组件的情况：

**EventBus**  模式 （vue2），创建一个空的 Vue 实例作为事件调度中心，兄弟组件通过它来传递数据。（原理：利用发布订阅，事件调度中心实现）
什么你不知道发布事件时间调度中心，抱歉我也不知道现在帮不了你，等我搞明白再来救你
```js
// bus.js
import Vue from 'vue'
export const bus = new Vue()

// 某组件 发送数据
import {bus} from "./bus.js" // 记得导入bus
bus.$emit(参数1：'定义一个方法名', 参数2：'要发送的数据')

// 某组件 接受数据
import {bus} from "./bus.js" // 记得导入bus
bus.$on(参数1：'$emit的方法名', 参数2：'function(value){
    // value是接收到的数据
}')

// 用完还可以移除一下
eventBus.$off('方法名', {})
```

**mitt** (vue3,原理还是 EventBus)

安装:

```js
npm i mitt -S
```

使用：

```js
// mitt.js
import mitt from 'mitt'
const Mitt = mitt()
export default Mitt

// 某组件
<button @click="sendMsg">传值</button>

import Mitt from './mitt.js' // 别忘了引入
export default defineComponent({
    setup() {
        const sendMsg = () => {
            Mitt.emit('sendMsg','兄弟的值')
        }
        return {
           sendMsg
        }
    },
});

// 另一组件
import { defineComponent, onUnmounted } from "vue";
import Mitt from './mitt.js'
export default defineComponent({
  setup() {
    const getMsg = (val) => {
      console.log(val);//兄弟的值
    }
    Mitt.on('sendMsg', getMsg) // 见听到后触发自己的 getMsg 
    onUnmounted(() => {
      //组件销毁 移除监听
      Mitt.off('sendMsg', getMsg)
    })

  },
});

// setup语法糖
import Mitt from './mitt.js' // 下面两都要引入

// 某组件
const sendMsg = () => {
    Mitt.emit('sendMsg', '兄弟的值')
}

// 另一组件
const getMsg = (val) => {
  console.log(val);//兄弟的值
}
Mitt.on('sendMsg', getMsg)
onUnmounted(() => {
  //组件销毁 移除监听
  Mitt.off('sendMsg', getMsg)
})
```

## 什么是SPA

SPA（single-page application）仅在Web页面初始化时加载相应的HTML,Javascript，CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转，转而代之的是利用路由机制实现HTML内容变换，UI 与用户的交互，避免页面重新加载

**优点**:
- 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染
- 对服务器压力较小
- 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理

**缺点**：
- 初次加载慢，需要优化按需加载
- 无法使用浏览器的前进后退
- SEO难度大


## v-if与v-show

`v-if` 是惰性的真正的条件渲染，如果初始渲染条件为假那他就不会渲染直到第一次变为真时，才会渲染

`v-show` 无论初始条件是什么都会渲染，只是利用 `display` 属性对齐进行了隐藏或显示

`v-if` 适合不频繁切换的场景使用，`v-show` 适合非常频繁切换时使用


## 动态绑定class与style

都可以使用对象语法或者数组语法进行绑定

```html
<div :class="{active:isActive,'nb':isNb}" :style="{color:activeColor}"></div>

<div :class="[isActive ? 'active':'',zdnb]" :style="[nbColor]"></div>

// js
data:{
  // 对象
  isActive:true,
  isNb:false,
  activeColor:'green',
  // 数组
  zdnb:'nb'
  nbColor:{
    color:'yellow'
  }
}
```

## 单项数据流

`prop` 数据都是单向下行绑定的，父级更新会向下流动到子组件中，如果直接在子组件中进行修改会发出警告，可以防止子组件意外改变父组件的状态导致数据流难以理解，子组件想要修改通过 `prop` 传递来的值则可以使用 `emit` 来派发自定义事件，通知父组件并由父组件来修改,每次父组件发生更新时，子组件所有的 `prop` 都会刷新为最新的值

- 传递的初始值，子组件希望当做本地的数据来使用，最好在本地定义新的变量并将值赋给它
```js
props:['wcnb'],
data:function(){
  return{
    nb:this.wcnb // 使用时 用nb就行了
  }
}
```

- 对传入值要进行一些转换操作等，最好使用计算属性处理
```js
props:['zdnb'],
computed:{
  nb:function(){
    return this.zdnb.trim()
  }
}
```


## computed 和 watch 

`computed` 是计算属性，值具有缓存，只有当其依赖的值改变时，下一次获取的值才会重新计算。

`watch` 观察某值，每当其发生改变时就会触发，类似对数据的监听回调，值无缓存

运用场景：

- 当进行数值计算时，并依赖于其他数据时用 `computed` 可以利用其缓存的特性，避免每次获取都要重新计算

- 当在数据变化时执行异步操作或其他开销较大的操作时，使用 `watch` ，允许在执行异步操作，限制执行该操作的频率，并在得道最终结果前，设置中间状态，这些计算属性无法做到


## 修改vue数组

vue2 无法检测以下变动：

- 利用索引设置数组项时 如：vm.items[indexOfItem] = newValue
- 修改长度时 如：vm.items.length = newLength

解决办法：

```js
Vue.set(vm.items,indexOfItem,newValue)
vm.$set(vm.items,indexOfItem,newValue)
vm.items.splice(indexOfItem,1,newValue)// 既可以修改值也可以解决修改长度
```

Vue支持的其他数组方法:
- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

> 理由是受到JavaScript的限制无法实现，但修改vue源码可以发现实际上是可以实现的，不过 `尤大` 认为这样做影响性能得不偿失，所以重写了数组的原型，并支持上面列出的方法来修改仍能保持响应式

JavaScript里:

```js
let arr =  [1,2,3];
arr.forEach((item,index)=>{
    Object.defineProperty(arr,index,{
        get(){
            console.log('获取了值:',item);
            return item
        },
        set(newValue){
            console.log('新的值为:',newValue)
            item=newValue
        }
    })
})
// arr[1] // 触发
// arr[1]=3 // 触发
// console.log(arr);
arr.length=4 // 没有触发
// console.log(arr)
arr.push(5);  //没有触发监听
// console.log('arr[3]：',arr[3]);
// console.log('arr[4]：',arr[4]);
```

vue2源码：

```js
// 保留 自己未修改成功
```

该问题在vue3 使用 `proxy` 实现响应式后已解决


## 生命周期

就是从一个Vue实例开始创建、初始化数据、模板编译、挂载Dom->渲染、更新->渲染、卸载等一系列过程，就是Vue的生命周期

| 生命周期 | 描述 |
|---      |---    |
| beforeCreate | 实例创建之初，组件属性生效之前 |
| created | 组件实例已创建，属性也绑定，DOM还未生成，$el不可用 |
| beforeMount | 在挂载开始前调用，相关 `render` 首次被调用 |
| mounted | dom已挂载 |
| beforeUpdate | 组件数据更新前调用，在虚拟DOM打补丁前 |
| updated | 组件数据更新后 |
| beforeDestory | 组件销毁前调用 |
| destoryed | 组件销毁后调用 |
| actived | `keep-alive` 专属，组件被激活时调用|
| deactived | `keep-alive` 专属,组件被销毁时调用|

### 父组件和子组件生命周期钩子函数执行顺序

- 加载渲染过程

父 beforeCreate > 父 create > 父 beforeMount > 子 beforeCreate > 子 create > 子 beforeMount > 子 mounted > 父 mounted

- 子组件更新

父 beforeUpdate > 子 beforeUpdate > 子 updated > 父 updated 

- 父组件跟新

父 beforeUpdate > 父 updated 

- 销毁过程

父 beforeDestory > 子 beforeDestory > 子 destoryed > 父 destoryed 


### 哪个生命周期用异步请求

created、beforeMount、mounted 都可以，因为 `data` 已创建，最推荐created，可以减少loading时间，ssr 不支持 beforeMount、mounted 所以在 created 中可以确保统一性

### 什么阶段能访问DOM

mounted

### 父组件监听子组件生命周期

- 子组件的 mounted 回调中使用 $emit 派发自定义事件给父组件
- @hook （其他生命周期也可以监听）

```js
<Child @hook:mounted="do"></Child>

do(){
  console.log('父组件见听到子组件mounted触发')
}

// 子组件
mounted(){
  console.log('子组件mounted触发')
}

// 触发顺序
// 子组件mounted触发 > 父组件见听到子组件mounted触发
```

## keep-alive

是Vue的内置组件，可以使被包含的组件保留状态，避免重新渲染，有以下特性：
- 一般结合路由和动态组件使用，缓存组件
- 提供 include 和 exclude 属性，都支持正则表达式，include 只要名称匹配才会被缓存，exclude 任何名称匹配的组件都不会缓存且优先级比 include 高
- 会触发两个钩子函数 actived、deactived

## data为什么是一个函数

在 new Vue 实例是对象，组件中是函数，组件要被重复使用，所以需要将 data 的属性值隔离防止互相影响


## v-model 原理

语法糖，用于表单 input、textarea、select等元素上创建双向数据绑定

- text 和 textarea 元素使用 value 属性和 input 事件
- checkbox 和 radio 使用 checked 属性和 change 事件
- select 字段将 value 作为 prop 并将 change 作为事件

```html
<input v-model="some"></input>
<!-- 相当于 -->
<input v-bind:value="some" v-on:input="some=$event.target.value"></input>

```

在自定义组件中会默认利用名为 value 的 prop 和名为 input 的事件

```html
<!-- 父组件中使用 -->
<child v-model="cool"></child>

<!-- 子组件 -->
<div>{{value}}</div>
props:{
  value:string
},
method:{
  test(){
    this.$emit('input','我是天才') // 能够派发input事件给父组件
  }
}
```

## 使用过Vue SSR 吗

SSR 就是服务端将渲染后的 html 直接返回给客户端

优点：
- 更好的 SEO ，因为 SPA 页面内容是通过 ajax获取的，而搜索引擎工具不会等待 ajax 完成后再抓取页面内容，而 SSR 由服务端直接返回渲染完的页面，所以搜索引擎爬取工具可以抓取渲染好的页面
- 首屏加载会更快

缺点：
- 更多的开发条件限制，需要在 nodejs 环境运行，只支持 beforeCreate 和 created 两个钩子函数
- 更高的服务器负载


## vue-router 路由模式

- hash url中带有#，当哈希值发生变化时，不会向服务器发起请求，通过监听hashchange事件来进行路由导航
- history 正常的url地址，url变化时会向浏览器发送请求，服务器要配置路由规则，否则会出现刷新404的情况
- abstract 用于非浏览器环境，如 SSR 时，在该模式下，vue-router不会对url进行任何处理，而是将路由信息保存在内存中，通过编程方式进行导航

### 实现原理

hash：
- 基于 `loaction.hash` 实现，loaction.hash 的值就是 # 后面的内容
- hash  值改变都会在浏览器中增加一个记录，可以使用浏览器的前进回退来切换
- 可以通过标签 a 设置 href 属性，当用户点击这个标签后，hash 值就会变化，或者对 loaction.hash 来进行赋值来改变 hash 的值
- 可以通过 hashchange事件来监听 hash 的变化，从而进行跳转

history：
- H5提供 History API 来实现 URL 的变化，主要使用 history.pushState() 和 history.replaceState(),可以在浏览器不刷新的情况下操作历史记录
```js
window.history.pushState(state,'',path) // 新增一个记录
window.history.replaceState(state,'',path) // 直接替换当前记录
```
- 使用 pushState ， replaceState 实现 URL 变化
- 使用 popstate 浏览器前进后退时触发，可以用来监听 url 变化
- pushState，replaceState 不会触发 popstate，当调用 history.back 与 history.go 时会触发（也就是上面的前进后退）


## 什么是 MVVM

Model view view-Model，数据变化会更新视图，视图变化也会更新数据，是双向的绑定

## Vue如何实现的双向绑定

- 实现一个监听器 `Observer`：对数据进行遍历，包括子属性对象的属性，利用 `Object.defineProperty()` （vue2）对属性都加上 `getter` `setter` ，这样给某个值赋值就会触发 `setter` 就实现了监听数据变化

- 实现一个解析器 `Compile`：解析 Vue 模板指令，将模板中的变量都换成数据，然后初始化页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数对数据进行更新

- 实现一个订阅者 `Watcher`：watcher 是 Observer 和 Compile 之间通信的桥梁，用来订阅 Observer 中的属性值变化消息，收到变化消息后，触发 对应的更新函数

- 实现一个订阅器 `Dep`:订阅器采用 发布-订阅模式，用来收集订阅者 Watcher，对监听器 Observer 和 Watcher 进行统一管理

Compile 编译模板并绑定更新函数到 Wather ，Watcher添加订阅者到 Dep，
Observer 劫持监听所有属性，属性变化时通知 Dep，Dep通知Watcher ，Watcher调用更新函数实现更新


## Proxy与Object.defineProperty

Proxy优势：
- 可以直接监听整个对象而不是单一属性
- 可以直接监听数组变化
- 更多的拦截方法，如apply，ownKeys，deleteProperty，has等
- 返回的是一个新的对象，可以操作新的对象去完成一些操作，Object.defineProperty只能遍历的去直接修改属性
- 新标准会受到浏览器厂商重点持续的性能优化

Object.defineProperty优势：
- 兼容性更好，支持IE9，Proxy无法用polyfill

##虚拟DOM实现原理及优缺点

虚拟DOM就是对真实DOM的抽象描述版，模拟真实DOM树，通过 `diff` 算法来比较两个虚拟DOM树的差异，通过 `pach` 算法将两个虚拟DOM对象的差异应用到真正的DOM树

优点：
- 无需手动操作DOM，写好 View-Model的代码逻辑框架会更加虚拟DOM和数据进行双向绑定，极大提高开发效率
- 实现跨平台，虚拟DOM本质上是JavaScript对象，而DOM与平台强相关，相比之下能够更方便跨平台，如服务端渲染，weex开发等等
- 保证性能下限

缺点：
- 无法进行针对性的极致优化


## v-for的key有什么用

主要作用是为了高效的更新虚拟DOM，提高渲染性能，key可以避免数据混乱的情况出现

key只能是字符串或者数字利息，必须具有唯一性，使用index做key值没有意义


## Vue项目进行过哪些优化