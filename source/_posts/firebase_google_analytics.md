---
title: Integration of Firebase Google Analytics for Android application
date: 2020-10-25 10:00:00
author: Puneet
categories : 
- ["Android"]
tags:
  - Firebase
  - Android
  - Frontend
  - NAYAN
  - AppDevelopment
  - Puneet
  - GoogleAnalytics
  - NAYANINDIA
---

![Firebase Analytics Dashboard](/blog/Android/firebase_google_analytics/sample_firebase_analytics_dashboard.png)

It’s not an understatement to say that Data is everything. In fact at Nayan, this is all we do by capturing road video data and then analysing them to generate more relevant data points. But to be able to generate  tons of data is not an issue, processing them and getting prominent patterns and key insight is. This can be achieved by using some analysis tools
present out there in the wild. Today we will be discussing one such tool, Google Analytics for android via Firebase.


## Why to use google analytics for your android applications?

Google Analytics is an analytics tool that can be used to provide insight on app usage and user engagement. **It is free and provide developers with unlimited reporting solution for up to 500 distinct events**. These events can be defined easily by using Firebase SDK.

The analytical report generated by it not only helps developer understand that how user are interacting with there application but also provide key pointers to consider which enables them
To make informed decisions regarding application marketing and performance optimization. So without any futher delay, we can start integrating google analytics for android application.

## Prerequisite

1. Sample android project
2. Android Emulator or Android test device
3. Firebase Project

## Adding Firebase Dependencies 

``` app/build.gradle
// Add this to app level build.gradle file
dependencies {
    ...
    // Firebase analytics dependency
    implementation 'com.google.firebase:firebase-analytics:17.6.0'
}
```

And that’s it. This is the only thing you need to do to set up Google analytics for an android application. In some time you should be able to see system events, error and crash logs as well. 

Check out the complete list of automatically generated events [here](https://support.google.com/firebase/answer/6317486).

## Defining custom events and user properties for logging

You can also define your own analytics metrics which are called as User properties. In order to do so, you need to create an object of Firebase Analytics.


```
    FirebaseAnalytics  firebaseAnalytics = FirebaseAnalytics.getInstance(this);
```

After you have created an instance of firebaseAnalytics, you can begin logging events with the **logEvent** Method.

```
    val eventInfo = Bundle()
    eventInfo.putString(FirebaseAnalytics.Param.LOCATION, address)
    firebaseAnalytics.logEvent(FirebaseAnalytics.Event.APP_OPEN, eventInfo) 
```

Check out the list of recommended events for android application [here](https://support.google.com/firebase/answer/6317498?hl=en&ref_topic=6317484).

As you can see that it is very easy to integrate google analytics in your android application and to log information specific to your use case. We believe that all of this additional data will
Help you develop more awesome applications and guide you making the right decision for your users. Happy coding.

## References:-

1. Read more about [Firebase Analytics](https://firebase.google.com/docs/analytics/get-started?platform=android)

## Some good reads you may like:-

1. Read here to know about [Dynamic feature deployment in android](https://nayan.co/blog/Android/Dynamic-feature-deployment-in-android/)

2. Setup CI/CD Pipeline for [tomcat automation using Jeknins](https://nayan.co/blog/JAVA/How-to-setup-jenkins-CI-CD-pipeline-with-apache-tomcat/)
