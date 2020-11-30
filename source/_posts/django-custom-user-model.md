---
title: Django Custom User Model
date: 2020-11-30 11:29:00
author: Himanshu Garg
tags: 
	- user-model
	- custom-user-model
	- python
	- django
	- django-admin
categories: ['python']

---
![Django Custom User Model](/blog/python/django-custom-user-model/custom-user-model-logo.png)


“How do I replace the **username** field with the **email** field or add other fields while for registering a new user? ”

Did this question came to your mind before creating any application with django? If yes, then this post is for you.

In this post, I will show you guys how to create custom user model in django.

As we all know the default **User** model in django uses a username to uniquely identify a user during authentication. If you need to replace this username field with other field lets say an email field then you need to create a custom user model by either subclassing **AbstractUser** or **AbstractBaseUser**.

So what are these ?

**AbstractUser :-** if you only want to remove the username field and don’t have any problem with other fields

**AbstractBaseUser :-** if you want to start all from scratch by creating your complete new user model

## **Code**

I am assuming you already have created a django-project. So create a new app *users.*

    python manage.py startapp users

Lets create a users/managers.py file

![](https://cdn-images-1.medium.com/max/2616/1*7PgkURTjGBX6DFrdEK7G-A.png)

Now create a users/models.py file

![](https://cdn-images-1.medium.com/max/2580/1*nkmzZxdSvBUGHIJ3eSGYLA.png)

Here we firstly created our custom manager by subclassing **BaseUserManager**, that uses email for unique identifies rather than username

Also for the models.py file, we firstly subclass **AbstractUser**. Here, we specify email as **USERNAME_FIELD**. Along wih these we also added a new field to store the **Full Name** of the user.

Lets create the users/forms.py file

![](https://cdn-images-1.medium.com/max/2984/1*B-cTrFmAhIGBichsHYvC9w.png)

Here in forms.py we have created a basic validation method so that while creating the user, both the passwords are same

users/views.py

![](https://cdn-images-1.medium.com/max/2548/1*F0HjR9GvkLuWEUM04qE1EA.png)

It imports our custom user model and saves the fields to the model

Before running the code, lets change our project settings.py file

![](https://cdn-images-1.medium.com/max/2000/1*BhVktNIey9hvH0Mj56Jvsw.png)

Here, in settings.py file we firstly added our newly created app. Then we define a **AUTH_USER_MODEL** as we have created our custom model.

Lets migrate our model

    python manage.py makemigration
    python manage.py migrate
    python manage.py runserver

You can check the urls and other template files from my github repo

**Output**

![sample form values](https://cdn-images-1.medium.com/max/3188/1*HXD8q2zpp7RX9BdLJyGUPg.png)

In django-admin

![Some users which I have created](https://cdn-images-1.medium.com/max/2000/1*18_3VxHJn1ryipLC6LMHsA.png)

![](https://cdn-images-1.medium.com/max/2000/1*CcoigQy7gvG-qiiUnO00Yg.png)

## **Conclusion**

In this post, we looked at how to create a custom django user model. You can find the final code [here](https://github.com/hghimanshu/Blog/tree/master/custom).

**Some good reads you may like :)**

1. [Django vs Flask which framework to choose](https://nayan.co/blog/python/django-vs-flask-which-framework-to-choose/)