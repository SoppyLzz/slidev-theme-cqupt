---
theme: ./
layout: s-cover
presenters: 罗之章 | S240201166
meeting: 密码学与网络安全
defaults:
  header:
    name: SNav
  background:
    name: SDefault
  school:
    badge: school_badge.svg
    logo: school_logo.svg
---

# 针对一系列类RSA密码系统的部分暴露攻击

`论文分享` | `RSA` | `Archive`

<br/>

作者：$\text{George T}\c{e}\text{seleanu}$<sup>1,2</sup>

名称：$\text{Partial Exposure Attacks Against a Family of RSA-like Cryptosystems}$

<br/>

来源：[$\text{Cryptology ePrint Archive}$](https://eprint.iacr.org/)

---
layout: s-toc
---

# 目录

$Content$

---
layout: s-sub-cover
section: 背景与前人工作
---

# 介绍：背景与前人工作
_Introduction: background and previous work_

---
layout: s-cols
---

## 经典RSA算法

::col_1::

$\text{RSA}$是使用最广泛的密码系统之一，由<span class="s-color-theme">$\text{Rivest、Shamir、Adleman}$</span>在其$\text{1978}$年的论文中介绍：
$$
\begin{align*}

m &\in \mathbb{Z}_N^*\,,\,N=pq\\\\

\varphi(N) &= (p-1)(q-1) \\\\

c&= m^e\bmod N\;,\;\gcd \left(e, \varphi (N) \right) = 1\\\\

m&= c^d\bmod N\;,\;d \equiv e^{-1} \bmod \varphi (N)

\end{align*}
$$

> $\mathbb{Z}_N$是模$N$的整数集合；
>
> $\mathbb{Z}_N^*$是$\mathbb{Z}_N$中与$N$互质的元素集合；

本文中我们只关注满足$q<p<2q$条件的素数 $p,\;q$ ；

::col_2::

<s-image src="./crypto/i1.png" align="center" intro="RSA加密解密流程"/>

---
layout: s-cols
---

## 前人工作

::col_1::

1. 随着时间的推移，人们已经开发出各种攻击来在特定条件下从公钥$(N, e)$中提取秘钥$d$：

   > 如果$d < N^{0.25}/3$ ，则可以从$\cfrac{e}{N}$的连分式展开中恢复密钥$d$，从而得到$N=pq$； 边界继续优化得到：$d<N^{0.292}$；

2. 前人将$\text{RSA}$方案扩展到以$N$为模的高斯整数环：

   $$
   \begin{align*}
   
   N &\in \mathbb{Z}_N\left[i\right]\;,\; N=PQ \\
   a+bi &\in \mathbb{Z}_N\left[i\right]\;,\;a,b \in \mathbb{Z}_N \\
   
   
   \phi(N) &= (p^2-1)(q^2-1) \\
   
   e\; &satisfies \;\; \gcd(e, \phi(N)) = 1 \\
   
   d\; &satisfies \;\; d \equiv e^{-1} \bmod \phi(N)
   
   \end{align*}
   $$

   > 其中$p$与$q$是高斯素数的实部与虚部，加解密同经典$\text{RSA}$；
   >
   > 针对该方案开发了维纳型连续分数攻击。使用晶格约简技术，最终将边界优化为：$d<N^{0.585}$；

::col_2::

3. 环$Z_p$与$Z_p[i]$可以重写为：

    $$
    \begin{align*}
      
    Z_p &= \mathbb{Z}_p[t]/(t+1)=GF(p) \\\\
      
    Z_p[i] &= \mathbb{Z}_p[t]/(t^2+1)=GF(p^2)
      
    \end{align*}
    $$
   
   > 普通$\text{RSA group}$是：$\mathbb{Z}_N = GF(p)\times GF(p)$
   >
   > 高斯整数环上的$\text{RSA group}$是：$\mathbb{Z}_N[i] = GF(p^2)\times GF(p^2)$
   >
   > 我们可以推广这两种方案到[<span class="s-color-theme">作者本人的工作</span>]：$GF(p^2)\times GF(p^2)\;,\;n\ge 1$；
   >
   > 这时$\text{group order}$为：$\varphi_n(N) = (p^n-1)(q^n-1)$，加密解密算法参考高斯整数环拓展的方式；

---

## 本文贡献

针对上文提到的第三种$\text{RSA}$拓展开发了几种基于 **格** | `lattice` 的攻击方式，详细内容可以概括为：

> 当攻击者了解到了如下内容：
>
> * $d$的最低有效位；
> * $p$的近似值；
> *  质差$|p − q|$很小；
> * 素数共享一定数量的最低有效位；
>
> 那么如果$d$小于给定阈值，那么则可以对$N$进行因式分解



---
layout: s-sub-cover
section: 格的应用
---

# 内容：格的应用
_Content: application of lattice_

---
layout: s-cols
---
::col_1::

## 已知d的最低有效位

这论文的部分提供了一种当攻击者知道$d$的最低有效位时求$N$因式分解的方法：

### 定理

令$N=pq$为两个未知素数的乘积，其中$q<p<2q$，另外令$d=d_1\cdot2^s+d_0$，其中$s,d_0$为已知整数。当$e=N^\delta,\;d<N^\gamma,\;2^s=N^\varepsilon$，且有如下条件满足时：

> $$
> \begin{align*}
> 
> \begin{cases} 
> \gamma \leq n + \varepsilon - \sqrt{0.5n(\delta + \varepsilon)}, & \text{when } \frac{n}{2} - \varepsilon \leq \delta \leq \frac{(n+1)^2}{2n} - \varepsilon, \\\\
> \gamma \leq \frac{3n - 1}{4} + \frac{(n+2)\varepsilon - n\delta}{2(n+1)}, & \text{when } \frac{(n+1)^2}{2n} - \varepsilon < \delta \leq \frac{(n+1)(3n-1)}{2n} + \frac{(n+2)\varepsilon}{n}, \\\\
> 
> \gamma<0.5n+\varepsilon,& \text{when }d_0\ge1,
> 
> \end{cases}
> 
> \end{align*}
> $$

我们可以在 **多项式时间** | `polynomial time` 内对$N$进行因式分解；

---

## 已知p的近似值

论文的这部分提供了一种当攻击者知道$p$的近似值$p_0$时求$N$因式分解的方法；

### 定理

令$N=pq$为两个未知素数的乘积，其中$q<p<2q$，另外令$p_0$为$p$的已知近似值。当$e = N^\delta 、d < N^\gamma，|p_0 − p|< N^\varepsilon$，且有如下条件满足时：

> $$
> \begin{align*}
> 
> \begin{cases} 
> \gamma \leq n - \sqrt{\varepsilon n \delta}, & \text{when } \varepsilon n \leq \delta \leq \frac{\varepsilon (n+1)^2}{n}, \\\\
> \gamma \leq \frac{n(2 - \varepsilon) - 1}{2} - \frac{n \delta}{2(n+1)}, & \text{when } \frac{\varepsilon (n+1)^2}{n} < \delta \leq \frac{(n+1)[n(2 - \varepsilon) - 1]}{n},\\\\
> 
> \varepsilon<(2n-1)/(2n+1),
> 
> \end{cases}
> 
> \end{align*}
> $$

我们可以在多项式时间内对$N$进行因式分解；

---

## 质差|p - q|很小

这部分时已知$p$的近似值情况下的攻击的推论

### 推论

令$N=pq$为两个未知素数的乘积，其中$q<p<2q$，当$e=N^\delta,\;d<N^\gamma,\;|p-q|<N^s$，且有如下条件满足时：

> $$
> \begin{align*}
> 
> \begin{cases} 
> \gamma \leq n - \sqrt{\varepsilon n \delta}, & \text{when } \varepsilon n \leq \delta \leq \frac{\varepsilon (n+1)^2}{n}, \\\\
> \gamma \leq \frac{n(2 - \varepsilon) - 1}{2} - \frac{n \delta}{2(n+1)}, & \text{when } \frac{\varepsilon (n+1)^2}{n} < \delta \leq \frac{(n+1)[n(2 - \varepsilon) - 1]}{n},\\\\
> 
> \varepsilon<(2n-1)(2n+1)
> 
> \end{cases}
> 
> \end{align*}
> $$

我们可以在多项式时间内对$N$进行因式分解；

---

## 素数共享最低有效位

当两个素数共享一定数量的最低有效位时，本文提供了$N$的因式分解方法。

### 定理

令$N=pq$为两个未知素数的乘积，其中$q<p<2q$，另外令$p-q=v_1\cdot2^s+v_0$，其中$s$是已知整数，当$e=N^\delta,\;d<N^\gamma,\;2^s=N^\varepsilon$，且有如下条件满足时：

> $$
> \begin{align*}
> 
> \begin{cases} 
> \gamma \leq n - \sqrt{0.5n\delta(1 - 4\varepsilon)}, & \text{when } \frac{n(1-4\varepsilon)}{2} \leq \delta \leq \frac{(1-4\varepsilon)(n+1)^2}{2n}, \\\\
> \gamma \leq \frac{3n - 1}{4} + \varepsilon(n + 1) - \frac{n\delta}{2(n+1)}, & \text{when } \frac{(1-4\varepsilon)(n+1)^2}{2n} < \delta \leq \frac{4\varepsilon(n+1)^2 + (n+1)(3n-1)}{2n},\\\\
> 
> 0.5n<\delta+\gamma
> 
> \end{cases}
> 
> \end{align*}
> $$

我们可以在多项式时间内对$N$进行因式分解；

---
layout: s-end
---

# 汇报完毕

谢谢大家！