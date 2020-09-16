---
title: How to Prune deep CNN based architectures? 
date: 2020-09-05 11:19:52
author: Saksham Goyal
category: AI
tags:
 - AI
 - Deep Learning
 - CNN
 - Pruning
 - Neural Network
 - Machine Learning
 - NAYAN
---

​
With more and more research and development of state of the art neural network models, the neural network models are becoming deeper and deeper although these models are much more accurate but they also come with a significant cost that is a high inference time and also require more and more computational resources. This significant amount of computation resources consumed by such networks becomes a bottleneck when we require a real-time inference or when we want to deploy our Artificial Intelligence based applications onto edge devices which have limited computational resources. At Nayan we generally use this to make heavy Neural Networks fast.
​
There are many different methods for Efficient Inference:
​
* **Pruning**
​
* Quantization
​
* Weight Sharing
​
* Winograd transformation
​
* Binary / Ternary Net
​
In this blog we will be covering Neural Network Pruning which is one of the methods to produce models of smaller size, the ones which are more power efficient as well as memory efficient and in turn helps in making inference much faster with a minimal cost to the model accuracy.
> **Pruning deep neural networks means reducing the size of the deep learning networks by removing some parameters/ neurons.**
​
## Biological Inspiration for Pruning
​
Pruning in neural networks has been taken as an idea from [**Synaptic Pruning](https://en.wikipedia.org/wiki/Synaptic_pruning) **in the human brain where [axon](https://en.wikipedia.org/wiki/Axon) and [dendrite](https://en.wikipedia.org/wiki/Dendrite) completely decay and die off resulting in synapse elimination that occurs between early childhood and the onset of puberty in many [mammals](https://en.wikipedia.org/wiki/Mammal). Pruning starts near the time of birth and continues into the mid-20s.
​
![Fig: Synapses and neurons before and after pruning ([Learning both Weights and Connections for Efficient Neural Networks](https://arxiv.org/abs/1506.02626))](https://cdn-images-1.medium.com/max/2000/1*vtyUeef84qEk-OTWc-zoVA.png)*Fig: Synapses and neurons before and after pruning ([Learning both Weights and Connections for Efficient Neural Networks](https://arxiv.org/abs/1506.02626))*
​
Networks generally look like the one on the left: every neuron in the layer below has a connection to the layer above, but this means that we have to multiply a lot of floats together. Ideally, we’d only connect each neuron to a few others and save on doing some of the multiplications.
​
In pruning we majorly rank the neurons in the network based on how much they contribute and thus remove the low-ranking neurons making the network smaller and faster. But we prune the network in an iterative manner in-order to avoid the pruning of necessary neurons. Just like the figure below.
​
![Fig 2: Neural Network Pruning as a backward filter ([Pruning Convolutional Neural Networks for Resource Efficient Inference](https://arxiv.org/abs/1611.06440))](https://cdn-images-1.medium.com/max/2000/0*7r1YI5al1H30dHD7)*Fig 2: Neural Network Pruning as a backward filter ([Pruning Convolutional Neural Networks for Resource Efficient Inference](https://arxiv.org/abs/1611.06440))*
​
**3 major** steps involved in Pruning are
​
* Determine which neurons are more important and which are not (Ranking Neurons)
​
* Remove a portion of the least important neurons
​
* Fine-tune the network
​
We can rank the neurons according to the L1/ L2 norm of the neuron weights. The accuracy of the model might drop after pruning, but the network is fine-tuned/ trained iteratively to recover the loss. Because if we prune way too much at the once then there are chances of that the model might get damaged and then it won’t be able to recover. And thus we apply ‘Iterative Pruning’.
​
## Types of Pruning
​
* **Weight Pruning**
> - Setting individual weights in the weight matrix to zero. This corresponds to deleting connections.
> - Inorder to achieve sparsity of k% we rank the individual weights in weight matrix W according to their magnitude, and then set to zero the smallest k%.
​
* **Unit/ Neuron Pruning**
> - Setting entire columns(entire convolutional filters) to zero, in effect deleting the corresponding output neuron.
> - So to achieve sparsity of k% we rank the columns of a weight matrix according to their L2-norm and delete the smallest k%.
> # The future of machine learning is on the edge. And thus Optimizing Machine Learning models is especially important when deploying to low-power devices like smartphones.
​
## What’s Next?
​
Next up will be a short code for demonstrating how we can prune neural networks.

Find some more exciting AI blogs [here](https://nayan.co/blog/categories/AI/)

The author of this blog currently works [NAYAN](https://nayan.co)
