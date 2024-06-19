# Javascript 进阶

## 作用域和闭包

### 作用域

- 全局作用域(Global)

    全局的作用域很好理解，即全局下的变量、函数在任何地方都能被访问到，可以使用window对象来访问 

- 函数作用域(Local)

    函数拥有自己的作用域，也就是说函数内声明的变量和函数，只在函数内有效

- 块级作用域(Block)

     被 {} 包裹，如if、while、for 等语句

- script作用域

    let const 声明全局变量时的特殊作用域，可以直接访问这个全局变量，但是却不能通过 window.xx 访问

- Catch Block 作用域

    Catch 语句也会生成一个特殊的作用域，Catch Block 作用域，特点是能访问错误对象

    ```script
    try{
        throw new Error("gg");
    } catch(err){
        debugger;
    }
    // 在控制台给 debugger断点 可以看到 Catch block > err > message:"gg"
    // finally 是块级
    ```

- Closure 作用域 (闭包核心)

    闭包是 JS 的常见概念，它是一个函数返回另一个函数的形式，返回的函数引用了外层函数的变量，就会以闭包的形式保存下来

- Eval 作用域

    eval 的代码里声明的变量都在Eval这个作用域里

    ```script
    function foo(str, a) { 
    eval( str ); // 欺骗！ 
    console.log( a, b ); 
    } 
    var b = 2; 
    foo( "var b = 3;", 1 ); // 1, 3

    ```

- With Block 作用域 （with语句已移除）
    `

### 闭包

红宝书上对于闭包的定义：闭包是指有权访问另外一个函数作用域中的变量的函数

MDN 对闭包的定义为：闭包是指那些能够访问自由变量的函数

说白了就是我可以在一个函数访问到另一个函数的变量

```script
    var a = 1;
    function foo(){
        var a = 2;
        function baz(){
            console.log(a);
        }
        bar(baz);
    }
    function bar(fn){
        fn();
    }
    foo(); // 输出2，而不是1
```

### 防抖与节流

- 防抖：
    
    设置一个时间，触发函数时会开始计时，如果在时间还未结束时再次触发了函数那么就会清除上一次的时间并重新开始计时，参考 王者荣耀回城
    
    ```script
    function debounce(func, wait) {
    let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }
    ```

- 节流：
    
    设置一个时间,触发函数时开始计时，一但进入计时阶段函授就无法再次触发直到计时结束,参考 王者荣耀英雄技能冷却

    ```script
    function throttle(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            if (!timeout) {
            timeout = setTimeout(function() {
                timeout = null;
                func.apply(context, args);
            }, wait);
            }
        };
    }
    ```


## 原型和原型链


##  this

##  异步和单线程

##  跨域和预检请求

##  模块化

##  事件循环

##  Promise

##  Generator

##  async/await