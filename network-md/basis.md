# 网络请求相关

## Ajax

AJAX 不是 JavaScript 的规范，它只是一个哥们“发明”的缩写：Asynchronous JavaScript and XML，意思就是用JavaScript执行异步网络请求

### 原生Ajax

直接写一个例子

```html
<body>
    <button class="btn">点我起飞</button>
    <div id="progress"></div>
    <script>
        const btn =document.querySelector('.btn');
        const progress =document.querySelector('#progress');

        // ajax 请求
        // 1.先创建实例
        const xhr = new XMLHttpRequest();

        // 可以设置超时时间
        // xhr.timeout = 1000 // 单位毫秒

        // 2.设置参数
        // open方法写明要访问的 方法 地址 
        // 第三个参数是同步或者异步（默认异步一般不写第三个参数）
        xhr.open('GET','http://localhost:3000/txt')

        // 超时的回调
        xhr.ontimeout= function(){
            console.log('请求超时');
        }

        // 接收返回值的方法
        // onreadystatechange 有 0 1 2 3 4 种状态 一般会用 4 
        // 0-（未初始化） 还没调用 send方法
        // 1-（载入） 已经调用 send方法，正在发送请求
        // 2-（载入完成） 已经接收到全部响应内容
        // 3-（交互） 正在解析响应内容
        // 4-（完成） 响应内容解析完成，可以在客户端调用了

        // xhr.onreadystatechange=function(){
        //     // 这两合适了就代表成功了
        //     if(xhr.readyState === 4 && xhr.status === 200){
        //         // 因为我这里后端写的接口返回的是文本内容所以直接用 
                   // 如果后端返回是其他格式记得手动处理
        //         // console.log(xhr.responseText); // 打印返回的结果
        //     }
        // }

        // onload 和 onreadystatechange 选一个就行了
        // onload 直接到 4 再判断一下状态码就行了  （用的多）

        xhr.onload=function(){
            if(xhr.status === 200){
                // console.log(xhr.responseText);
            }
        }

        // 请求失败的回调
        xhr,onerror=function(){
            console.log('请求失败了');
        
        }
        // 中断请求的回调
        xhr.onabort=function(){
            console.log('请求被中断了');
        }

        // 监听进度 可以拿来做进度条
        xhr.onprogress=function(e){
            // e.total 当前进度 e.loaded 总进度
            progress.innerText = (e.loaded / e.total * 100 ).toFixed(2)+ '%'; //保留两位小数
        }

        // 3.给后端响应 到这里就一个请求就结束了
        xhr.send(null);
        
        btn.addEventListener('click',()=>{
            // 中断ajax请求
            xhr.abort(); //是的你没看错一行搞定
        })
    </script>
</body>
```

## fetch

fetch 是一个新的 api 它是一个原生 api 它基于 promise 它比 ajax 简单很多

默认下只支持 GET POST

默认不携带 cookie

默认没有超时时间的设置

默认无法中断

做进度条会非常麻烦

```js
// 一行搞定 默认 GET 请求
fetch('http://localhost:3000/txt')
.then(res=>res.text()) // 这里是数据返回格式 因为例子是 text 所以用 text() 常见有 json arrayBuffer blob formData 
.then(res=>console.log(res)) // 这里是返回值
// ndoe 18版本以上也可以使用 fetch
```

实现中断 和 超时：

```js
// 创建 abotr 实例
const abotr = new AbortController();
fetch('http://localhost:3000/txt',{
    signal:abotr.signal
})
.then(res=>res.text()) 
.then(res=>console.log(res))
.catch(err=>console.log(err,'请求有问题了捏'))
// 然后随便写个方法去调用 abotr.abort() 就可以了 

// 超时 直接这样写就行了 也是触发 abotr.abort() 方法
setTimeout(()=>{
    abotr.abort();
},3000)
```

实现进度条：

