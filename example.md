---
theme: ./
layout: s-cover
presenters: 罗之章
meeting: 组会
instructors: 梁栋
defaults:
  header:
    name: SNav
  background:
    name: SDefault
  school:
    badge: school_badge.svg
    logo: school_logo.svg
---

# 时空融合方法调研与实验计划
_Winter Break Learning Report for the 2024-2025 School Year_

---
layout: s-toc
---

# 目录

$\text{CONTENT}$

---
section: STARFM
layout: s-sub-cover
---

# Landsat和MODIS表面反射率的融合：预测Landsat每日地表反射率

On the Blending of the Landsat and MODIS Surface Reflectance: Predicting Daily Landsat Surface Reflectance

---
layout: s-cols
---

## 论文简介



::col_1::

Landsat和MODIS表面反射率的融合：预测Landsat每日地表反射率

> 这篇论文提出了一种时空自适应反射率融合模型（STARFM），旨在结合Landsat的高空间分辨率（30米）和MODIS的高时间分辨率（每日观测），生成兼具高时空分辨率的“每日”地表反射率产品。

* **作者**：$\text{Gao Feng}$
* **日期**：$2006$



<s-card type="theme" header="论文来源">

* **h-index**：$216$
* **CiteScore**：$11.5$​
* **CAS**：地球科学1区Top
* **Journal**：IEEE TRANSACTIONS ON GEOSCIENCE AND REMOTE SENSING

</s-card>



::col_2::

<s-image src="./fusion/STARFM_cover.png" intro="论文"/>



---



## 时空自适应反射率融合模型(STARFM)：

传统数据融合方法，如HSV变换，PCA，小波变换不适用于此类问题，作者希望捕获由物候学引起的辐射(地表反射率)的定量变化；



* <span class="s-color-primary">**\[假设]**</span>：MODIS粗像素的值等于对应区域Landsat所有像素的值加权平均；
    $$
    \begin{align*}
    
    C_t &= \Sigma_i(F_{it}\times A_{it})
    
    \end{align*}
    $$

* 重采样MODIS数据到Landsat的空间分辨率，记作$M(x_i, y_j, t_k)$；
    $$
    \begin{align*}
    
    L(x_i, y_i, t_k) &= M(x_i, y_j, t_k) + \varepsilon_k \\\\
    
    L_{ijk} &= M_{ijk} + \varepsilon_k
    
    \end{align*}
    $$

* <span class="s-color-primary">**\[假设]**</span>: 在像元$(x_i, y_j)$处$t_0$与$t_k$时刻MODIS与Landsat间系统误差不变；

    > 1. MODIS往往不是一个同质像元，在Landsat的分辨率下可能混有不同类型的地表覆盖类型；
    > 2. 预测时间段内，地表覆盖类型会变；
    > 3.  的物候状态与太阳几何双向反射分布函数(BRDF)会影像反射率；
    >
    > 因此在预测Landsat-like像素时，需要考虑邻近像素以减少上述影响；



---



* **Core**：

    STARFM使用窗口$(w\times w)$滑动，使用$n$对fine & coarse输入，实现对$t_0$时刻考虑**邻近相似像素**的时空融合；

    为了方便，有如下符号映射：$L(x_t, y_t, t_k) = L_{ijk}$、$L(x_{w/2},y_{w/2},t_{k}) = L_{(w/2,w/2.k)}$；
    $$
    \begin{align*}
    
    L_{(w/2,w/2.k)} &= \sum_{i=1}^{w}\sum_{j=1}^{w}\sum_{k=1}^{n}W_{ijk} \times (M_{ij0}+L_{ijk}-M_{ijk})
    
    \end{align*}
    $$
    在进行时空融合时，需要考虑光谱差异(fine v.s. coarse)、时间差异(fine)、位置差异(at fine res)，作者构建了如下指标：

    1. $S_{ijk} = \left| L_{ijk} - M_{ijk} \right|$

        > <span class="s-color-primary">**\[假设]**</span>：fine的变化与coarse变化具有可比性；
        >
        > 
        >
        > 当$S_{ijk}$值越小，对于像元$(x_i, y_j)$的$W_{ijk}$应当越大；

    2. $T_{ijk} = \left| M_{ijk} - M_{ij0} \right|$

        > <span class="s-color-primary">**\[假设]**</span>：coarse反射率随时间不变，fine反射率也应当不改变；
        >
        > 
        >
        > 文章这里提到**该假设**可以用作<u>部分</u>去云，我的理解是使用fine-like像素的部分影像替代原来的有云影像；
        >
        > 文章还探讨了微小变化与coarse间的关系；



---
layout: s-cols
---

::col_1::

