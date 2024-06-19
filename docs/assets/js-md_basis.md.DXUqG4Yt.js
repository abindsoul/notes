import{_ as a,c as e,o as i,a3 as l}from"./chunks/framework.BC7Wwveh.js";const m=JSON.parse('{"title":"Javascript 基础","description":"","frontmatter":{},"headers":[],"relativePath":"js-md/basis.md","filePath":"js-md/basis.md"}'),t={name:"js-md/basis.md"},o=l(`<h1 id="javascript-基础" tabindex="-1">Javascript 基础 <a class="header-anchor" href="#javascript-基础" aria-label="Permalink to &quot;Javascript 基础&quot;">​</a></h1><h2 id="数据类型" tabindex="-1">数据类型 <a class="header-anchor" href="#数据类型" aria-label="Permalink to &quot;数据类型&quot;">​</a></h2><h3 id="基础类型" tabindex="-1">基础类型 <a class="header-anchor" href="#基础类型" aria-label="Permalink to &quot;基础类型&quot;">​</a></h3><ul><li>string 字符串</li><li>number 数字</li><li>boolean 布尔值</li><li><code>null</code></li><li><code>undefined</code></li><li><code>symbol</code> 唯一值接收字符串为参数</li><li><code>bigint</code> 大整数</li></ul><h3 id="复杂类型" tabindex="-1">复杂类型 <a class="header-anchor" href="#复杂类型" aria-label="Permalink to &quot;复杂类型&quot;">​</a></h3><ul><li>Objec 对象</li><li>Array 数组</li><li>Function 函数</li><li>RegExp 正则表达式</li><li>Date 日期</li><li>Set 集合 类似数组成员唯一，允许你储存任何类型的唯一值，不会有隐式转换</li><li>Map 映射 类似对象，键值可以是任意类型，具有极快的查找速度</li></ul><h2 id="变量" tabindex="-1">变量 <a class="header-anchor" href="#变量" aria-label="Permalink to &quot;变量&quot;">​</a></h2><h3 id="声明" tabindex="-1">声明 <a class="header-anchor" href="#声明" aria-label="Permalink to &quot;声明&quot;">​</a></h3><p>let 与 const 有独立块级作用域</p><ul><li><code>var</code> 变量会提升 值可修改 申明不赋值可访问(undefined)</li><li><code>let</code> 不会提升 值可修改 申明不赋值可访问(undefined)(无提升所以在输出后进行定义也会报错 ReferenceError)</li><li><code>const</code> 不会提升 值不可修改 暂时性死区直接报错 ReferenceError <em>这个声明为常量</em></li></ul><h3 id="作用域" tabindex="-1">作用域 <a class="header-anchor" href="#作用域" aria-label="Permalink to &quot;作用域&quot;">​</a></h3><ul><li>全局作用域</li><li>函数作用域</li><li>块级作用域</li></ul><h2 id="和-有什么区别" tabindex="-1">== 和 ===有什么区别 <a class="header-anchor" href="#和-有什么区别" aria-label="Permalink to &quot;== 和 ===有什么区别&quot;">​</a></h2><p>== 只比较值，不比较类型，会有隐式转换发生</p><ul><li>两边的类型是否相同，相同的话就比较值的大小，例如1==2，返回false</li><li>判断的是否是null和undefined，是的话就返回true</li><li>判断的类型是否是String和Number，是的话，把String类型转换成Number，再进行比较</li><li>判断其中一方是否是Boolean，是的话就把Boolean转换成Number，再进行比较</li><li>如果其中一方为Object，且另一方为String、Number或者Symbol，会将Object转换成字符串，再进行比较,例：</li></ul><div class="language-script vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">script</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    console.log({a: 1} == true);//false</span></span>
<span class="line"><span>    console.log({a: 1} == &quot;[object Object]&quot;);//true</span></span></code></pre></div><p>=== 叫做严格相等，是指：左右两边不仅值要相等，类型也要相等</p>`,17),r=[o];function s(n,c,d,h,u,p){return i(),e("div",null,r)}const _=a(t,[["render",s]]);export{m as __pageData,_ as default};
