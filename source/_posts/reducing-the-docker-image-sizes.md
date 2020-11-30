---
title: Reducing the docker image sizes
date: 2020-11-30 11:29:00
author: Himanshu Garg
tags: 
	- docker
	- lightweight images
	- python
	- docker-images
	- alpine
categories: ['python']

---
![](/blog/python/reducing-the-docker-image-sizes/docker.png)

While building any docker image, do we get an idea about the size of that image and can we optimize their size?

Well in this post I will tell you how can you optimize the size of your very heavy docker images.

## **Lets gets started!!**

Before beginning I’ll recommend you to go through my previous blog in which I had show you how to create docker images. In this post I’ll use that docker image and try to optimize it as much I can.

![](https://cdn-images-1.medium.com/max/2000/1*5mnlDgrO84nUwzGDKMgQrw.png)

Here, the image shown as **docker_containerized_cifar** was the one which we created in the post. Also, as the image shows you, this images is of **3.79GB**. That’s very heavy image. Lets us try to optimize and see how much can we reduce in this image

Before going anything further, lets see sizes of layers in this image

    docker history docker_containerized_cifar

![](https://cdn-images-1.medium.com/max/2178/1*ey_DuT_XlfHGUQtgTFQAdQ.png)

Here, the size of each layer is shown. Lets try to improve this

I have create another dockerfile. Here I have reduce the RUN command as every RUN adds a new layer hence increase the size of the image.

So, I have build a new image

![](https://cdn-images-1.medium.com/max/2000/1*rGzaepne58vjXrddBmM0Nw.png)

Lets check its size and compare it with the previous image

![](https://cdn-images-1.medium.com/max/2000/1*wiPQ4V707I7A7Lo9NOLqkw.png)

Here, as you can see the new image **lightcifar_1** is of around **3GB** which is quite less than the original image. So, we have reduced around **0.79GB** of size and that too in one go 🙌. Lets try one more time and try to reduce this by using a small base image and see.

![](https://cdn-images-1.medium.com/max/2000/1*1LFPYX_HBmVAC0QyUy6ZEA.png)

Lets check its size and compare it with the previous images

![](https://cdn-images-1.medium.com/max/2000/1*NAmm6pqnIM2_35R5DrmtlQ.png)

This new image name is **lightcifar_2**. Here we have take lighter base image and wow our image size is reduced to **2.48GB** from **3.79GB**. That’s around 34% lighter from the original image. Lets see its size of the layers

![](https://cdn-images-1.medium.com/max/2298/1*ZHNBLTV9UCcJhWap4IzAvA.png)

## **Conclusion**

So, with this post we learn how to reduce the size of the heavy docker images. If you need any code helps then you can find the code from [here](https://github.com/hghimanshu/Blog/tree/master/CIFARDocker). If you also have some other way to reduce this size then please let me know.

**Some good reads you may like :)**

1. [Creating a very basic deep-learning model in Docker](https://nayan.co/blog//AI/Creating-deep-learning-models-in-Docker/)