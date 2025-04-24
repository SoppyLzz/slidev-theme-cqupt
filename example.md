---
theme: ./
layout: s-cover
presenters: 罗之章
meeting: 自然语言处理
defaults:
  header:
    name: SNav
  background:
    name: SDefault
  school:
    badge: school_badge.svg
    logo: school_logo.svg
---

# 不确定性人工智能课程汇报
Uncertainty Artificial Intelligence Course Debriefing

---
layout: s-toc
---

# 目录

$\text{CONTENT}$

---
section: 材料与方法
layout: s-sub-cover
---

# 一、材料与方法

1st. Material and Methods

---
layout: s-cols
---

## **1.1. 实验区域**

鄱阳湖（28°24′~29°46′N，115°49′~116°46′E）作为中国第一大淡水湖泊，其水文过程呈现典型的季节性波动特征。



::col_1::



<s-align align="start" direction="vertical">

<s-card type="theme" header="研究背景">

* 湿地是生态系统的重要组成部分，在水文调节、生物多样性保护和碳汇功能方面发挥着至关重要的作用。

* 湿地是开放复杂的生态综合体，其土地覆盖类型对生态平衡和功能具有重要影响。
* 湿地植被分类是湿地生态系统研究、监测和管理的基础工作，直接影响湿地生态系统的保护和恢复。

</s-card >

该湖通过吸纳赣江、饶河、抚河、信江、修水等五河来水，形成独特的"高水成湖、低水似河"地貌景观，年内水位变幅可达9-15米，直接导致水域面积从丰水期＞3000 km²骤减至枯水期146 km²。

流域内建立的鄱阳湖国家级自然保护区及南矶山湿地国家级自然保护区，保存有完整的洲滩生态系统，其中湿地植被以芦苇（Phragmites australis）、菰（Zizania latifolia）和苔草（Carex spp.）为优势种，通过水质净化、生物栖息地维持及碳汇功能维系区域生态安全。

</s-align>



::col_2::

<s-image src="https://soppy-ie-1351762962.cos.ap-chongqing.myqcloud.com/slidev-cqupt/poyang-1745456093724.png" intro="figure 1. 研究区域"/>

---
layout: s-cols
---

## **1.2. 实验数据：**



::col_1::



本研究分别于2024年4月和12月对鄱阳湖典型湿地生态系统开展了两期实地调查采样工作。基于现场观测与目视解译相结合的方法，系统采集了水体、泥潭、沙地等无机质基质样本，以及蓼子草、苔草、芦苇、南荻、虉草等优势植被类型的生物样本。这种多层次、多时相的样本采集体系，为后续湿地生态系统遥感解译与景观动态分析奠定了可靠的数据基础。

| **类别**     | 水体 | 泥潭 | 蓼子草 | 苔草 | 芦苇 | 南荻 | 沙地 | 虉草 |
| ------------ | ---- | ---- | ------ | ---- | ---- | ---- | ---- | ---- |
| **样本数量** | 1048 | 1098 | 454    | 4370 | 2308 | 834  | 556  | 256  |
| **参考点**   | 3    | 3    | 3      | 3    | 3    | 3    | 3    | 3    |

本研究以Sentinel-2多光谱成像仪（MSI）Level-2A级地表反射率产品为主要数据源，选取2024年1-12月覆盖鄱阳湖全域的卫星影像，通过欧空局Copernicus数据平台获取原始数据。在数据预处理阶段，采用云掩膜技术筛选云量低于30\%的合格影像，有效剔除大气透射异常及云层遮蔽的干扰。

::col_2::



<s-image src="https://soppy-ie-1351762962.cos.ap-chongqing.myqcloud.com/slidev-cqupt/%E5%9B%BE%E7%89%871-1745456870094.png" intro="figure 2. 实地采集样本"/>

---
layout: s-vertical
---

::side::

## **1.3. 变精度粗糙集**

Variable Precision Rough Set



::col_1::



<s-align align="center" direction="vertical">



### **1.3.1. 经典粗糙集理论**：

Pawlak于1982年首次提出了粗糙集理论(Rough Set Theory, RST)。该理论是集合论的扩展，主要用于研究那些以不准确、不确定或模糊信息为特征的智能系统。通过利用RST中的下近似和上近似概念，可以揭示系统中隐藏的知识，并将其以决策规则的形式呈现出来。

粗糙集的知识表示可以通过一个四元组信息系统S来定义：

$$
S=\left\langle U,R,V,f \right\rangle,\quad R=C\cup D
$$

### **1.3.2. 变精度粗糙集**：

粗糙集理论常用于数据分类，但传统模型对噪声数据较为敏感。为了更好地处理噪声数据和不确定信息，Ziarko在1993年提出了可变精度粗糙集模型(Variable Precision Rough Sets, VPRS)。VPRS是经典粗糙集理论的扩展，允许用户设定一个精度参数$\beta$，从而更灵活地调整近似集的精度。该模型在处理噪声数据和不完全数据时表现出色。

</s-align>



::col_2::



<s-align align="center" direction="vertical">

