
---
title: Creating obfuscated code in python to make them unreadable 
date: 2020-08-23 10:00:00
author: Himanshu Garg
categories:
  - ["Scripting"]
tags:
  - python
  - code-obfuscation
  - pytransform
  - Data Protection
---

{% asset_img obfuscation.png %}


This post is totally focused on how to obfuscate your python code. The term **obfuscate** means that “*creating your code that is difficult for humans to understand*”. In this post, I am going to obfuscate my python code. This code obfuscation is generally used for data protection so that no third party can read my code.

In python, you can obfuscate your code using a command line tool known as **pyarmor**. It is a tool used to obfuscate python scripts, bind obfuscated scripts to fixed machine or expire obfuscated scripts. We can simply download pyarmor using the following command.

    pip install pyarmor

Lets start obfuscating our code. For now lets start with a simple python script to obfuscate. I had created a basic script which just prints a message on running it. Lets start obfuscating it by using below command

    pyarmor obfuscate /path/to/script

Then you see, there will be a **dist** named folder will be created. Now, go inside that folder and check that, there will be a file with same name as of your script. If you run it normally like

    python /path/to/script

then, it give the same result as before obfuscation. If you open this file you’ll see something like below
![Fig.1 showing how a obfuscated code looks like](https://cdn-images-1.medium.com/max/2000/1*EhTDQqh7kEpoukY_zPr7Iw.png)

There is also a folder called **pytransform** in the folder along with your script. This folder contains some information about the obfuscation code like its license and its key.

Now, we will obfuscate scripts which are using folder imports (like package). Lets create a same scenario like that and will obfuscate them.
I am going to make a calculator type files and the package just contains those files and in my main file I am simply importing it and doing operation. Follow the below steps for obfuscating them.

    mkdir build 
    cd build
    pyarmor init --src /path/to/package --entry __init__.py package_name
    pyarmor init --src /path/to/maincodeFolder --entry codename.py code_folder

Here, I have simply initialize the folders before obfuscating them, so just replacing the paths and your code name with the above names. Now,

    pyarmor build --output path/to/obfuscateFolder --no-runtime package_name
    pyarmor build --output path/to/obfuscateFolder --no-runtime code_folder
    pyarmor build --output path/to/obfuscateFolder --only-runtime code_folder

Here, “path/to/obfuscatefolder” is the path where you want to keep your obfuscated folder. I use only-runtime for the main code. By mentioning the only-runtime, pyarmor generates a **pytransform** folder for that code and for no-runtime it just obfuscate them.

Now, we are ready to run our code. Just go to your “path/to/obfuscateFolder” and run the main file. You can easily able to run that and your output should be same just like before obfuscating the code.

**Note** --: If you make any change in your main code then you need to obfuscate your code again.

I had put the whole code in my github. You can check from [here](https://github.com/hghimanshu/Blog/tree/master/obfuscation)

**Some good reads you may like :)**

1. [Creating a very basic deep-learning model in Docker](https://nayan.co/blog//AI/Creating-deep-learning-models-in-Docker/)