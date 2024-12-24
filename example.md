---
theme: ./
layout: s-cover
presenters: 张世家、罗之章
meeting: 遥感图像处理
defaults:
  header:
    name: SNav
  background:
    name: SDefault
  school:
    badge: school_badge.svg
    logo: school_logo.svg
---

# 基于物候学决策树的湿地植被分类
_Wetland vegetation classification based on climatological decision trees_

---
layout: s-toc
---

# 目录

$\text{CONTENT}$

---
section: 期刊与论文介绍
layout: s-sub-cover
---

# 期刊与论文
_Journals and Papers_

---
layout: s-cols
---

::col_1::

## 期刊介绍

<span class="s-color-theme">《环境遥感 RSE》</span> 为地球观测界服务，发布有关研究的理论、科学、应用和技术的结果，有助于推进遥感科学的发展。<span class="s-color-theme">《环境遥感》</span>是完全跨学科的，发表关于陆地、海洋和大气传感的文章。该杂志的重点是从局部到全球范围的遥感的生物物理和定量方法，涵盖了广泛的应用和技术：

感兴趣的领域有：
* 土地覆盖制图、植被物种识别和制图
* 农业（作物测绘、产量预测、物候、土壤特性、管理实践）
* 城市应用（测图、能源消耗、人口等）
* 干扰（火灾、昆虫、收成）


<s-card type="theme" header="Remote sensing of environment">

* **SCI**：$Q1$
* **CiteScore**：$25.1$
* **Impact Factor**：$11.1$

</s-card>

::col_2::

<s-image src="./tmp/i1.jpg" intro="期刊封面"/>

---
layout: s-cols
---

::col_1::

<s-image src="./tmp/i2.png" intro="三峡大坝与鄱阳湖位置，南矶山与鄱阳湖国家自然保护区范围"/>

::col_2::

## 论文介绍

<span class="s-color-theme">《中国第一大淡水湖湿地变化及其与三峡大坝的联系》</span>

* **研究主题**：研究鄱阳湖 $\text{2000-2014}$ 年的湿地植被变化与三峡大坝修建导致的水文状况转变之间的关系
* **先前缺陷**：植被划分单一，没有做植被群落过渡变换的研究；关注时间尺度短；
* **研究区域**：
  
  > 鄱阳湖位于江西省北部（北纬 28°22′–29°45′ 和东经 11°47′–116°45′），是中国最大的淡水湖。
  >
  > 雨季（4-9月）的淹没面积可达到大于$3000\text{km}^2$，旱季（10月至次年3月）减少到小于$1000\text{km}^2$。
  > 
  > 每年 4 月至 6 月，由于湖流域的强降水，鄱阳湖的水位可能会显着上升。在夏季，当长江水位高于湖泊水位时，可能会出现河湖逆流，导致最大洪水泛滥。从每年的 10 月到次年 3 月，湖水位在很大程度上取决于鄱阳湖和长江之间的水位差。

---
layout: s-cols
---

::col_1::

## 研究对象

MODIS
遥感数据可能识别的鄱阳湖湿地覆盖类型包括水体、泥滩、和<span class="s-color-theme">五种主要的湿地植被群落</span>：

* 苔草群落（缩写为Cs）主要由：

  > *灰化苔草* | `Carex cinerascens` 、 
  >
  > *阿及苔草* | `Carex argi` 、
  >
  > *单性苔草* | `C.unisexualis` 这三种苔草组成；
  
* 芦苇-南荻（缩写为TP）；

    > 该群落分布于鄱阳湖**高程最高**的地带，主要呈现带状分布于蚌湖南侧、东南侧以及南矶山。该群落由三层构成：
    >
    > * 最上层为南荻芦苇高度可达$\text{1.5-3.0}$米；
    > * 第二层为苔草同时也有一些伴生物种，例如：艾草、牛鞭草等；
    > * 最下层为菊叶委陵菜构成；

* 虉草-蓼子草群落（缩写为SG）；

* 浮叶植物群落（缩写为FAM）；

* 菰群群落（写为Zl）；



::col_2::

## 实验数据

### 一、湿地植被分类研究：

  * $\text{MODIS 250-m and 500-m Level-3 8-Day}$ 表面反射率产品；

    > MODIS重访周期短，即使分辨率不高也可用于分析植被群落。
    >
    >
    > 使用 <span class="s-color-theme">时间序列谐波分析 $\text{HANTS}$ 算法</span> 减少噪音，平滑 $\text{NDVI}$ 曲线；

  * 实地勘测的植被群落数据，用于验证 $\text{MODIS}$ 数据；

### 二、鄱阳湖水位变化研究：

  * 鄱阳湖七个水文站水位数据，未知部分采用  <span class="s-color-theme">纬度插值</span>；
  * 鄱阳矢量探测图，采用 <span class="s-color-theme">$\text{Kriging}$ 插值</span> 后进行重采样到 $\text{250m}$；
  * 水深数据等于水位数据减去探测数据；



---
layout: s-vertical
---

::side::

# 构建基于物候学的决策树
*Building a phenology-based decision tree*

