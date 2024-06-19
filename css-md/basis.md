# CSS 基础相关

## 元素水平、垂直居中

### 水平居中

 行内元素：

-  text-align: center;

块级元素：

- 确定宽度的：

    1. margin: 0 auto;
    2. 父元素position: relative,子元素绝对定位并设置 margin-left: -width/2

- 不确定宽度的：
    1. display:table，margin：0 auto
    2. display：inline-block，text-align:center
    3. display：flex，justify-content:center
    4. display：grid，justify-content:center
    5. 父元素 相对定位，子元素绝对定位，+transform，translateX可以移动本身元素的50%。


### 垂直居中

- 纯文本利用line-height 设置于元素高度一致实现居中
- 通过设置父容器相对定位，子级设置绝对定位，margin实现自适应居中
- 父级设置display: flex; 子级设置margin为auto实现自适应居中
- 父级设置相对定位，子级设置绝对定位，并且通过位移transform 实现
- table 布局，父级通过转换成表格形式，然后子级设置vertical-align 实现。（需要注意的是：vertical-align: middle使用的前提条件是内联元素以及display值为table-cell的元素）