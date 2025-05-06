---
theme: ./
layout: s-cover
presenters: 何钦、李佳怡、罗之章
meeting: 嵌入式系统设计
defaults:
  header:
    name: SNav
  background:
    name: SDefault
  school:
    badge: school_badge.svg
    logo: school_logo.svg
---

# 嵌入式系统设计课程汇报
*Embedded System Design Course Debriefing*

---
layout: s-toc
---

# 目录

$\text{CONTENT}$

---
section: 论文介绍
layout: s-sub-cover
---

# 论文介绍

1st. _Introduction to the paper_

---
layout: s-cols
---

## **1. 论文介绍**

::col_1::

* **论文**：面向信息新鲜度保障的车联网功率控制和资源分配策略

* **期刊**：电子与信息学报

<s-align align="start" direction="vertical">


> 这篇论文研究了面向信息新鲜度保障的车联网功率控制和资源分配策略，旨在优化车辆到车辆（**V2V**）链路的信息新鲜度和车辆到基站（**V2I**）链路的用户体验质量。

<s-card type="theme" header="研究背景">

* 随着5G、边缘计算和人工智能技术的进步，车联网（**Vehicle-to-Vehicle**、**Vehicle-to-Infrastructure**、**Vehicle-to-Pedestrian**）在提升驾驶安全、交通效率和用户体验方面发挥关键作用。
* 在车联网向自动驾驶等安全、协同控制类应用演进过程中，状态更新信息的时效性至关重要。信息新鲜度通过信息年龄（**AoI**）量化，**AoI**中断事件对车辆网络整体性能影响显著。

</s-card >

</s-align>

::col_2::

<s-image src="https://soppy-ie-1351762962.cos.ap-chongqing.myqcloud.com/slidev-cqupt/image-20250506115316589-1746503596712.png" intro="figure 1. 论文" align="center"/>

---
section: 系统模型
layout: s-sub-cover
---

# 系统模型

2nd. _System Model_


---
layout: s-cols
---

## **2. 系统模型：**

该论文的系统模型分为两个核心部分：**通信模型**和**状态更新模型**，分别对应车联网中`V2I`和`V2V`链路的差异化服务需求。

::col_1::



<s-image src="https://soppy-ie-1351762962.cos.ap-chongqing.myqcloud.com/slidev-cqupt/image-20250506122159557-1746505319700.png" intro="figure 2. 系统模型" align="center"/>



::col_2::



### **2.1. 通信模型**

论文设计了一个基于蜂窝通信的车联网场景：

* **用户类型**： M个直接与基站通信的`V2I`用户、N对通过`V2V`链路通信的`V2V`用户；
* **频谱分配**：总带宽$W_{tot}$被划分为$L$个正交子信道，每个子信道带宽为$\omega$，`V2I`用户独占不同子信道，`V2V`用户可复用`V2I`的子信道；

`V2V`用户在子信道上的发射功率增益由小尺度衰落增益、路径损失常数、对数正态阴影衰落、车辆对之间距离和路径衰减指数共同决定。第 $n$ 对`V2V`用户在第 $l$ 条子信道上的发射功率增益为：
$$
g_n^l, v  \triangleq  h_n^l, v A_v \beta_n, v (d_n, v)^{-\eta_v}
$$

---
layout: s-cols
---


::col_1::

`V2I`链路和`V2V`链路的信号干扰噪声比分别表示为与各用户发射功率、信道增益、噪声功率和资源分配情况相关的表达式，反映了链路质量受多种因素影响。

第 $m$ 条`V2I`链路和第 $n$ 条`V2V`链路的信号干扰噪声比分别表示为：
$$
\begin{align*}

\gamma ^l_m &= \frac{P^l_m g_{m,B}^l}{\sigma^2 + \sum_{n \in \mathcal{N}} \delta_n^l P^l_n g_{n,B}^l}, \\