* **Core**：

    3. $D_{ijk}$：
        $$
        \begin{align*}
        d_{ijk} &= \sqrt{(x_{w/2}-x_i)^2+(y_{w/2}-y_j)^2} \\\\
        
        D_{ijk} &= 1 + \frac{d_{ijk}}{A}
        \end{align*}
        $$

        > 其中$A$是一个人为设置的常数，它定义了空间距离对光谱和时间距离的相对重要性；

    4. $W_{ijk}$：
        $$
        \begin{align*}
        
        C_{ijk} &= S_{ijk}\times T_{ijk}\times D_{ijk} \tag{1} \\\\
        
        C_{ijk} &= \ln(S_{ijk}\times B + 1) \times \ln(T_{ijk}\times B + 1) \times D_{ijk} \tag{2} \\\\
        
        W_{ijk} &= \frac{1/C_{ijk}}{\sum_i\sum_j\sum_{k=1}^n(1/C_{ijk})} \tag{3}
        
        \end{align*}
        $$

::col_2::



* 公式$(1)$是普通版本$C_{ijk}$；也可以使用逻辑映射，即公式$(2)$，使$C_{ijk}$对**光谱异常**不敏感；

    > 有如下可能导致异常情况：
    >
    > 1. coarse像元是一个同质像元，参考的fine与coarse变化较小；
    >
    > 2. coarse在时间间隔内变化较小；

* 公式$(3)$实际上就是在构建<u>加权平均系数</u>；

> 需要注意，当coarse在时间间隔内不变，即$T_{ijk}=0$，$C_{ijk}=0$，此时$W_{ijk}$取最大值；




---

* **Core**：

    5. 候选点处理：

        STARFM要求我们找出窗口中心点$(x_{w/2}, y_{w/2})$在窗口中$n$个的**光谱相似**邻居像素(fine pixel)；文中提到的查找方法有：

        * 在数据融合前进行无监督分类

        * 在STARM执行中设置光谱阈值，找到光谱相似邻居像素；

            > 文中采用R、NIR波段的反射率来确定光谱相似像素；

        STARFM要求我们对候选点进行进一步的过滤，候选点过滤的最终条件如下：
        $$
        \begin{align*}
        
        S_{ijk} &< \max{(\left| L_{(w/2, w/2, k)}-M_{(w/2, w/2, k)} \right|)} + \sigma_{lm} \\
        
        T_{ijk} &< \max{(\left| M_{(w/2, w/2, k)}-M_{(w/2, w/2, 0)} \right|)} + \sigma_{mm} \\\\
        
        \sigma_{mm} &= \sqrt{\sigma_m^2 + \sigma_m^2} \\
        
        \sigma_{lm} &= \sqrt{\sigma_l^2 + \sigma_m^2}
        
        \end{align*}
        $$
        
    
        > 注意$\sigma_{lm}$与$\sigma_{mm}$是根据Landsat与MODIS产品的QA层(基于CFMASK算法生成的像元质量波段)得出的，表示不同影像间地表反射率的不确定性；
    
        ​	

---
layout: s-cols
---

::col_1::



<s-image src="./fusion/STARFM.png" intro="STARFM时空融合方法流程图" align="center"/>



::col_2::



## 算法性能测试：



* 反射率变化检测✔️

* 线性对象检测✔️

* 形状变化检测❌

    > 在地物类别发生变化的情况下，STARFM预测的空间分辨率无法与原始细分辨率图像完全匹配；

* **小对象检测**

    > 对于小对象，一种处理方法是增加搜索窗口的大小，并在更大的区域内寻找纯粗分辨率的像素。找到这样的纯像素后，预测会明显更准确；我的理解是窗口小无法找到**足够多**的小对象中fine pixel对应的光谱相似邻居像素；  
    >
    > 需要注意的是，文中的小对象测试中小对象是单独存在，不是多个不同小对象同时存在，存在局限性； 




---
section: Fit-FC
layout: s-sub-cover
---

# Sentinel-2图像的每日数据时空融合

Spatio-temporal fusion for daily Sentinel-2 images

---
layout: s-cols
---

## 论文简介



::col_2::

Sentinel-2图像的每日数据时空融合

> 这篇论文提出了一种名为Fit-FC的创新方法，用于融合Sentinel-2和Sentinel-3卫星影像，生成接近每日更新的高分辨率（10米）地表观测数据。

* **作者**：$\text{Qunming Wang}$
* **日期**：$2018$



<s-card type="theme" header="论文来源">

* **h-index**：$34$
* **CiteScore**：$11.2$
* **CAS**：地球科学1区Top
* **Journal**：Remote Sensing of Environment

</s-card>



::col_1::

<s-image src="./fusion/fit-fc_cover.png" intro="论文"  align="center"/>



---
layout: s-cols
---

## 摘要与简介总结：

::col_1::

现有的时空融合方法：

* **STARFM**算法及其改进算法

    > 具体有：**STARFM**、**ESTARFM**、**STAARCH**；

* 基于学习的方法：

    > 1. 稀疏表示|sparse representation
    > 2. 极值学习机|extreme learning machine
    > 3. 人工智能、SVR、深度学习
    
* 基于空间解混的方法：

    > 相关方法：**SRCM**、**U-STFM**

* 基于上述方法的混合方法

    > 例如**FSDAF**方法是结合解混和STARFM的融合方法

::col_2::

空间解混与光谱解混：

