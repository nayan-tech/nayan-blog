---
title: Tensorflow 2.0 on Ubuntu 18.04 using docker
date: 2020-01-29 01:12:32
author: Abhishek Bose
categories:
  - ["AI"]
tags:
  - tensorflow
  - Ubuntu
  - Docker
  - Abhishek Bose
---

# Installing Tensorflow 2.0 on Ubuntu 18.04 using docker. Run all experiments from a container.

I have come across many developers who face serious issues when it comes to installing **tensorflow** on a **linux** distro such as **Ubuntu**. There are very few instances when the installation goes smoothly the first time itself. Mostly, the developer has to face a plethora of error messages which get quite tricky to solve. Some of the error messages are shown below:

    [...\stream_executor\dso_loader.cc] Couldn't open CUDA library nvcuda.dll

    [...\stream_executor\cuda\cuda_dnn.cc] Unable to load cuDNN DSO

Similar error messages can be found in this official tensorflow link → [**_https://www.tensorflow.org/install/errors_**](https://www.tensorflow.org/install/errors)

Let’s make things easier and lives simpler:

## Enter Docker:

Using **_Docker_** containers the life of a developer becomes easier by a massive amount. Many developers shy away from using docker containers thinking that it introduces extra dependencies into the system followed by maintenance issues, but that’s a misconception.

**_Docker_** containers actually reduce the time spent on figuring out different library versions to be installed and how they would communicate with one another. Containers solve multiple issues which arise with incompatibility of libraries and version mismatch. A container is completely independent from it’s host and reduces the chances of ruining environments on the host machine

### Installing Docker and NVIDIA Docker :

In order to run **_tensorflow_** as a container we would obviously need the latest version of docker to be installed and configured. Along with that we would also need **_NVIDIA Docker v2_** to be installed on the host machine. **_NVIDIA Docker_** plays a beautiful role of exposing the host machine’s GPU and GPU drivers to a container. Hence the developer only has to worry about installing the correct **_NVIDIA GPU_** **_driver_** on this machine. The **_NVIDIA Docker v2_** does the task of making it available for the container.

In order to learn how to install the latest version of Docker and NVIDIA Docker v2 , head over to my earlier post which describes this is in detail. Link given below:

[**Deep Learning for Production: Deploying YOLO using Docker.**](https://medium.com/@abose550/deep-learning-for-production-deploying-yolo-using-docker-2c32bb50e8d6)

### **Installing tensorflow using Docker:**

Once your docker and NVIDIA docker v2 installation is complete with **_nvidia-smi_** giving you the output as shown in Fig 1, when run inside a docker container, we can move ahead with pulling the correct image for tensorflow.

![Fig 1: Output of nvidia-smi inside docker container](https://cdn-images-1.medium.com/max/2000/1*dPZfCX1ia00A3BmTP-QQhA.jpeg)

Simply doing a **_docker pull tensorflow/tensorflow_** would download the latest version of tensorflow image. This can be run using the following command

    docker run -it -rm --runtime=nvidia --name=tensorflow_container ***tensorflow_image_name***

Executing the command given above will run the tensorflow container in an interactive shell along with the availability of the **_NVIDIA gpus_** inside the container.

Now there are certain modifications which can be performed to get the tensorflow **_version_** required along with other libraries. Let’s say you want the latest version of tensorflow along with **_gpu_** support and **_python 3_** pre-installed. The image for this customization can be easily pulled using the following command:

    docker pull tensorflow/tensorflow:latest-gpu-py3

You can find many other such images in the following link →[**_https://hub.docker.com/r/tensorflow/tensorflow/tags_**](https://hub.docker.com/r/tensorflow/tensorflow/tags)

Just do a docker pull on the one which suits your requirement.

If you want other libraries along with tensorflow, you can put them in a **_dockerfile_** and perform build command.

![Fig 2: Custom dockerfile with tensorflow](https://cdn-images-1.medium.com/max/2000/1*bRwR0nlR4-XbX-00xpY5-Q.png)

Fig 2 above shows a custom **_dockerfile_** with **_tensorflow v1_** image being used along with installation of other libraries such as **_OpenCV,Moviepy,Keras_** and **_Apache Kafka_** for python

Once inside the container invoked using docker run, you can setup code to use tensorflow easily as you would done on the host machine without the container.

I would encourage all AI/ML practitioners to increase the use of docker containers to increase their research and development efficiency by reducing the time spent in managing multiple libraries and dueling with incompatibility errors.