\gamma ^l_n &= \frac{P^l_n g_{n,V}^l}{\sigma^2 + \sum_{m \in \mathcal{M}} \delta_m^l P^l_m g_{m,n}^l + \sum_{n' \in \mathcal{N} \setminus \{n\}} \delta_{n'}^l P^l_{n'} g_{n',n}^l}

\end{align*}
$$
用户`QoE`主要用于刻画用户的主观感受从而评估网络的质量。由于车联网场景中的信息和娱乐类应用主要集中在视频流、内容下载或其他网络服务等方面，该场景中用户体验主要与网络带宽有关。

因此，本文应用一种基于**MOS**的`QoE`模型衡量`V2I`用户所接受服务的体验质量，表示为：
$$
\begin{align*}

\text{QoE} _m= \frac{1}{\text{b}_1 + \text{b}_2 \text{e}^{-\text{b}_3 \omega C_m}}

\end{align*}
$$


::col_2::

### **2.2. 状态更新模型**

为保障安全和协同类应用的信息新鲜度需求， `V2V`车辆之间需要进行周期性状态报告。

**V2V链路状态更新过程**：

1. 状态信息通常由连续的信标组成，论文假设第 $n$ 条`V2V`链路的信标按照固定间隔$D_n$生成信标，信标大小固定为 $\varepsilon$ ；

2. 状态更新模型可建模为**D/G/1**的排队系统，队列更新过程满足：
    $$
    \begin{align*}
    
    B_n(t+1)=\max(B_n(t)-R_n(t),0)+\frac{1}{D_n}
    
    \end{align*}
    $$

    > 其中，为`V2V`链路的信标传输速率，可以刻画为时隙通过`V2V`链路传输的信标个数；

3. 当`V2V`链路传输信标消息的过程中，`AoI`被定义为最新接收到信标从生成开始到目前时刻所经过的时间，引入`AoI`能够有效刻画`V2V`车辆之间状态更新过程的新鲜程度。

4. 为保障每条`V2V`链路传输信标的信息新鲜度，需要将`AoI`中断概率控制在一定范围内。


---
section: 问题分析
layout: s-sub-cover
---

# 问题分析

3rd. _Question Analysis_


---
layout: s-cols
---

::col_1::

## **3. 问题表述与转化**

**[原问题]** 在车联网场景中，最大化车辆到基站（**V2I**）用户的长期平均体验质量（**QoE**），同时保障车辆到车辆（**V2V**）链路的状态更新信息新鲜度。

<s-card type="theme" header="条件约束">

具体约束包括：

* `C1` 保证V2V链路可以可靠地传输信标
* `C2` 保障每条V2V链路传输信标的信息新鲜度
* `C3` 控制了V2V链路信标到达率小于服务率，保证V2V状态更新队列的稳定性
* `C4、C5` 共同约束了每个子信道的频谱资源最多可被分配给一条V2I链路
* `C4、C6、C4、C7` 约束V2I用户或V2V用户对最多占用1条子信道
* `C8、C9` 为V2I和V2V用户的发射功率限制

</s-card>

::col_2::

<s-image src="https://soppy-ie-1351762962.cos.ap-chongqing.myqcloud.com/slidev-cqupt/image-20250506184012998-1746528013114.png" intro="figure 3. 原问题公式" align="center"/>



---
layout: s-cols
---


::col_1::

**[转化问题]** 在车联网场景中，最大化车辆到基站（**V2I**）用户的长期平均体验质量（**QoE**），同时保障车辆到车辆（**V2V**）链路的状态更新信息新鲜度。具体约束包括：

* **V2V链路可靠性**：信号干扰噪声比（**SINR**）需满足最低阈值。
* **信息新鲜度**：`V2V`链路的`AoI`（信息年龄）超过阈值的概率需低于设定值。
* **资源分配限制**：子信道分配、发射功率范围等物理层约束。

通过**AoI约束的等价转换**、**引入极值理论（EVT）**、**李雅普诺夫优化分解**将原问题转化为一个可实时求解的优化问题。

