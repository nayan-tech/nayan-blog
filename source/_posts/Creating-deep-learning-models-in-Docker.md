---
title: Creating a very basic deep-learning model in Docker
date: 2020-05-16 11:09:31
author: Himanshu Garg
tags: 
	- docker
	- deep-learning
	- AI
categories: ['AI']
---

{% asset_img docker_python.png %}

Recently me and my team shifted our approach to build our models in the docker containers rather than creating and running a python file on the system. For me, it was a completely new experience in learning docker. If you are also quite new to docker then with this post you will be able to create your own basic deep-learning model in docker.

**What is Docker?**

Docker provides an image-based deployment model. This makes it easy to share an application, with all of their dependencies across multiple environments. Docker also automates deploying the application inside this container environment.

**Docker Images and Containers**

Docker Container is a standard unit which can be created on the fly to deploy a particular application or environment.

A Docker image is a file, comprised of multiple layers, that is used to execute code in a Docker container. An image is essentially built from the instructions for a complete and executable version of an application, which relies on the host OS kernel. Multiple instances of a Docker container can be run on a single docker image.

**Why Docker?**

Since we get an idea about docker, lets discuss some of its important use-cases:

* Modularity : This means that with the use of docker if any of the part of the application needs to get update or repair, we can do that without shutting the whole application down.

* Rollback : Every image has layers. Don’t like the current iteration of an image? Roll it back to the previous version

**Installing Docker**

Before getting started, we firstly need to install docker on our machine.

Firstly update the packages and installing the required packages

    $ sudo apt update
    $ sudo apt install apt-transport-https ca-certificates curl software-properties-common

Then add the GPG key for the official Docker repository to your system:

    $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

Add the Docker repository to APT sources:

    $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

Make sure you are about to install from the Docker repo instead of the default Ubuntu repo:

    $ apt-cache policy docker-ce

Now, finally install docker

    $ sudo apt install docker-ce

Check, the docker is running by

    $ sudo systemctl status docker

![Fig. 1: You’ll see the output some similar to this](https://cdn-images-1.medium.com/max/2000/1*Nb6ln3J-75kf0QixxzcRtA.png)

**Creating a project with Docker**

Now, we are ready to create our first docker project. I had choose a simple CIFAR-10 dataset for the post. You can clone my [git repository](https://github.com/hghimanshu/Blog). Go the **CIFARDocker** folder. The folder structure is as below:-

![Fig. 2: Folder structure for the CIFARDocker Folder](https://cdn-images-1.medium.com/max/2000/1*yPvku4PluJOzUkoD_h54VQ.png)

We here need to know mostly about two files **Dockerfile** and **run_cifar.sh.** Firstly going with **Dockerfile.**

![Fig. 3: Image for Dockerfile](https://cdn-images-1.medium.com/max/2000/1*0oa84Cjo7rfV7mRcVJTABw.png)

Firstly, we pull our base image from the public repositories. A Dockerfile must start with a **FROM** instruction. It initializes a new build stage and sets a base image for other instructions. The **ENV** instruction sets the environment variable. So, here we sets some enivronment for python. Then, we use **RUN **instruction. This instruction is used to execute any commands just like we do on our machine. Here, I install some packages like ffmpeg, wget etc. The **ADD** instruction is used to copy new files or directories local machine and adds them to the filesystem of the image at the path.

Format for **ADD** instruction is as below:

    ADD <src> <dst>

Here, we provide the file path as per our local machine as <src> and our file path in our image in <dst>. Here, in our dockerfile, I copied a requirements.txt file and adds to the base path of the image. Then I install all the packages inside the requirements.txt file using the **RUN** instruction.

Now, finally we define our **WORKDIR** instruction. This is the path to our working directory. So, specify the WORKDIR path as per your image path.
Now, we will build our docker image. To build the image, type the below command

    $ docker build -t 'docker_containerized_cifar' .

Here, the **docker_containerized_cifar** is the name of our docker image. You can specify your custom image name for your dockerfile.

Now we will make a container for this docker image. Open **run_cifar.sh** file.

Its basic format is as like:-

    docker run -it -d --name=docker_container_name -v <src>:<dst>       --network=docker_image_name

Here,

* -it: Instructs Docker to create an interactive bash shell in the container.

* --name: Gives the name of your container

* --v: Specify, the local machine folder <src> to be mounted on the <dst> path (image path)

* --network: Docker image name associated with the container. In our case, the name will be **docker_containerized_cifar.**

Now, starting the container using the below command.

    $ bash run_cifar.sh

Now, run our code in the docker container itself. For, this type the below command.

    $ docker exec -it docker_container_name bash

Here, **docker_container_name** is the name of my docker container.

When you hit the above command, a shell gets open and BOOM you are in your docker container.

Now, run the code for cifar using the command

    $ python cifar.py

That’s simple, now, your code is running on the docker container. If you want to stop/start the container again. Then type the below command.

    $ docker start container_name ##for starting a container
    $ docker stop container_name ##for stopping a container

**Conclusion**

Well, that’s enough in this post. Hope you liked it. I hope you get an idea about **docker** and also about how can we these deep-learning models with the docker.


**Some good reads you may like :)**

1. [Flask + Mongo Integration](https://nayan.co/blog/uncategorized/Flask-PyMongo-Integration/)