---
theme: ./
layout: s-cover
presenters: 罗之章
meeting: 空信智
defaults:
  header:
    name: SNav
  background:
    name: SDefault
  school:
    badge: school_badge.svg
    logo: school_logo.svg
---

# 基于遥感影像的地面覆盖分类

Land Cover Classification Based on Remote Sensing Image

---
layout: s-toc
toc: 
    r: 14
---

# 自定义目录
添加说明吧！

---
section: 建筑物识别
layout: s-sub-cover
---

# 基于 LCZ 数据集的城市建成区分类
`DRSNet` 小块低分辨率遥感影像场景分类体系结构

---
layout: s-cols
---

# 论文介绍

期刊名：$\text{International Journal of Applied Earth Observation and Geoinformation}$

::col_1::

期刊投递范围：地球观测数据应用，自然资源管理，环境检测与评估，地理信息系统（GIS）与地理空间分析，灾害管理与应急响应，遥感技术创新与方法，跨学科的地球观测研究。

影响因子：$text{7.6}$

期刊关键词：`geoinformation`、`earth observation data`、`natural resources`、`environment`

$\text{SCI}$ 分区：Q1

::col_2::

<s-image src='tmp/img-1.png' intro='期刊封面' align='center' />

---
layout: s-cols
---

# 研究背景及现状
对于土地利用和覆盖分类，深度学习（DL）由于其与传统方法相比的出色性能而引起了遥感（RS）社区的关注，而卷积神经网络（CNN）就是用于图像识别任务的最知名的DL方法，已经在RS领域的几篇公开论文中使用，具有最先进的结果。然而：

::col_1::

<s-align align="center" direction="vertical">
<s-card header="问题一" type="primary">
1、目前采用中等或低分辨率遥感数据（如Landsat 8）进行场景分类或图像分割任务的相关研究很少。
</s-card>

<s-card header="问题二" type="primary">
2、此外，现有的CNN结构用于RS图像识别的能力应该得到提高，比如：随机森林机器学习算法优于一些CNN方案、轻量CNN结构近年来的广泛研究、深度神经网络的计算复杂性和资源消耗持续增加。经典的CNN架构（诸如AlexNet和VGG）关于网络参数的总量是冗余的。
</s-card>
</s-align>

::col_2::

<s-image src='tmp/img-2.png' intro='高分二号图像' align='center' />

---
layout: s-cols
---

::col_1::
# 论文亮点

1、建立了一个新的Landsat 8数据集，用于遥感图像识别，这个数据集的特点是中/低空间分辨率和小尺寸大小。

2、提出了一种称为DRSNet的新型CNN架构用于RS图像场景分类，并在我们的数据集中实现了比现有CNN模型（2021）更高的分类精度。该网络在几个公共RS数据集上的性能也优于同类网络，表现出良好的泛化能力。

3、提供了一种有效的、具有成本效益的方法。模型在笔记本电脑上高效运行，并且在金钱上是有效的，因为它使用免费提供的，易于访问的Landsat 8图像。

::col_2::

# 实验数据

> 本次实验采用了Landsat 8数据集，覆盖了中国东莞市的整个地区，包含LCZ分类系统的17个子类中的13个，空间分辨率为30米/格网的遥感产品，总共有2432个和809个小块分别被标记用于模型训练和测试，然后扩充数据增加总数，每个样品旋转90°、180°和270°。然后，翻转所获得的四个样本。

> 另外，为了测试网络的泛化性。还使用了其他数据集包括EuroSAT（哨兵2号,10米/像素,64 × 64）、Brazilian Coffee Scenes(SPOT传感器,10米/像素,64 × 64)和UCMerced(航空图像,1英尺/像素,256 × 256)。


---
layout: s-cols
---

::col_1::

特征学习模块（RICA Ⅰ和RICA Ⅱ）：学习高级内在特征。

* 第一步，RICA Ⅰ块使用三个不同的卷积分支，RICA Ⅱ块使用两个卷积分支、1 × 7与7 × 1的大核用来涵盖额外的全局信息，然后进行级联，之后通过1 × 1卷积层，以增加模块的非线性并减少输出通道的数量。

* 第二步，首先使用全局池化来获得通道统计量，其次，执行两个具有通道缩减率 r 的 1 × 1 卷积层。

* 第三步，使用带有 sigmoid 函数的门控机制来获。得加权统计量，将原始特征图与统计量相乘获得逐通道加权特征图。最后与原始图像相加获得特征图。


