# Vue 基础

## 父子传参

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

