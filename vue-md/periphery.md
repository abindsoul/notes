# Vue周边生态


## vuex

vue2 推荐使用 (vuex3) 的状态管理模式，采用集中式存储管理应用的所有组件的状态。（原理：单例模式：使用过程中通过 Vue.use(Vuex) 安装了Vuex插件,而Vuex 插件是一个对象，它在内部实现了一个 install 方法，这个方法会在插件安装时被调用，从而把 Store 注入到Vue实例里去。也就是说每 install 一次，都会尝试给 Vue 实例注入一个 Store）

核心：

- `state`：单一状态树（存数据的仓库，数据是响应式的）
    如何使用：`this.$store.state` 或 `mapState` 辅助函数映射到组件
- `getter`：从基本数据 state 里派生的数据 （相当于计算属性） 
    如何使用：`store.getters` 或 `mapGetters` 辅助函数映射到组件
- `mutation`: 唯一能够修改 state 数据的方法（同步） （相当于方法）
    如何使用：`this.$store.commit('xxx')` 或 `mapMutations` 辅助函数映射到组件
- `action`: 提交 mutation 而不是直接变更状态（异步） （相当于方法）
    如何使用：`this.$store.dispatch('xxx')` 或 `mapActions` 辅助函数映射到组件

- `modules`: 模块化，每个模块拥有自己的 state、mutation、action、getter
    如何使用: 

```js
// 不同的两个文件存放不痛模块数据
// custom.js
const customs = {
    namespaced: true, // 创建命名空间
    state: { // 存储变量
        tc1：'你他两还真个天才'
    },
    mutations: {
    // ...此处省略
  },
  actions: {
    // ...此处省略
  },
  getters: {
    // ...此处省略
  }
}
export default customs


// profile.js
const profile = {
  namespaced: true,
  state: {
    tc2:'好好好你是天才'
  },
  mutations: {
    // ...此处省略
  },
  actions: {
    // ...此处省略
  },
  getters: {
    // ...此处省略
  }
}
export default common

// index.js 将两个文件挂载上
import Vue from 'vue'
import Vuex from 'vuex'
// 引入子store
import profile from './modules/profile'
import customs from './modules/customs'
// Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    profile,
    customs
  }
})
export default store // 导出store，以便于后续使用

// 组件使用
computed: {
    ...mapState('profile', ['tc2']),
    ...mapState('customs', ['tc1'])
  },
```

好处:

1. 能够在vuex中集中管理共享的数据,易于开发和后期的维护

2. 能够高效的实现组件间的数据共从而提高开发效率

3. 存储在vuex中的数据都是响应的能够实时保持数据页面的共享同



## Pinia

- 完全取代 vuex，完整的 ts 支持
- 轻量，去除 mutations，
- actions 支持同步异步
- 代码扁平化没有模块嵌套，只有 store 的概念，store 之间可以自由使用，每一个 store 都是独立的
- 无需手动添加 store，一点创建自动添加
- 支持 vue2 vue3

安装:

```js
yarn add pinia
# 或者使用 npm
npm install pinia
```

使用：

```js
// main.ts 
import {createPinia} from 'pinia'
const store = createPinia()
app.use(store)

// store-name.ts index.ts同级目录
export const enum Names{
    // 定义枚举值
    TEST='TEST'
}

// src 创建 store 文件夹 再创建 index.ts
import {defineStore} from 'pinia'
import {Names} from './store-name'
export const useTestStore =defineStore(Names.TEST, {
    state: () => ({
        // 定义变量
            current:'我去',
            name:'天才'
    }),
    getters: { // 具有缓存的特性
        // 定义getter
    },
    actions: {
        // 定义action
        setCurrent(val:string){
            this.current='我是action修改的:'+val
        }
    }
})

// 组件使用
import {useTestStore } from './store'
const Test = useTestStore() // Test. 即可拿到 state 里定义的属性

```

`state` 的值修改方法

1. 可以直接修改 如上面例子 Test.curren='卧槽'
2. Test.$patch({ current:'牛逼',name:'小天才'})
3. Test.$path((state)=>{
    state.current='哈哈',
    state.name='笨蛋'
    })
4. Test.$state={current:'哈哈',name:'笨蛋'} 会修改整个state（不推荐）
5. Test.setCurrent('是的没错') 调用 action 里的方法

解构 store 中的 state 变量（结构后不具有响应式，可用 `storeToRefs` 变成响应式）

```js
import { storeToRefs} from 'pinia' // 引入 storeToRefs 方法
const {current,name} = storeToRefs(Test) // 解构后具有响应式
```
---

一些 api 的使用

 - `.$reset()` 将 state 恢复至初始状态
- `.$subscribe((args,state)=>{},{detached:true})` state 任何值变化后都会触发该函数，有两个参数(args,state) args可以看新旧值，state就是修改后的state对象，detached ，其他的详见官网文档
- `.$onAction((args)=>{},true)` 调用 action 时会触发  ture 代表 使用的组件被销毁后扔可继续监听 action 触发

---

持久化插件：

这里是写在 main.ts 里,下面是完整代码

```ts
import { createApp,toRaw } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia,PiniaPluginContext} from 'pinia'
  
type Options={
    key:string
}
// 一个默认key 如果用户没有设定自己的key就用这个
const __piniaKey__:string = 'pinia储存'
// 5. 用来实现存储的函数 key 用来区分不同的实例 value 都懂就是 state 的值
const setStorage= (key:string,value:any)=>{
    localStorage.setItem(key,JSON.stringify(value)) // value 要存到 localStorage 记得把值转换一下
}
// 6.用来读取 localStorage 里数据的函数
const getStorage=(key:string)=>{
    // 判断一下有没有当前 key 有的话拿出来 没有就返回空对象 as string 类型断言成string 因为存的就是string
    return localStorage.getItem(key)? JSON.parse(localStorage.getItem(key) as string):{};
}
// 1.定义插件函数
const piniaPlugin=(options:Options)=>{ //options 用户自定义配置
    // console.log('context',context); // 可以看到两个使用了的实例(这里看你自己调用过几个实例我这里是两个)
    // 用函数柯里化处理 pinia 的返回值 
    return (context:PiniaPluginContext)=>{
         // 3.解构store
    const {store} = context;
    // console.log(store);// 可以看到是两个 proxy 对象
    // 7. 读取存入的值
    const data =getStorage(`${options?.key ?? __piniaKey__}-${store.$id}`)
    // console.log(data);
    // 4. 利用 .$subscribe 在 state 数据变化时触发搞点事情
    store.$subscribe(()=>{
        console.log('检测到数据变化了');
        // 5.调用储存函数
        // options?.key ?? __piniaKey__ 这里判断用户设置的key可以有也可以不设置，不设置就会用上面写的默认的  
        // store.$id 取实例的 id 为了更好的区分不同实例 提高体验
        // store.$state 是个 proxy 对象不能直接用 用 toRaw 转成普通对象 toRaw 是vue的记得上面引入
        setStorage(`${options?.key ?? __piniaKey__}-${store.$id}`,toRaw(store.$state))
    })
    // 8. 把读到的值返回出去 否则页面刷新还是没有等于白写了半天
    return{
        ...data
    }
    }
}
const store = createPinia()
// 2.传递给 store 在内部会自己调用这个函数 会返回一些参数用 context 看看
store.use(piniaPlugin({ // 支持一个自定义对象防止和 localStorage 其他的冲突 也就是 函数要接受的options 这里定义对象了就要用柯里化处理了
    key:"pinia"
}))
createApp(App).use(store).mount('#app')
```