::col_2::

<s-image src='tmp/img-3.png' intro='RICA Ⅰ(上)和RICA Ⅱ(下)网络结构图' align='center' />

---
layout: s-cols
---

::col_1::

<s-image src='tmp/img-4.png' intro='复现代码(一)' align='center' />

::col_2::

<s-image src='tmp/img-5.png' intro='复现代码(二)' align='center' />

---
layout: s-cols
---

# 结果分析

::col_1::

用于性能评估的指标包括交叉熵损失、总体准确性 (OA) 和 Kappa 系数。其中OA在暂时下降后迅速增加，然后达到稳定水平。在0.89左右小幅波动，最高值为0.9036。

八个类别的准确率超过或接近90%，DRSNet 在除 LCZ E (70.00%) 之外的所有自然类别中都表现得非常好

> DRSNet 在 Landsat 8、Brazilian Coffee Scenes 和 UCMerced 上取得了最佳分类结果，在 EuroSAT 上取得了第二高的 OA 和 Kappa 分类结果。
> 
> DRSNet的所有模块都遵循尽可能利用小内核和步幅的理念，并采用缩减模块而不是池化层进行下采样。 RICA 块提取全局和局部特征，并利用不同通道的潜力。上采样步骤在检索丢失的信息中发挥着关键作用，特征学习模块之间的密集快捷连接丰富了最终全局池化的信息。在低分辨率并且图像尺寸较小的数据集上表现良好。
> 
> 同时 DRSNet 还具有良好的泛化能力，在不同的数据集上表现出良好的精度，尽管是高分辨率、大尺寸 RS 图像。

::col_2::

<s-image src='tmp/img-6.png' intro='混淆矩阵' align='center' />

---
section: 鄱阳湖湿地分类
layout: s-sub-cover
---

# 基于 MODIS 数据集的湿地覆盖分类

中国第一大淡水湖（鄱阳湖）湿地变化及其与三峡大坝的联系

---

# 实验背景

* **研究主题**：探讨鄱阳湖湿地变化与三峡大坝之间的关系；

* **先前缺陷**：植被划分单一，没有做植被群落过渡变换的研究；关注时间尺度短；

* **解决缺陷**：植被群落与生态功能相关，研究群落变换很有用；给15年卫星数据建立 **基于物候学** 的决策树；

* **实验数据**：
    * MODIS 250-m and 500-m Level-3 8-Day表面反射率产品，MODIS重访周期短，即使分辨率不高也可用于分析植被群落。
    * 鄱阳湖七个水文站水位数据，未知部分采用 **纬度插值**；
    * 鄱阳矢量探测图，采用 **Kriging interpolation插值** 后进行重采样到250m；
    * 水深数据等于水位数据减去探测数据；
    * 实地勘测的植被群落数据，用于验证MODIS数据；

* **分类类型**：水体、滩涂和 5 个主要群落（CS、TP、SG、FAM 和 Zl）；

* **实验步骤**：

  1. 计算NDVI，做时间序列谐波分析（HANTS）减少噪音，平滑NDVI曲线；
  2. 根据NDVI曲线特征，总结区别群落的决策树步骤；采用的决策树分类的评价指标有：
    * 生产者与消费者精度：结果为75.0–92.9%
    * 平均准确率：结果为82.4%
    * Kappa系数：
  3. 结果为0.77根据分析总结分类结果：
    * 各种湿地面积变化曲线图 （Permanent Water、Mudflat、Vegetated area）
    * 各种湿地比例变化曲线图（Water、Mudflat、5 types of field）
    * 湿地群落变迁图
    * TGD蓄水前后植被生长期水位图

---
layout: s-cols
---

::col_1::

# 实验细节

峰值寻找算法：
> * [选取]：一阶导数法；
> * [弃用]：自动多尺度峰值查找算法，即 $\text{AMPD}$ ；该方法要求信号是周期性的，但部分数据并不满足该条件，故没有使用；

阈值优化：
> * <u>没有进行决策树阈值调整</u>；

::col_2::

<s-image src='tmp/img-7.png' intro='基于物候学的决策树' align='center' />


::col_3::

<s-image src='tmp/img-8.png' intro='论文中分类结果' align='center' />


---
layout: s-cols
---

::col_1::
<s-image src='tmp/img-9.png' intro='实现结果' align='center' />

---
layout: s-end
---

# 汇报完毕

谢谢大家！