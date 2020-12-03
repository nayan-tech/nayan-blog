
# The only Python inheritance guide you need
#NAYAN
#Building tech to improve India

---
title: The only Python inheritance guide you need
author: Abhishek Bose
categories:
- ["Python"]
tags:
- Python
- NAYAN
- TECH FOR INDIA
- Object oriented programming
- Class
- Inheritance
---



Python is fantastic language for learning objected-oriented programming. An important pillar of objected-oriented programming is using inheritance in your code. Writing two classes which represent a similar real world object but bear not relationship with each other is actually on not much use.

This is the short blog on how to make the best use of classes in python.

Let’s look at the example below. The class vehicles has two variables called manufacturer and color. The methods set_manufacturer, set_color and set_rating is used to update the variables for this class.

<iframe src="https://medium.com/media/752037329bedb44d2a045088c35a81d1" frameborder=0></iframe>

We will use the vehicles class as the parent class and define another class called sedan which will be subclass/child class to vehicles as show below.

<iframe src="https://medium.com/media/332bd348665e8109d8184a33b851e775" frameborder=0></iframe>

On line 6 we are calling ***vehicles.__init__(self)** *which makes all attributes of vehicles available to the sedan class. We can also use the super builtin() to refer the baseclass.

<iframe src="https://medium.com/media/0609965cb21a845114498e97aa779deb" frameborder=0></iframe>

In the main function, we create an instance of the class sedan as ***vehObj. ***We use the set_name and set_speed methods to update the speed and name variables. The output of line of 7 and 8 is given below in Fig 1.

![Fig 1: Output of line 7 and 8](https://cdn-images-1.medium.com/max/2000/1*gKBcTW6j5f5AQp-kLAODWA.png)*Fig 1: Output of line 7 and 8*

Now we use the set_manufacturer, set_color and set_rating methods to update the variables, manufacturer, color and rating of the parent vehicle class. As you can see, we use the vehObj and use the methods inside the parent vehicles class. The output of line 15,16 and 17 is given below in Fig 2.

![Fig 2: Output of objects in the vehicles class.](https://cdn-images-1.medium.com/max/2000/1*PoDXvNjdn_7CvQruZHQwnA.png)*Fig 2: Output of objects in the vehicles class.*
