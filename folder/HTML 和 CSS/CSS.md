### 1. `CSS`盒模型，在不同浏览器的差异

IE 盒子模型是 border-box(width = content + padding + border),
标准盒模型是 content-box

### 2. `CSS`所有选择器及其优先级、使用场景，哪些可以继承，如何运用@规则

    - 选择器

      - 通用选择器 \*
      - 标签选择器（元素选择器／类型选择器）
      - 类选择器
      - ID 选择器
      - 属性选择器-[att]（IE6-不支持）
      - 伪类、选择器、伪元素选择器
      - 子选择器（>）
      - 后代（包含）选择器（空格）
      - 相邻兄弟选择器（+）
      - 通用兄弟选择器（~）匹配 E 元素之后的所有同级元素 F（无论直接相邻与否）

    - 继承

      - 不可以继承的属性有：`display、margin、border、padding、background、height、width、min-height、max-height、min-width、max-width、overflow、position、left、right、top、bottom、z-index、float、clear、table-layout、vertical-align、page-break-after、page-break-before`
      - 所有元素可继承：`visibility、cursor`
      - 内联元素可继承：`letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-weight、font-style、font-variant、text-decoration、text-transform、direction`
      - 终端块状元素可继承：`text-indent、text-align`
      - 列表元素可继承：`list-style、list-style-type、list-style-position、list-style-image`
      - 表格元素可继承：`border-collapse`

    - 样式优先级：!important > 内联样式 > ID 选择器 > 类选择器、伪类选择器 > 标签选择器、伪元素选择器 > 通配符选择器

### 3. `CSS`伪类和伪元素有哪些，他们的区别和实际应用

    - 伪类
      :hover, :focus, :last-child,...

    - 伪元素
      ::before, ::after, ::first-letter, ::first-line, ::selection, ::placeHolder, ::backdrop

    - 区别
      伪类是元素已经在文档中，加上用于区分某种状态
      伪元素是原本不在文档结构中存在，写了之后会有新的元素加入的效果。

### 4. `HTML`文档流的排版规则，`CSS`几种定位的规则、定位参照物、对文档流的影响，如何选择最好的定位方式，雪碧图实现原理

    - `HTML`分两种元素

      - 行内元素
      - 块级元素

      他们在文档中从上到下，从左到右排列，其中块级元素独占一行。
      但是浮动 float 和定位 position 可以改变默认文档流。

    `CSS` 定位规则，

    - relative 相对定位
    - absolute 绝对定位， 参照物-离自己最近的非 static 的父元素，若没有则相对于浏览器窗口
    - fixed 固定定位，参照物-浏览器窗口

### 5. 水平垂直居中的解决方案，可以实现 6 种以上并对比它们的优缺点

    ```
    <div class=container><div class="box"></div></div>
    ```

    - 绝对定位 + margin: auto

    ```
    .container {
      width: 100px;
      height: 100px;
      position: relative;
    }
    .box {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 50px;
      height: 50px;
    }
    ```

    - 绝对定位 + transform

    ```
    .container {
      width: 100px;
      height: 100px;
      position: relative;
    }
    .box {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50px;
      height: 50px;
    transform: translate(-50%, -50%);
    }
    ```

    - flex

    ```
    .container {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .box {
      width: 50px;
      height: 50px;
    }
    ```

    - 文本垂直居中

    ```
    .container {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px; // 行高与父元素高度相同
    }
    ```

    - 表格布局

### 6. `BFC`实现原理，可以解决的问题，如何创建`BFC`

    > > 块格式化上下文（Block Formatting Context，BFC） 是 Web 页面的可视化 CSS 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。 -- 《MDN》

    如果一个元素具有 `BFC`，内部子元素再怎么翻江倒海、翻云覆雨，都不会影响外部的元素。所以，`BFC` 元素是不可能发生 `margin` 重叠的，因为 `margin` 重叠是会影响外面的元素的;`BFC` 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 `BFC`元素的子元素不会影响外部元素的设定。

    - 创建
      - 根元素或者包含根元素的元素
      - 浮动元素
      - 绝对定位元素
      - 行内块元素
      - 表格单元格
      - 表格标题
      - 匿名表格单元格元素
      - overflow 值不为 visible 的块元素
      - display 值不为 flow-root 的元素
      - contain 值为 layout、content 或 strict 的元素
      - 弹性元素
      - 网格元素
      - 多列容器
      - colum-span 为 all 的元素始终会创建一个新的 BFC，即使该匀速没有包裹在一个多列容器中。

### 7. 可使用`CSS`函数复用代码，实现特殊效果

```

```

### 8. `PostCSS`,`Sass`,`Less`的异同，以及配置，至少掌握一种

### 9. `CSS`模块化、如何配置按需加载、如何防止`CSS`阻塞渲染

### 10. 熟练使用`CSS`实现常见动画，如渐变、移动、旋转、缩放等等

    - 渐变动画：transition: background; filter: hue-rotate(0); linear-gradient;
    - 移动动画：相对定位时，translate;绝对定位时，top/left/right/bottom;
    - 旋转动画：rotate
    - 缩放动画：scale

### 11. `CSS`浏览器兼容性写法，了解不同`API`在不同浏览器下的兼容性情况

### 12. 掌握一套完整的响应式布局方案
