---
theme: ./
layout: s-cover
meeting: 会议名称
presenters: 汇报人
instructors: 指导老师
defaults:
  header:
    name: SNav
  background:
    name: SDefault
  school:
    badge: school_badge.svg
    logo: school_logo.svg
---

# slidev theme cqupt主题展示
添加说明吧！

---
layout: s-toc
toc: 
    r: 14
---

# 自定义目录
添加说明吧！

---
section: 章节一
layout: s-sub-cover
---

# 这是章节副标题
添加说明吧！

---

# 这是默认布局

你可以在这里用 `markdown` 书写内容，例如：

<kbd>ctrl+s</kbd>、**加粗**、**English bold**、_斜体_、<u>下划线</u>、<span style="color: steelblue">html元素</span>、这是<sup>上标</sup> 、这是<sub>下标</sub> 、[这是链接](https://www.baidu.com)

`这是代码块`、$\text{这是 Katex}$

* 这是无序列表
2. 这是有序列表
> 这是 `blockquote`，当 `table`、`code div`、`blockquote` 直接相邻时，主题会自动增加他们间的间距

```js

console.log("this is code pre")
console.log("this is second line") // this is comment

```

| attr\col  | col1 | col2 | col3 |
|-----------|------|------|------|
| $\text{OA}$ | 0.5  | 0.6  | 0.7  |
| $\text{OA}$ | 0.5  | 0.6  | 0.7  |

---
layout: s-cols
---

# 这是多列布局

这是默认插槽, 当然可以选择只编写 `$slots.col_i`

::col_1::

## 这是左插槽

你可以在 `$slots.col_i` 插槽中使用 `<s-image>` 组件插入图片

你也可以在插槽中使用 `<s-align>` 来控制内容的位置

```jsx
<s-image src="img_path" 
         intro="intro_word" 
         align="align_value" />

<s-align direction="direct_value"
         align="align_value" />
```

::col_2::

<SAlign direction="vertical" align="start">

`slidev-theme-cqupt` 还提供了 `<s-card/>` 组建来丰富展示：

<s-card header="这是 header" type="warning">

使用插槽书写 `<s-card>` 吧！
```jsx
<slot name="title"/>
<slot name="default"/>
```
</s-card>

```jsx
<s-card header="title_name" type="type">
    <slot name="title" />
    <slot name="default" />
</s-card>
```
</SAlign>

::col_3::

<SImage src="test/week_9_ontology.jpg" intro="这是右插槽" align="center"/>

---
section: 章节二
layout: s-sub-cover
---

# 这是章节二

添加说明吧

---
layout: s–vertical
---

::side::

# 一些杂项
这是说明

这里也可以写 `markdown`

::col_1::

## 列数控制
你可以写两列或者三列

主题会自适应行数，来填满一面

## 设置背景

你可以通过设置 `frontMatter` 来给单独 slide 设置背景

例如本页的 `frontMatter` 配置如下：

```yaml
---

background:
    name: SGradient
layout: s-vertical
hidden: hidden
---
```

::col_3::

<SAlign direction="vertical" align="center">

## 第三列

</SAlign>

::col_2::

## 位置调节

当然你也可以使用 `<s-align/>` 组件来设置位置

## 未来开发

* 添加新组件
* 添加新布局
* 添加新 `s-icon`
* 添加新背景
* ...

## 未来文档

* 编写 `slidev-theme-cqupt` 文档

---
layout: s-end
---
# 了解更多

[Slidev文档](https://sli.dev) / [Slidev仓库](https://github.com/slidevjs/slidev)
