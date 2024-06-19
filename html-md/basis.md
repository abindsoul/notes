# HTML相关

## 语义化

意义：让代码结构更清晰，便于团队开发和维护，以及浏览器爬虫的解析,方便设备解析（屏幕阅读器、盲人阅读器、移动设备等），以有意义的方式来渲染页面

通常一个文件中只出现一个 h1 和一个 main 标签最利于 SEO

使用 **表格** 时，标题要用 caption，表头用 thead，主体部分用 tbody 包围，尾部用 tfoot 包围。表头和一般单元格要区分开，表头用 th，单元格用 td

```html
<table>
  <caption>
    Front-end web developer course 2021
  </caption>
  <thead>
    <tr>
      <th scope="col">Person</th>
      <th scope="col">Most interest in</th>
      <th scope="col">Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Chris</th>
      <td>HTML tables</td>
      <td>22</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="2">Average age</th>
      <td>33</td>
    </tr>
  </tfoot>
</table>
```


**表单域** 要用 fieldset 标签包起来，并用 legend 标签说明表单的用途，
每个 input 标签对应的说明文本都需要使用 label 标签，并且通过为 input 设置id 属性，在 lable 标签中设置 for=someld 来让说明文本和相对应的 input 关联起来。

```html
<form>
  <fieldset>
    <legend>Choose your favorite monster</legend>

    <input type="radio" id="kraken" name="monster" value="K" />
    <label for="kraken">Kraken</label><br />

    <input type="radio" id="sasquatch" name="monster" value="S" />
    <label for="sasquatch">Sasquatch</label><br />

    <input type="radio" id="mothman" name="monster" value="M" />
    <label for="mothman">Mothman</label>
  </fieldset>
</form>
```

### 常用语义化标签

- `<h1> ~ <h6>` 标题标签 
- `<title>` 文档的标题 *一个 head 元素只能包含一个 title 元素*
- `<ul>` 无序列表
- `<ol>` 有序列表
- `<header>` 头部
- `<nav>` 导航
- `<main>` 页面主要内容 *只出现一次*
- `<section>` 区块 节点
- `<article>` 文章 内容独立于文档其余部分
- `<aside>` 侧边栏
- `<footer>` 底部
- `<small>` 小号字体 指定细则，输入免责声明、注解、署名、版权
- `<strong>` 强调 比 em 更强
- `<em>` 强调斜体
- `<mark>` 标记 黄色凸显

### 其他语义化标签

- `<hgroup>` 标题组合 *可在内部含 h1  不会与外部 h1 冲突*
- `<figure>` 图片组合
- `<figcaption>` 图片标题 在 figure 内部使用
- `<time>` 时间 文本内容必须是合法日期或时间格式
- `<progress>` 进度条 
- `<cite>` 某个参考文献的引用，比如书籍或者杂志的标题
- `<details>` 细节
- `<summary>` 摘要
- `<dialog>` 对话框
- `<address>` 地址 一般在footer里
- `<blockquote>` 块级引用 有它们自己的空间
- `<abbr>` 缩写
- `<dfn>` 定义术语元素 必须紧挨定义 可在描述列表 dl 元素中使用
- `<q>` 短的引述 *避免使用 有跨浏览器问题*
- `<del>` 移除的内容 
- `<ins>` 插入的内容
- `<code>` 行内代码元素
- `<meter>` 显示已知范围的标量值或者分数值 *效果像一个进度条*


## canvas 相关

### svg 与 canvas 区别

- canvas时h5提供的新的绘图方法 ；svg已经有了十多年的历史
- canvas画图基于像素点，是位图，如果进行放大或缩小会失真 ；svg基于图形，用html标签描绘形
状，放大缩小不会失真
- canvas需要在js中绘制 ；svg在html绘制
- canvas支持颜色比svg多 
- canvas无法对已经绘制的图像进行修改、操作 ；svg可以获取到标签进行操作


## H5 新特性

HTML5主要是关于图像，位置，存储，多任务等功能的增加。
- 拖拽释放(Drag and drop) API
- 语义化更好的内容标签（header,nav,footer,aside,article,section）
- 音频、视频API(audio,video)
- 画布(Canvas) API
- 地理(Geolocation) API
- 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
- sessionStorage 的数据在浏览器关闭后自动删除
- 表单控件，calendar、date、time、email、url、search

##  title 和 alt 

相同点：
- 都用于解释图片，当鼠标滑动到元素上显示

不同点：
- alt 是 img 特有属性，用来等价描述图片内容，图片无法显示时的代替文字
- title 属性可以用在除了base，basefont，head，html，meta，param，script和title之外的所有标签，是对dom元素的一种类似注释说明

##  HTML全局属性(global attribute)有哪些

- class :为元素设置类标识
- data-* : 为元素增加自定义属性
- draggable : 设置元素是否可拖拽
- id : 元素 id ，文档内唯一
- lang : 元素内容的的语言
- style : 行内 css 样式
- title : 元素相关的建议信息