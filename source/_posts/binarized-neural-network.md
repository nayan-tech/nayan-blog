---
title: Binary Neural Network “A New Revolution in AI”?
date: 2020-09-31 08:00:00
author: Kunal Goyal
category: AI
tags:
  - AI
  - Alexnet
  - BNN
  - yolo
  - Kunal Goyal
---

![](https://miro.medium.com/max/700/1*6Xp_zjTJiVemexCdKyC8fA.png)

## **Introduction**

If I get to explain the neural network to a Noob. I explain to them as,
> A Neural Network is more like a Jigsaw puzzle. We try to combine these jigsaws eachother over tons of data. But the best part is we can change these pieces accordingly. These jigsaws are weights.

Now, If we take weights as Floating points we can change them over billions of possibilities like 12.2230 or 12.2245 etc. But in Binary Neural Network(BNN) we fix those weights to +1 and -1 only. Later in this blog, I will explain how BNN is **64 times **faster to that of the floating-point network**. [**This](https://medium.com/unrealai/the-carbon-footprint-of-ai-its-worse-than-gas-powered-cars-4b2996fc731e) blog from [Saurabh](https://www.linkedin.com/in/saurabhdotio/) nicely explains the need for revolutionary Fast AI.

## What is behind the BNN?

During the forward pass, BNNs drastically reduce memory size and accesses, and replace most arithmetic operations with bit-wise operations, which is expected to substantially improve power-efficiency. We convert floating weights to binarized weights using:

![](https://cdn-images-1.medium.com/max/2000/1*IkStZjBu_mbi51WUkgM97A.png)

Example:

![](https://cdn-images-1.medium.com/max/2000/1*-qZwyyp_uh_EtsU7q043bA.png)

After converting weights to +1 and -1. [This](https://sushscience.wordpress.com/2017/10/01/understanding-binary-neural-networks/) blog explains the computation of +1 a. s 1(set bit) and -1 as 0(unset bit).

![](https://cdn-images-1.medium.com/max/2000/1*tblU8P44xS0RpLeOyfNPFQ.png)

## Some Proof of concepts:

As BNNs have a very efficient forward pass, They can be used in real-time face detection/recognition using a deep learning system running on a pair of glasses. Billions of IoT devices, small mobile devices, etc. can become smart using BNNs only.

There are various SOTAs implementations that are available out there like ours [Fiera](https://github.com/xyzunreal/Fiera). [DABNN](https://github.com/JDAI-CV/dabnn) from JDAI-CV is the highly-optimized binary neural network inference framework for mobile platforms. On Google Pixel 1, DABNN is as 800%-2400% faster as BMXNet. We can deploy BNNs on non-Android ARM devices through onnx2bnn. This is the [documentation about model conversion](https://github.com/JDAI-CV/dabnn/blob/master/docs/model_conversion.md).

![](https://cdn-images-1.medium.com/max/2000/0*qxDr2g8qU1SEVSV-.png)

There also have been great papers published to get the good State of the art accuracy for BNN based architectures.

![Comparison of accuracies on the ImageNet dataset](https://cdn-images-1.medium.com/max/2000/1*LFKiAPicXJQId3XbanwZyw.png)*Comparison of accuracies on the ImageNet dataset*

On combining the above two i.e. DABNN and Methodology we can get more virtuous results. One of the classical examples we have got is [Tiny YOLOV4 XNOR](https://github.com/AlexeyAB/darknet/blob/master/cfg/tiny-yolo_xnor.cfg). It uses a 1-bit XNOR operation to perform object detection. At [nayan](nayan.co) we use this to process videos fast on edge.