在可变精度粗糙集中，信息系统仍然定义为四元组$S=\left\langle U,R,V,f \right\rangle,\quad R=C\cup D$。在此模型中，根据数据噪声的程度，定义了$\beta$的概率阈值。而这个概率阈值的取值范围是区间$[0,0.5)$。可变精度粗糙集的$\beta$-正域、$\beta$-负域与$\beta$-边界域定义如下：
$$
\begin{align*}
  &POS_{\beta}(X) = \{ x\in U \mid \text{Pr}(X\mid [x]) \geq 1 - \beta \}\\
  &BND_{\beta}(X) = \{ x\in U \mid \text{Pr}(X\mid [x]) \leq \beta \}\\
  &\begin{aligned}
    NEG_{\beta}(X) = \{ &x\in U \mid \\
    &\beta \leq  \text{Pr}(X\mid [x])\leq 1 - \beta \}
  \end{aligned}
\end{align*}
$$


等价类$[x]$与目标集合$X$之间的相关程度定义如下：


$$
\begin{equation*}
  K_{\beta}\left(\left[x\right], X\right) = \cfrac{\left|POS_{\beta}(X) \cup NEG_{\beta}(X)\right|}{\left|U\right|}
\end{equation*}
$$


$K_{\beta}\left(\left[x\right], X\right)$表示论域$U$上样本粗略或明确地分为$\beta$-正域和$\beta$-负域的比例。



</s-align>


---
layout: s-cols
---

## **1.4. DTW：**

::col_1::

动态时间规整（Dynamic Time Warping, DTW）是一种用于对齐时间序列的非线性相似性度量方法，尤其适用于处理因季节波动或观测间隔差异导致的序列局部形变问题。设两个时间序列 $X = (x_1, x_2, ..., x_m)$ 与 $Y = (y_1, y_2, ..., y_n)$，DTW通过构建累积距离矩阵$D(i,j)$寻找最优规整路径$\phi = \{\phi_k = (i_k, j_k)\}$，其目标是最小化路径上的总累积距离：

$$
D(i,j) = d(x_i, y_j) + \min \begin{cases}
D(i-1,j) \\
D(i,j-1) \\
D(i-1,j-1)
\end{cases}
$$
> 其中$d(x_i, y_j) = |x_i - y_j|$为局部距离函数，路径需满足边界性、单调性与连续性约束。

::col_2::

<s-image src="https://soppy-ie-1351762962.cos.ap-chongqing.myqcloud.com/slidev-cqupt/v2-8dc69701d5fe04ed81a470635c219509_r-1745457795431.png" intro="figure 3. DTW算法实例"/>

---
layout: s-cols
---

## **1.5. 实验设计：**



本研究的特征提取方法融合了多时相物候特征与多光谱特征，构建了面向湿地植被分类的多维度特征集。首先对2024年全年的Sentinel-2 NDVI时间序列进行数据重构：通过三次样条插值填补因云污染导致的时序空缺，再采用Savitzky-Golay(SG)滤波消除随机噪声。本研究通过融合多光谱特征与物候特征实现高精度地物分类。特征提取板块包含以下两个组成部分：

::col_1::

### **1.5.1. 光谱特征提取：**

采用11月份Sentinel-2卫星的13个多光谱波段数据（490-2190nm）构建光谱特征空间，该时段数据可有效反映研究区植被成熟期的稳定光谱特性。



### **1.5.2. 物候特征提取：**

基于全年NDVI时间序列构建动态物候特征。首先对原始NDVI影像进行时序重构：



1. **缺失值插值**：对云污染导致的缺失数据，采用线性插值法进行修复：
    $$
    \begin{equation*}
    
    \hat{y}(t) = y(t_{\text{prev}}) + \frac{y(t_{\text{next}}) - y(t_{\text{prev}})}{t_{\text{next}} - t_{\text{prev}}}(t - t_{\text{prev}})
    
    \end{equation*}
    $$
    

::col_2::



2. **时序平滑**：采用Savitzky-Golay滤波器进行噪声抑制，通过局部二次多项式拟合实现保形平滑：
    $$
    \begin{equation*}
    
    y_{sg}(t) = \sum_{i=-k}^{k} a_i y(t+i)
    
    \end{equation*}
    $$
    

为表征典型地物物候差异，针对8种目标类别分别建立参考模式，

1）每类人工选取3个具有物候典型性的样本点（如作物关键生长期）；2）计算样本点NDVI序列的欧氏距离质心，生成参考物候模式；3）通过动态时间规整算法计算待分类像元NDVI序列$X = \{x_1,...,x_T\}$与各参考模式的时序匹配距离；4）取规整路径的累积距离$D_{T,T}$作为物候差异度量，最终生成8维物候特征向量。



---
section: 结果与讨论
layout: s-sub-cover
---

# 二、结果与讨论

2nd. Result and Discuss

---
layout: s-cols
---

## **2.1. 实验结果**

基于变精度粗糙集特征约简与多特征融合策略的湿地植被分类模型在测试集上展现出显著性能优势。整体分类精度（Overall accuracy, OA）达到84.4%，Kappa系数为0.882。分类结果混淆矩阵详见图4。本研究使用变精度粗糙集对提取出来的特征一共得出了267条规则，前三十条支持度最高的规则如图5所示。

::col_1::

<s-image src="https://soppy-ie-1351762962.cos.ap-chongqing.myqcloud.com/slidev-cqupt/image-20250424093918776-1745458758900.png" intro="figure 4. 分类混淆矩阵"/>

::col_2::

<s-image src="https://soppy-ie-1351762962.cos.ap-chongqing.myqcloud.com/slidev-cqupt/image-20250424094027484-1745458827612.png" intro="figure 5. 模型结构"/>



---
layout: s-end
---

# **汇报完毕**

**谢谢大家！**