* **光谱解混**：假设已知端元光谱，通过分解混合像元计算不同地物类别所占比例（丰度）。

* **空间解混**：假设已知类别比例（如通过高分辨率分类图升尺度得到），反演低分辨率像元内的端元光谱。

> 空间解混<span class="s-color-primary"><u>假设</u></span>在感兴趣时间内没有发生地表覆盖类型的变化，端元比例保持不变；

本文方法旨在解决强烈时间变化条件下的时空数据融合，相关方法有：**U-STFM**、**FSDAF**

> **U-STFM**至少需要两个粗细图像对，**FSDAF**则只需要一个；



---
layout: s-cols
---

## 回归滤波补偿三步法(Fit-FC)：

不同于STARFM方法，Fit-FC采用<span class="s-color-danger">**两个窗口**</span>进行滑动，使用一对fine & coarse输入，实现对$t_2$时刻的时空融合；



::col_1::

1. 构建局部回归模型(RM)：
    $$
    \begin{align*}
    
    C_{2}\left(X, l_{b}\right)&=a\left(X, l_{b}\right) C_{1}\left(X, l_{b}\right)+b\left(X, l_{b}\right)+R\left(X, l_{b}\right) \\\\
    
    \widehat{F}_{RM}\left(x_{0}, l_{b}\right)&=a\left(X_{0}, l_{b}\right) F_{1}\left(x_{0}, l_{b}\right)+b\left(X_{0}, l_{b}\right)
    
    \end{align*}
    $$

    > 不同于STARFM，Fit-FC使用**第一个窗口**在coarse遥感图像上滑动，获得初步的线性回归模型；
    >
    > 需要注意的点有：
    >
    > * $R\left(X, l_{b}\right)$是回归模型预测值$\widehat{C_{2}}\left(X, l_{b}\right)$与实际值$C_{2}\left(X, l_{b}\right)$的插值；
    > * 窗口大小一定要大于2个coarse像素，文中使用的coarse window大小为$15\times 15$；
    > * $X_0$是覆盖像元$x_0$的Sentinel-3像元。



::col_2::

2. 空间滤波(SF)：

    由于回归系数在300米尺度计算，直接应用于10米影像会导致每个300米块内像元反射率相同，形成明显块状伪影；块状伪影是因为光谱像素相邻像素在使用回归模型预测后光谱差异过大；
    $$
    \begin{align*}
    
    D&=\sqrt{\sum_{b=1}^{4}\left[F_{1}\left(x_{i}, l_{b}\right)-F_{1}\left(x_{0}, l_{b}\right)\right]^{2}/ 4}
    
    \end{align*}
    $$

    > 参考STARFM的思路，该方法使用**另一个窗口**在fine像素中找寻光谱差异性最小(窗口内$D$值最小)的$n$个像元，文中设置$n=30$；
    >
    > <span class="s-color-warning">**\[可能缺陷]**</span>：文中建议的使用范围为 Sentinel-2/3 的**R、G、B、NIR**波段；



---
layout: s-cols
---

::col_1::

2. 空间滤波(SF)：
    $$
    \begin{align*}
    
    \widehat{F}_{SF}\left(x_{0}, l_{b}\right)&=\sum_{i=1}^{n} W_{i}\widehat{F}_{RM}\left(x_{i}, l_{b}\right) \\\\
    
    W_{i}&=\left(1/ d_{i}\right)/\sum_{i=1}^{n}\left(1/ d_{i}\right) \\\\
    
    d_{i}&=1+\sqrt{\left|x_{i}-x_{0}\right|^{2}}/(w/ 2)
    
    \end{align*}
    $$

    > 这里的对于邻近相似像元的加权平均系数$W_{i}$参考了STARFM的系数$W_{ijk}$；
    >
    > <span class="s-color-primary">**\[假设]**</span>: 地物边界在$t_1$到$t_2$间稳定，$t_1$时刻的光谱相似性可代表$t_2$时刻的空间结构。



::col_2::

3. 残差补偿(RC)：

    补偿RM模型的残差，确保最终预测与Sentinel-3影像的光谱一致性。
    $$
    \begin{align*}
    
    \widehat{F}_{RC}\left(x_{0}, l_{b}\right)&=\sum_{i=1}^{n} W_{i} r\left(x_{i}, l_{b}\right) \\\\
    
    \widehat{F}_{2}\left(x_{0}, l_{b}\right)&=\widehat{F}_{SF}\left(x_{0}, l_{b}\right)+\widehat{F}_{RC}\left(x_{0}, l_{b}\right)
    
    \end{align*}
    $$

    > 这里的$r\left(x_{i}, l_{b}\right)$是对RM步的coarse残差$R\left(X, l_{b}\right)$重采样到fine分辨率；
    >
    > RC的$W_i$继续沿用SF；

    

---



<s-image src="./fusion/fit-fc_steps.png" intro="（a）RM。（b）SF。（c）Fit-FC。（d）t2参考。" align="center"/>



---
layout: s-end
---

# 汇报完毕

谢谢大家！