```js
fetch('http://localhost:3000/txt')
.then(async res=>{
    // 先克隆一份流 补下面的坑
    const response = res.clone()
    // 获取文件总大小 在响应头里能看到
    const contentLength = res.headers.get('content-length')
    //响应体的流
    const reader = res.body.getReader()
    //  用来表示已加载了多少
    let current = 0
    while(true){
        // 读取流
        // await 后面跟的是一个 promise 对象
        // 这里返回的是一个对象 对象里有一个 done 属性 表示是否读取完毕
        // 还有一个 value 属性 表示读取到的内容
        const {done,value} = await reader.read()
        // 不断累积起来 效果就是xhr.onprogress 里的 e.loaded
        current += value.length
        // 这里可以写进度条的逻辑
        progress.innerText = (current / contentLength * 100).toFixed(2)+'%';
        if(done){ // 当文件已经加载完毕后这个 done 的值就会变成 true 这样就跳出 while循环
            break;
        }
    }
    return response.text() //这里把克隆的流 return给下一个 .then 就解决了
}) //这里有一个坑 就是这个流如果被使用了 那么下面的 .then就无法拿到返回的结果了 所以在上面储存一份
.then(res=>console.log(res)) 
```

其他参数：

```js
fetch('http://localhost:3000/txt',{
    // signal:abotr.signal // 设置中断
    method:'delete', // 默认是 GET
    // 请求头
    headers:{
        'Content-Type':'application/json'
    },
    // 请求体
    body:JSON.stringify({
        name:'张三',
        age:18
    }),
    // 默认不携带 cookie 这里设置为 include 表示携带
    credentials:'include', 
})
.then(res=>res.text()) 
.then(res=>console.log(res))
```

## sse (server-sent-ebents 服务器推送)

单工通讯,后端可以实时推送给前端东西,前端只能发送一次,大屏可视化大部分都是这个, chatGpt 也是

后端代码:

```js
app.get('/sse',(req,res)=>{
    res.writeHead(200,{
        'Content-Type':'text/event-stream', // 核心！！！！
        'Connection':'keep-alive', // 保持连接  可以断开自动重连
    })
    // 举例发送些数据 一秒发一次
    setInterval(()=>{
        // res.write('event:nb\n') // 这里修改成 nb 前端也要把 message 改成 nb
        res.write('data: '+new Date().toLocaleString()+'\n\n')
    },1000)
})
```

前端代码：

```js
// EventSource
const sse = new EventSource('http://localhost:3000/sse');
//message是默认写法 后端可以修改 修改后双方都要一致不然无效
sse.addEventListener('message',(e)=>{
    progress.innerText = e.data
})
// sse.addEventListener('nb',(e)=>{
//     progress.innerText = e.data
// })

```

## websocket (实时通讯)

先安装 ws 模块

```js
npm i ws
// 引入 ws 模块
import {WebSocketServer} from "ws";

```

使用 websocket 时要依附在服务上面

后端代码:

```
const server = app.listen(3000,()=>{
    console.log('http://localhost:3000')
})

const wss = new WebSocket.Server({server}) // 核心！ 依附在服务上面

wss.on('connection',(ws)=>{
    console.log('有人连上了')
    // ws.on 接收前端发来的数据
     ws.on('message',(message)=>{
        console.log('收到消息了',message);
    })
    setInterval(()=>{
        ws.send('hello') // 给前端返回点东西
    },1000)
})
// 还有个心跳包的东西 socket.io 自带 后面在研究吧
```

前端代码：

注意给后端发送时不能发送对象! 只能字符串或者 buffer

当然你把对象转 json 就能发了 哈哈哈

```js
const ws = new WebSocket('ws://localhost:3000'); // 核心！ 连接服务上面创建的 ws 服务 不是 http服务
// 固定写法 message 也是固定 接收后端给的 hello
ws.addEventListener('message',(e)=>{ // 只要后端变化了就会推送给前端
    console.log(e.data)
})
ws.addEventListener('open',(e)=>{ // 连接成功后会执行一次 可以拿来调试
    console.log('连接成功我就会触发一次 就一次')
})
// 随便搞个按钮 给后端发点数据
btn.addEventListener('click',()=>{
// ws 给后端发送数据
 ws.send('我是前端来的')
})

```