::col_1::

## 光谱分析

鄱阳湖湿地不同植被类型在某些光谱范围具有<u>独特的反射特征</u>，但是由于不同植被之间光谱形状在<u>可见光</u>和<u>近红外波段</u>存在<span class="s-color-theme">较大相似性</span>。

难以从单一的光谱信息中对各种不同群落进行精确分类。

## 时序谱分析

选取7种地表覆盖类型对应的 $\text{MODIS NDVI}$ 时序谱进行对比分析。

* 长年<span class="s-color-theme">水体</span>覆盖区域的时序谱均显示为负值，

* <span class="s-color-theme">泥滩</span>的时序谱在全年中大部分时间为负值。

* 尽管泥滩与<span class="s-color-theme">虉草-蓼子草群落</span>的时序谱十分相似，但是虉草-蓼子草群落在冬季高于泥滩。

* <span class="s-color-theme">浮叶植物群落</span>丰水期为正值，枯水期为负值。

* 作为一种典型的挺水植被，<span class="s-color-theme">菰</span>的均高出其他类型植被的，特别是在180天之后。

* <span class="s-color-theme">苔草群落</span>与<span class="s-color-theme">芦苇-南荻群落</span>具有相似的物候，因此很难从遥感影像上区分。

    > 我们可以通过两者**地势差异**与**生长际**来区分两种群落



::col_3::

<s-image src="./tmp/i3.png" intro="湿地植被光谱与时序谱" align="center"/>



---
layout: s-cols
---

::col_1::

## 决策树概括：

* 如果46个8天NDVI复合值持续为负，则该像素在该年被归类为水域；
* 如果NDVI值是正的，并且4月至9月（雨季）的平均NDVI大于0.7，则被归类为Zl；
* 如果NDVI值在4月至9月之间出现峰值，则该像素被视为FAM；
* 数据在4月之前NDVI单调递减，4月至9月之间NDVI为负值被选中。从这些数据中，如果一年的最大NDVI大于0.21，则像素被分类为SG；否则，像素被分类为滩涂。0.21的阈值确定如下：从分类的Landsat图像中划定了滩涂区域，其中计算了同一 Landsat 年份的相应MODIS NDVI平均值。平均NDVI加 2 倍标准差（即 0.21）被用作分类滩涂的阈值；
* 如果像素不属于上述4个类别，则检查NDVI时间形状以确定是否可以找到两个局部峰值：
    * 如果找不到两个局部峰值，则该像素被视为未知；
    * 如果有两个局部峰值，则与建立的基于直方图的分类进行比较；


::col_2::

<s-image src="./tmp/i4.png" intro="基于物候学的决策树，应用于MODIS像素" align="center"></s-image>

---
layout: s-cols
---

# 论文结果

论文的 **结果** | `Result` 部分主要分析了各种湿地植被在 $\text{2000-2014}$ 年间的分布与变化；而三峡大坝修建引起的水深变化对湿地植被群落分布的影响，作者则在 **讨论** | `Discussion` 中提及。以下是部分湿地植被分布的可视化图像：

::col_1::

<s-image src="./tmp/i5.png" intro="湿地植被年际变化可视化图" align="center"/>

::col_2::

<s-image src="./tmp/i6.png" intro="鄱阳湖水深图" align="center"/>


---
layout: s-sub-cover
section: 实验复现
---

# 实验复现
*Experimental Reproduction*



---
layout: s-cols
---

::col_1::
## 时间序列谐波分析滤波算法：
* **时间序列谐波分析** | `HANTS` ，它结合了平滑和滤波技术, 进行影像重构时充分考虑植被生长周期性和数据本身的双重特点，能够用代表不同生长周期的植被频率曲线重新构建时序$\text{NDVI}$影像，真实反映植被的周期性变化规律
* 核心算法是傅里叶变换和最小二乘法拟合, 即把时间波谱数据分解成许多不同相位、频率和幅度的正弦曲线和余弦曲线，从中选取若干个能够反映时间序列特征的曲线进行叠加，以达到时间序列数据的重建目的

$$
y(t) = a_0 + \sum_{k=1}^{K} \left[ a_k \cos\left(\frac{2\pi k t}{T}\right) + b_k \sin\left(\frac{2\pi k t}{T}\right) \right]
$$

> * $y(t)$：时序数据在时间t的值
> * $a_k$：第$k$阶谐波的余弦项系数
> * $b_k$：第$k$阶谐波的正弦项系数
> * $K$：使用的谐波分量数量
> * $T$：时间序列的总长度（周期）



::col_2::

<s-image src="./tmp/i7.png" intro="选取的某个点在一年内的NDVI时序变化及滤波图" align="center"/>



---
layout: s-cols
---

::col_1::
<s-image src="./tmp/i8.png" intro="2006年鄱阳湖湿地覆盖分类结果图" align="center"/>

::col_2::
<s-image src="./tmp/i9.png" intro="2000-2014年鄱阳湖湿地覆盖分类图" align="center"/>

---
layout: s-end
---

# 汇报完毕

谢谢大家！