> **李雅普诺夫**优化方法作为一种最优控制策略，其核心思想是将长期平均优化问题转化为每个确定时隙的优化问题，进一步通过维持队列积压稳定性，实现目标函数最优化。李雅普诺夫优化不需要获知系统状态的先验信息，也不需要对系统状态和可行动作集进行量化，因此适用于本研究仅考虑当前大尺度信道状态信息的车联网场景。

::col_2::

<s-image src="https://soppy-ie-1351762962.cos.ap-chongqing.myqcloud.com/slidev-cqupt/image-20250506184205974-1746528126066.png" intro="figure 4. 等价问题公式" align="center"/>


---
section: 算法与实验
layout: s-sub-cover
---

# 算法与实验

4th. _Algorithms and Experiments _


---
layout: s-vertical
---

::side::

# **4.1. 算法分析**
**4.1. algorithm analysis**



::col_1::

### **功率控制策略**

为了提高所有`V2I`用户的平均`QoE`，同时保证任意`V2V`发送和接受车辆之间所传输状态信息的新鲜度，需要合理地控制`V2I`和`V2V`用户的发射功率。

车辆数量不断增多使得车辆之间将产生更复杂干扰，为了便于对车联网进行统一的频谱资源管理，有必要对车辆进行分簇。

本研究采用文献提出的基于信道增益差异划分的车辆分簇方法对将`V2V`用户划分为不同的簇集：


$$
\begin{align*}

s_\Theta (t) =& \frac{\tau \omega}{\beta_n} \left[ J_n(t) - U_n(t) - 2{(B_n(t) + \psi)}^3 \right. \\\\
&\left. - (2 H_n(t) + 1)(B_n(t) + \psi) \right] \mathbb{I}_{B_n} \\\\
&- (Q_n(t) + \lambda_n(t) + B_n(t) + J(t) p_n )

\end{align*}
$$


在此基础上，由于优化问题形式与文献类似，故采用其的最优功率解法，可得第m个V2I用户发射功率最优解为：



::col_2::

$$
\begin{align*}

P_m^{l*}(t)&=\min\left(P_{\max}^{\text{I}}, f\left(P_{\max}^{\text{V}}\right)\right) \\\\

&=\min\left(P_{\max}^{\text{I}}, \right. \\\\

&\left. \frac{P_{\max}^{\text{V}}\left(g_n^l(t)-\sum_{n'\in C_k\setminus\{n\}} g_{n',n}^l(t)\right)-\gamma_0^d \sigma^2}{\gamma_0^d g_{m,n}^l(t)}\right)

\end{align*}
$$




由于**P3**问题呢为一个凸问题，可采用拉格朗日乘子法并利用KKT条件进行求解

通过不断地渐进式增加的以及不断地按照式(7)和$\Theta(t)$各个分量的队列更新公式更新队列状态，可以最终得到最优解。




---
layout: s-cols
---



## **4.2. 数值分析**



::col_1::

#### **仿真环境与参数**

* **场景设置**：基于**3GPP TR36.885**标准，模拟蜂窝车联网场景，覆盖半径500米，车辆随机分布，`V2V`收发距离15米。
* **信道模型**：采用 `WINNER II` 模型，包含路径损耗、阴影衰落和小尺度衰落。
* **关键参数**：V2I/V2V最大发射功率设置为23 dBm；时隙长度设置为3 ms；AoI中断阈值设置为：60 ms（容忍概率≤0.1%）；模拟不同车辆速度（速度范围为40–100 km/h）；

#### **对比基准算法**

* **CROWN/CROWN-F**：基于分簇的资源分配算法，正交分配信道，依赖基站全局信息。
* **基准超图算法**：传统三维匹配方法，无智能优化。
* **贪婪算法**：优先分配信道给瞬时信道质量最佳的用户。



::col_2::

<s-image src="https://soppy-ie-1351762962.cos.ap-chongqing.myqcloud.com/slidev-cqupt/%E5%9B%BE%E7%89%871-1746527819461.png" intro="figure 5. 实验结果" align="center"/>




---
layout: s-end
---

# **汇报完毕**

**谢谢大家！**