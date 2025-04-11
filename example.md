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

# 自然语言处理课程汇报
Natural Language Processing Course Debriefing

---
layout: s-toc
---

# 目录

$\text{CONTENT}$

---
section: 论文介绍
layout: s-sub-cover
---

# 一、论文介绍

1st. Paper Introduction

---
layout: s-cols
---

## **1.1. 论文简介**

::col_1::

* **标题**：Pre-trained Language Model with Entity Information for Relation Classification
* **翻译**：用实体信息丰富预训练语言模型以进行关系分类
* **作者**：Shanchan Wu
* **日期**：2019

<s-card type="theme" header="论文来源">

* **Conference**：CIKM
* **CCF**：B
* **Arxiv**：[[1905.08284\] Enriching Pre-trained Language Model with Entity Information for Relation Classification](https://arxiv.org/abs/1905.08284)（2018）

</s-card>

> 这篇论文提出了一种通过将目标实体信息融入预训练BERT模型的方法，即 `R-BERT` ，显著提升了关系分类任务的性能，并在SemEval-2010任务8数据集上取得了当时的最好结果。



::col_2::

<s-image src="https://soppy-ie-1351762962.cos.ap-chongqing.myqcloud.com/slidev-cqupt/image-20250411142923957-1744352964052.png" intro="figure 1. 论文简介"/>

---
layout: s-vertical
---

::side::

## **1.2. 相关概念**

Related concepts



::col_1::



<s-align align="center" direction="vertical">



### **1.2.1. 关系分类** | `Relation classification`：

关系分类是提取实体之间语义关系的重要NLP任务。

> 给定一个文本序列（通常是一个句子）`s` 和一对名词 `e` 和 `e`，关系分类目标是识别 `e` 和 `e` 之间的关系；
>
> 例如：“The [kitchen]<sub>e1</sub> is the last renovated part of the [house]<sub>e1</sub>.”，这展示了名词 “kitchen” 和 “house” 之间的 “component-whole” 关系；

先前的关系分类最优模型通常是基于 `CNN` 或 `RNN` 。最近，预训练BERT模型在自然语言处理的分类或序列标注的任务上获得最好效果。



<br/>

### **1.2.2. 预训练BERT**：

预训练BERT是Devlin等基于 `Transformer` 提出的双向编码器，BERT预训练算法有：

* <span class="s-color-primary">**Masked Language Model**</span>
* <span class="s-color-primary">**Next Sentence Prediction**</span>；

</s-align>



::col_2::



<s-align align="center" direction="vertical">

### **1.2.3. 相关工作**：



| 方法名称                 | 作者              | 年份  | 关键贡献/特点                                                |
| ------------------------ | ----------------- | ----- | ------------------------------------------------------------ |
| MVRNN                    | Socher et al.     | 2012  | 使用递归神经网络（RNN）和句法树结构自底向上构建句子表示      |
| CNN+Softmax              | Zeng et al.       | 2014  | 结合词嵌入和位置特征，CNN输出与词汇特征结合进行预测          |
| FCM                      | Yu et al.         | 2014  | 通过依赖树和命名实体构建句子和子结构嵌入                     |
| CR-CNN                   | dos Santos et al. | 2015  | 基于卷积神经网络和成对排序损失函数进行关系分类               |
| Attention CNN            | Shen and Huang    | 2016  | CNN编码器结合目标实体的注意力机制                            |
| Att-Pooling-CNN          | Wang et al.       | 2016  | 两级注意力机制捕捉异构上下文中的模式                         |
| Entity Attention Bi-LSTM | Lee et al.        | 2019  | 端到端RNN模型，结合实体感知注意力和潜在实体类型              |
| 远程监督方法             | Mintz et al., 等  | 2009+ | 处理远程监督数据中的噪声标签（如Hoffmann、Lin、Ji等的研究），但本文专注于无噪声的常规关系分类 |



</s-align>



---
section: 模型介绍
layout: s-sub-cover
---

# 二、模型介绍

2nd. Model Introduction

---
layout: s-cols
---


## **2.1. 数据处理**

本文使用了BERR句首的特殊符号 `[CLS]` ，`[CLS]` 经过BERT处理后的词向量常被用于文本分类等下游任务。此外，在每个实体的两侧，本文也相应的插入特殊符号，第一个实体两侧的特殊符号是 `$` ，第二个实体两侧是 `#` 。文本处理完毕后的效果如下：

> * “The [kitchen]<sub>e1</sub> is the last renovated part of the [house]<sub>e1</sub>.”
> * [CLS] The \$ kitchen \$ is the last renovated part of the # house # .



::col_1::

<s-image src="https://soppy-ie-1351762962.cos.ap-chongqing.myqcloud.com/slidev-cqupt/image-20250411154334696-1744357414804.png" intro="figure 2. 模型结构"/>



---
layout: s-cols
---

## **2.2. 模型介绍**

模型由三个主要部分组成，一部分是BERT模型，用于提取文本的向量表示；模型的第二部分对从BERT获得的词向量进行处理；模型第三部分将第二部分处理结果拼接然后继续进行处理；

::col_1::



### **2.2.1. 全连接层：**

模型的第二部分对从BERT获得的词向量进行处理。对于实体向量，由于<span class="s-color-primary">**实体可能包含不止一个词**</span>，所以本文将实体包含的词向量进行加和平均来得到实体的向量表示。公式如下：

> 以模型图为例，`Entity 1`在未处理文本中的表示是 `Ti～Tj` ，经BERT后的词向量为 `Hi～Hj` ，将其<span class="s-color-primary">**加和平均**</span>后，再过一个 `dropout`（公式中没有标注，但在源码中使用），一个 `tanh` 激活以及一个全连接层得到实体表示

$$
\begin{align*}
H_{1}' &= W_{1} \left[ \tanh\left( \frac{1}{j - i + 1} \sum_{t=i}^{j} H_{t} \right) \right] + b_{1} \\
H_{2}' &= W_{2} \left[ \tanh\left( \frac{1}{m - k + 1} \sum_{t=k}^{m} H_{t} \right) \right] + b_{2}
\end{align*}
$$


::col_2::



<s-image src="https://soppy-ie-1351762962.cos.ap-chongqing.myqcloud.com/slidev-cqupt/image-20250411160309506-1744358589577.png" intro="figure 3. BERT词向量处理"/>



---
layout: s-cols
---

::col_2::



<s-align align="center" direction="vertical">

对于模型的句首的特殊标记 `[CLS]` ，模型也经过类似的处理，得到了 `[CLS]` 最终的向量表示：

$$ H_{0}' = W_{0} \left( \tanh(H_{0}) \right) + b_{0} $$

需要注意的是论文中将这上述三个全连接层进行了<span class="s-color-danger">**参数共享**</span>，即：$W_0 = W_1 = W_2$，$b_0 = b_1 = b_2$；

### **2.2.2. 分类：**

模型的第三部分将第二部分获得三个向量 $(H_{0}', H_{1}', H_{2}')$ 进行拼接并送入全连接层中，最后通过softmax进行分类。



</s-align>



::col_1::



<s-image src="https://soppy-ie-1351762962.cos.ap-chongqing.myqcloud.com/slidev-cqupt/image-20250411161833534-1744359513605.png" intro="figure 4. 全连接+softmax分类"/>


---
section: 实验介绍
layout: s-sub-cover
---

# 三、实验介绍

2nd. Experiment Introduction


---
layout: s-cols
---

::col_1::
## **3.1. 对比实验**

`R-BERT`模型在SemEval-2010 Task 8数据集上的对比实验如下：



| **Method**      | **F1** | **Author & Year**        |
| --------------- | ------ | ------------------------ |
| SVM             | 82.2   | Rink and Harabagiu, 2010 |
| RNN             | 77.6   | Socher et al., 2012      |
| MVRNN           | 82.4   | Socher et al., 2012      |
| CNN+Softmax     | 82.7   | Zeng et al., 2014        |
| FCM             | 83.0   | Yu et al., 2014          |
| CR-CNN          | 84.1   | Santos et al., 2015      |
| Attention CNN   | 85.9   | Shen and Huang, 2016     |
| Att-Pooling-CNN | 88.0   | Wang et al., 2016        |



::col_2::


| **Method**               | **F1**    | **Author & Year**    |
| ------------------------ | --------- | -------------------- |
| Entity Attention Bi-LSTM | 85.2      | Lee et al., 2019     |
| **R-BERT**               | **89.25** | Paper Implementation |


## **3.2. 消融实验**

本文设计了三个消融实验，分别是仅使用 `[CLS]` 而不使用实体的词向量（`BERT-NO-ENT`）、不加上特殊标记 `$` 和 `#` （`BERT-NO-SEP`）以及既不加特殊标记也不使用 `[CLS]`（`BERT-NO-SEP-NO-ENT`），消融实验结果如下：



| **Method**           | **F1**    |
| -------------------- | --------- |
| R-BERT-NO-SEP-NO-ENT | 81.09     |
| R-BERT-NO-SEP        | 87.98     |
| R-BERT-NO-ENT        | 87.99     |
| **R-BERT**           | **89.25** |



---
layout: s-end
---

# **汇报完毕**

**谢谢大家！**