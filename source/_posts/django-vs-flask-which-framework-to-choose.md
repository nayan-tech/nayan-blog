---
title: Django vs Flask - Which framework to choose
date: 2020-10-02 11:29:00
author: Himanshu Garg
tags: 
	- security
	- high-traffic
	- python
	- django
	- data protection
categories: ['python']
---
![Django vs Flask comparison](/blog/python/django-vs-flask-which-framework-to-choose/image.jpeg)

This headline you have heard many a times before. There is a lot of buzz going on with these two names whenever you are in a stage when you get confused about should I use **Django** or **Flask** for starting some project. So, in this post I’ll guide you the **“When and Where”** of the projects for both frameworks. Lets get started.

## **What are these frameworks?**

Lets understand these frameworks in brief. As per their official documentation site;

**Django** is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of Web development, so you can focus on writing your app without needing to reinvent the wheel. It’s free and open source.

**Flask** is a micro web framework written in Python. It is classified as a microframework because it does not require particular tools or libraries. It has no database abstraction layer, form validation, or any other components where pre-existing third-party libraries provide common functions.

**Lets discuss their differences:**

Django provides its own **Django ORM** **(object-relational mapping)** and uses data models, while Flask doesn’t have any data models at all. These data models enables you to interact with your database, like you would with SQL. In fact, Django’s ORM is just a pythonical way to create SQL to query and manipulate your database and get results in a pythonic fashion. Flask does not have any ORM structure.

One of the main difference between both of these frameworks is that Django provides a full-featured **Model–View–Controller (MVC)** framework. Its aim is to simplify the process of website development. It relies on less code, reusable components, and rapid development. Flask, on the other hand, is a microframework based on the concept of doing one thing well.

## **Comparing them on other factors as well:-**

**Performance**

The **Performance** factor for comparison is very important. This tells about many thing about both of these frameworks like scalability, speedy and secured. Weak performance can lead to scaling pains and architectural issues. If we consider Django vs Flask performance both have good results and are used by high-traffic websites, which is a great indicator of their effectiveness.

**Security**

Django has options for protecting your application from the following issues:

* Cross-site scripting (XSS)

* SQL injection

* Cross-site request forgery (CSRF)

The Flask-Security library provides almost the same mechanisms as Django to prevent data leaks and other web attacks.

**Template Engine**

Flask is developed based on Jinja2 template engine. As a fully-featured template engine for Python, Jinja2 is also inspired by Django’s template system. It enables developers to accelerate development of dynamic web applications by taking advantage of an integrated sandboxed execution environment and writing templates in an expressive language. Django comes with a built-in template engine that enables developers to define a web application’s user facing layer without putting extra time and effort.

**Admin Interface**

Django provides a ready to use admin framework which makes it easier for users to handle common project administration tasks. It further generates the functional admin module automatically based on project models. The developers even have option to customize.. They can even take advantage of the admin interface to simplify website content administration and user management. The functional admin user interface makes Django standout in the crowd. But there is no such admin interface in flask.

**Usage and Use Cases**

This is the most important one. Both of these frameworks are currently being used by several high-traffic websites. But the usage statistics posted on various websites depict that Django is more popular than Flask. The main reason of the popularity of Django is that the developers can take advantage of the robust features to build and deploy complex web applications rapidly. At the same time, they can use Flask to accelerate development of simple websites that use static content. However, the developers still have option to extend and customize Flask according to precise project requirements.

## **Conclusion**

On the whole, both Flask and Django are widely used open source web frameworks for Python. Django is a full-stack web framework, whereas Flask is a micro and lightweight web framework. The features provided by Django help developers to build large and complex web applications. On the other hand, Flask accelerates development of simple web applications by providing the required functionality. So, if there is a need to make a small system or a micro-service then you should prefer Flask to use else Django.

**Some good reads you may like :)**

1. [Creating a very basic deep-learning model in Docker](https://nayan.co/blog//AI/Creating-deep-learning-models-in-Docker/)