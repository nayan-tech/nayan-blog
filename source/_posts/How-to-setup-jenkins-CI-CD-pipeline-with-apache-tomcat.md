---
title: How to setup Jenkins CI/CD pipeline with apache tomcat for java web applications
date: 2020-08-15 10:00:00
author: Puneet
categories : 
- ["JAVA"]
tags:
  - JAVA
  - Backend
  - DevOps
  - NAYAN
  - CI/CD
  - Jersey
  - Puneet
  - MAVEN
  - NAYANINDIA
---

Whenever there are new updates to push either on frontend or on backend, one thing we all can agree upon is that it can be an utter chaos if there is no standard deployment process established. As developers, we always have a number of tests that need to be crossed off our checklist prior to deployment of updates and having a proper deployment pipeline take away almost all of the pain.

Today, I want to give you a demo of how you can use **Jenkins (A server automation tool) written in JAVA to automate code deployment** to multiple pipelines such as Development, Staging or even production **straight for an version control system like Git**.

![Jenkins Automation Server](/blog/JAVA/How-to-setup-jenkins-CI-CD-pipeline-with-apache-tomcat/jenkins_feature.jpg)

I will be using **a maven based Rest API project written with Jersey (Rest API Framework)**.

## Prerequisite
1. Should have a tomcat server running on your machine.
2. Should have a maven based project (I am using Jersey in our case) 
3. Should JAVA 8 or above install on your machine
4. maven dependency setup

## Set up Jenkins.

To work Download Jenkins from below this [link](https://www.jenkins.io/download/). It is a web archive (war) file which we will be using to run Jenkins on our apache tomcat server.

**Once downloaded move Jenkins.war file to webapps directory of apache tomcat and restart tomcat server**

![Getting started : Jenkins ](/blog/JAVA/How-to-setup-jenkins-CI-CD-pipeline-with-apache-tomcat/getting_started_with_jenkins.png)

Try to hit **http:localhost:8080/Jenkins** . you should be able to see the Getting started screen. In an order to login to your Jenkins server, checkout initialAdminPassword 

`TOMCAT_HOME/.jenkins/secrets/initialAdminPassword (here tomcat home is tomcat installation directory)`

Now create a new user in tomcat-user.xml for Jenkins deployment 

`<user username="jenkins" password=“Password roles="manager-script" />`

Before setting up new job we need to install below mentioned jenkins plugins 

1. Install “deploy to container” plugin (for tomcat deployment)
2. Install “Git” plugin (For git support) 
3. Install “Github” Plugin (For configuring webhooks of your git repo)

## Setup job
![Jenkins job](/blog/JAVA/How-to-setup-jenkins-CI-CD-pipeline-with-apache-tomcat/create_new_job.png)

Create a new job with a freestyle project. In an order to fully automate war deployment we need to consider below mentioned steps

1. Pulling code from remote repository.

![Setting up git repository](/blog/JAVA/How-to-setup-jenkins-CI-CD-pipeline-with-apache-tomcat/git_repository.png)

Here I am setting up this job to pull from a demo repository from my github account. I am using **Master branch to fetch for every time a new build is triggered**. You can use other branches like ***Dev or staging** for setting up different deployment pipelines.

2. Compiling and building the war file using maven.

![build setup](/blog/JAVA/How-to-setup-jenkins-CI-CD-pipeline-with-apache-tomcat/build_step.png)

In build section, select **Execute Shell** from drop down and write  

`mvn clean install`

3. Deploying war to tomcat using the "Jenkins" user we just created.

![Post build, war deployment](/blog/JAVA/How-to-setup-jenkins-CI-CD-pipeline-with-apache-tomcat/war_deployment.png)

When maven is done building us a war from source code which jenkins has pulled from git repository, we need to deploy this newly cleared war file to webapps directory in apache tomcat.

This can be done by configuring post build section and provide credentials for above created **Jenkins** user in tomcat-user.xml file.  

4. Setting up a web hook to trigger automatic build whenever a pull request is approved or changes are pushed to branch.

You need to create a web-hook for your github repository. Go to the setting tabs, select web-hooks and create a new webhook. But before that you need to expose your Jenkins server to the external world, you can do that using ngrok (for temporary basis) or you can setup a public ip for your machine.

`http://beb52b5f60fd.ngrok.io.ngork.io:8080/jenkins/github-webhook`

Once done, whenever there is any push in your git repository Jenkins which gets a notification using this web hook and automatic build will be triggered.

## Conclusion 

As you can see in just 15 mins we created a new job that will pull code from a specific branch of git repository, create a war build from the latest code and deploy it to tomcat. Imagine setting up different pipelines, one for development and other one for Testing / Stating environment which are configured with different code branches. It will not only help deploy updates to different environments but also make it easy to work on multiple features in parallel.  

## References:-

1. Read more about [Jenkins](https://www.jenkins.io/doc/)

## Some good reads you may like:-

1. Read here to know more about [Android Testing Strategy](http://blog.nayan.co/Android/Android-Testing-Strategy/)

2. Here is an great article to [setup dynamic feature delivery for android application](http://blog.nayan.co/Android/Dynamic-feature-deployment-in-android/)
