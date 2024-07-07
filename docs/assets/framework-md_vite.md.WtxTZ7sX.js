import{_ as s,c as i,o as a,a3 as n}from"./chunks/framework.RbRFL2qC.js";const c=JSON.parse('{"title":"vite 框架相关","description":"","frontmatter":{},"headers":[],"relativePath":"framework-md/vite.md","filePath":"framework-md/vite.md","lastUpdated":1719838535000}'),l={name:"framework-md/vite.md"},t=n(`<h1 id="vite-框架相关" tabindex="-1">vite 框架相关 <a class="header-anchor" href="#vite-框架相关" aria-label="Permalink to &quot;vite 框架相关&quot;">​</a></h1><h2 id="打包发布插件" tabindex="-1">打包发布插件 <a class="header-anchor" href="#打包发布插件" aria-label="Permalink to &quot;打包发布插件&quot;">​</a></h2><ol><li>初始化仓库，安装需要插件</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npm i init</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npm i @vitejs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">plugin</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">vue</span></span></code></pre></div><ol start="2"><li>配置 vite.config.ts</li></ol><ul><li>entry：指定要打包的入口文件。</li><li>name：包的名称</li><li>fileName：包文件的名称，默认是umd和es两个文件。</li><li>sourcemap：是否生成 .map 文件，默认是不会生成的，如果需要的话需要设置为 true。</li><li>rollupOptions：如果项目引用了第三方插件，那么需要在这里设置排除，如果不设置的话，第三方插件的源码也会被打包进来，这样打包文件就变大了。排除之后第三方的插件会单独存在。</li><li>css: 引入公共样式</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> vue </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@vitejs/plugin-vue&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { defineConfig } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vite&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    plugins:[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    build:{ </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 打包配置</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        lib:{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            entry:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./Card.vue&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 要打包的文件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            fileName:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Card&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 输出文件名</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            name:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Card&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 包的名称 </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            formats:[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;umd&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;es&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;cjs&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;iife&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//输出文件格式</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    css:{}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><ol start="3"><li>打包</li></ol><p>打包后默认在 <code>dist</code> 文件夹</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npv vite build</span></span></code></pre></div><ol start="4"><li>登陆 npm 官网发布（注意要在npm源才行）</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 添加用户</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npm adduser</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 登录</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npm login</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 发布</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">npm publish</span></span></code></pre></div><p>package.json 里的 name 会作为包名发布</p>`,13),p=[t];function e(h,k,d,E,r,g){return a(),i("div",null,p)}const y=s(l,[["render",e]]);export{c as __pageData,y as default};