import{_ as a,c as s,o as n,a3 as p}from"./chunks/framework.BC7Wwveh.js";const _=JSON.parse('{"title":"Javascript 进阶","description":"","frontmatter":{},"headers":[],"relativePath":"js-md/progress.md","filePath":"js-md/progress.md"}'),e={name:"js-md/progress.md"},t=p(`<h1 id="javascript-进阶" tabindex="-1">Javascript 进阶 <a class="header-anchor" href="#javascript-进阶" aria-label="Permalink to &quot;Javascript 进阶&quot;">​</a></h1><h2 id="作用域和闭包" tabindex="-1">作用域和闭包 <a class="header-anchor" href="#作用域和闭包" aria-label="Permalink to &quot;作用域和闭包&quot;">​</a></h2><h3 id="作用域" tabindex="-1">作用域 <a class="header-anchor" href="#作用域" aria-label="Permalink to &quot;作用域&quot;">​</a></h3><ul><li><p>全局作用域(Global)</p><p>全局的作用域很好理解，即全局下的变量、函数在任何地方都能被访问到，可以使用window对象来访问</p></li><li><p>函数作用域(Local)</p><p>函数拥有自己的作用域，也就是说函数内声明的变量和函数，只在函数内有效</p></li><li><p>块级作用域(Block)</p><p>被 {} 包裹，如if、while、for 等语句</p></li><li><p>script作用域</p><p>let const 声明全局变量时的特殊作用域，可以直接访问这个全局变量，但是却不能通过 window.xx 访问</p></li><li><p>Catch Block 作用域</p><p>Catch 语句也会生成一个特殊的作用域，Catch Block 作用域，特点是能访问错误对象</p><div class="language-script vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>try{</span></span>
<span class="line"><span>    throw new Error(&quot;gg&quot;);</span></span>
<span class="line"><span>} catch(err){</span></span>
<span class="line"><span>    debugger;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 在控制台给 debugger断点 可以看到 Catch block &gt; err &gt; message:&quot;gg&quot;</span></span>
<span class="line"><span>// finally 是块级</span></span></code></pre></div></li><li><p>Closure 作用域 (闭包核心)</p><p>闭包是 JS 的常见概念，它是一个函数返回另一个函数的形式，返回的函数引用了外层函数的变量，就会以闭包的形式保存下来</p></li><li><p>Eval 作用域</p><p>eval 的代码里声明的变量都在Eval这个作用域里</p><div class="language-script vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function foo(str, a) { </span></span>
<span class="line"><span>eval( str ); // 欺骗！ </span></span>
<span class="line"><span>console.log( a, b ); </span></span>
<span class="line"><span>} </span></span>
<span class="line"><span>var b = 2; </span></span>
<span class="line"><span>foo( &quot;var b = 3;&quot;, 1 ); // 1, 3</span></span></code></pre></div></li><li><p>With Block 作用域 （with语句已移除） \`</p></li></ul><h3 id="闭包" tabindex="-1">闭包 <a class="header-anchor" href="#闭包" aria-label="Permalink to &quot;闭包&quot;">​</a></h3><p>红宝书上对于闭包的定义：闭包是指有权访问另外一个函数作用域中的变量的函数</p><p>MDN 对闭包的定义为：闭包是指那些能够访问自由变量的函数</p><p>说白了就是我可以在一个函数访问到另一个函数的变量</p><div class="language-script vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    var a = 1;</span></span>
<span class="line"><span>    function foo(){</span></span>
<span class="line"><span>        var a = 2;</span></span>
<span class="line"><span>        function baz(){</span></span>
<span class="line"><span>            console.log(a);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        bar(baz);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    function bar(fn){</span></span>
<span class="line"><span>        fn();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    foo(); // 输出2，而不是1</span></span></code></pre></div><h3 id="防抖与节流" tabindex="-1">防抖与节流 <a class="header-anchor" href="#防抖与节流" aria-label="Permalink to &quot;防抖与节流&quot;">​</a></h3><ul><li><p>防抖：</p><p>设置一个时间，触发函数时会开始计时，如果在时间还未结束时再次触发了函数那么就会清除上一次的时间并重新开始计时，参考 王者荣耀回城</p><div class="language-script vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function debounce(func, wait) {</span></span>
<span class="line"><span>let timeout;</span></span>
<span class="line"><span>    return function() {</span></span>
<span class="line"><span>        const context = this;</span></span>
<span class="line"><span>        const args = arguments;</span></span>
<span class="line"><span>        clearTimeout(timeout);</span></span>
<span class="line"><span>        timeout = setTimeout(function() {</span></span>
<span class="line"><span>            func.apply(context, args);</span></span>
<span class="line"><span>        }, wait);</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>}</span></span></code></pre></div></li><li><p>节流：</p><p>设置一个时间,触发函数时开始计时，一但进入计时阶段函授就无法再次触发直到计时结束,参考 王者荣耀英雄技能冷却</p><div class="language-script vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function throttle(func, wait) {</span></span>
<span class="line"><span>    let timeout;</span></span>
<span class="line"><span>    return function() {</span></span>
<span class="line"><span>        const context = this;</span></span>
<span class="line"><span>        const args = arguments;</span></span>
<span class="line"><span>        if (!timeout) {</span></span>
<span class="line"><span>        timeout = setTimeout(function() {</span></span>
<span class="line"><span>            timeout = null;</span></span>
<span class="line"><span>            func.apply(context, args);</span></span>
<span class="line"><span>        }, wait);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>}</span></span></code></pre></div></li></ul><h2 id="原型和原型链" tabindex="-1">原型和原型链 <a class="header-anchor" href="#原型和原型链" aria-label="Permalink to &quot;原型和原型链&quot;">​</a></h2><h3 id="原型" tabindex="-1">原型 <a class="header-anchor" href="#原型" aria-label="Permalink to &quot;原型&quot;">​</a></h3><p>在 JavaScript 中函数也是对象</p><p><code>__proto__</code>、 <code>constructor</code> 属性是对象所独有的</p><p><code>prototype</code> 属性是函数独有的</p><p>上面说过js中函数也是对象的一种，那么函数同样也有属性 <code>__proto__</code>、 <code>constructor</code></p><p>看下面例子</p><div class="language-script vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 一个普通函数</span></span>
<span class="line"><span>function Father(){</span></span>
<span class="line"><span></span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>// = 左边是实例化后的对象， = 右边就是构造函数，从左到右的过程就是实例化</span></span>
<span class="line"><span>let father = new Father();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 左边对象有两个属性，constructor和__ proto __</span></span>
<span class="line"><span>// 右边的构造函数有prototype </span></span>
<span class="line"><span>//  constructor 属性用于记录实例是由哪个构造函数创建</span></span>
<span class="line"><span>    console.log(father.__proto__);// 存在</span></span>
<span class="line"><span>    console.log(father.constructor);// Father()函数</span></span>
<span class="line"><span>    console.log(father.prototype);// undefined</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    console.log(Father.prototype);// 存在</span></span>
<span class="line"><span>    console.log(Father.prototype.constructor);// Father()函数</span></span>
<span class="line"><span>    console.log(Father.__proto__);// 存在</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    console.log(father.__proto__ === Father.prototype);// true</span></span></code></pre></div><p>这样你就可以看到 这个 <code>constructor</code> 其实是构造函数 <code>Father</code> 的 <code>prototype</code> 的一个属性</p><p><code>father</code> 的原型对象就是指 <code>Father.prototype</code> ,(<code>Father.prototype</code>又称为显式原型, <code>father</code> 的 <code>__proto__</code> 又称为隐式原型)</p><p><code>father</code> 的对象原型就是指 <code>Father.prototype.constructor</code> 的值，它指向了 <code>Father()</code> 函数</p><p><code>constructor</code> 仅供于记录实例是由哪个构造函数创建，而 <code>prototype</code> 才是用来记录属性和方法的地方</p><h3 id="原型链" tabindex="-1">原型链 <a class="header-anchor" href="#原型链" aria-label="Permalink to &quot;原型链&quot;">​</a></h3><p>你可以把 <code>Father</code> 的 <code>prototype</code> 理解成为一个仓库，当 <code>father</code> 对象需要某些属性而自身也没有的时候，就会通过自己的 <code>__proto__</code> 上去寻找 也就是去 <code>Father</code> 的 <code>prototype</code> 中寻找，如果也没有找到就会去 <code>Object.protitype</code> 上寻找，因为 <code>Father.prototype</code> 本身也是一个对象，而它是通过 <code>Object</code> 构造函数创建的，所以 <code>Father.prototype.__proto__</code> 就是 <code>Object.prototype</code>，同理 <code>Object.prototype.__proto__</code> 就是 <code>null</code>,就这样一层层寻找形成的链路就叫原型链，最终找不到就会返回 <code>null</code></p><div class="language-script vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    console.log(father.__proto__ === Father.prototype);// true</span></span>
<span class="line"><span>    console.log(Father.prototype.__proto__ === Object.prototype);// true</span></span>
<span class="line"><span>    console.log(Object.prototype.__proto__ === null);// true</span></span></code></pre></div><h2 id="this" tabindex="-1">this <a class="header-anchor" href="#this" aria-label="Permalink to &quot;this&quot;">​</a></h2><h2 id="异步和单线程" tabindex="-1">异步和单线程 <a class="header-anchor" href="#异步和单线程" aria-label="Permalink to &quot;异步和单线程&quot;">​</a></h2><h2 id="跨域和预检请求" tabindex="-1">跨域和预检请求 <a class="header-anchor" href="#跨域和预检请求" aria-label="Permalink to &quot;跨域和预检请求&quot;">​</a></h2><h2 id="模块化" tabindex="-1">模块化 <a class="header-anchor" href="#模块化" aria-label="Permalink to &quot;模块化&quot;">​</a></h2><h2 id="事件循环" tabindex="-1">事件循环 <a class="header-anchor" href="#事件循环" aria-label="Permalink to &quot;事件循环&quot;">​</a></h2><h2 id="promise" tabindex="-1">Promise <a class="header-anchor" href="#promise" aria-label="Permalink to &quot;Promise&quot;">​</a></h2><h2 id="generator" tabindex="-1">Generator <a class="header-anchor" href="#generator" aria-label="Permalink to &quot;Generator&quot;">​</a></h2><h2 id="async-await" tabindex="-1">async/await <a class="header-anchor" href="#async-await" aria-label="Permalink to &quot;async/await&quot;">​</a></h2>`,34),o=[t];function l(c,i,r,d,h,u){return n(),s("div",null,o)}const g=a(e,[["render",l]]);export{_ as __pageData,g as default};
