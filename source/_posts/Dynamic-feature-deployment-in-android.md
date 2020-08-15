---
title: Quick guide for dynamic feature delivery using android application bundle 
date: 2020-08-12 10:00:00
author: Puneet
categories:
  - ["Android"]
tags:
  - android
  - kotlin
  - JAVA
  - Android Architecture
  - App Bundle
  - Dynamic Feature
  - Puneet
---

With Google Play’s Dynamic Delivery, your app can download dynamic feature modules on demand to devices running Android 5.0 (API level 21) and higher. This helps reducing initial apk size that user need to down first time.

It has been observed that not all user uses all features of an mobile application. Hence this make sense that only the bare minimum functional feature to be present in initial apk which can be described as core funcitionality of your application.

**Note : For every 6 MB increase to an apk size, it has been observed that install rate deduces by 1 %.**

Considering this, we should use dynamic feature delivery aproach to reduce initial apk size, and if need those features can be downloaded on demand.

![Dynamic Feature Module](/blog/Android/Dynamic-feature-deployment-in-android/dynamic_feature_module_base_image.png)

Initially, the Google Play Store pushes only the code and resources needed for base module to the device, which is **app** module. For the rest of the modules, Your app simply needs to call APIs in the Play Core Library to download and install those modules as required, on demand for your Android Apps.

## Why you should be considering this?

The benefit of split APKs is the ability to break up a monolithic APK—that is, an APK that includes code and resources for all features and device configurations your app supports—into smaller, discrete packages that are installed on a user’s device as required.

## Getting started

In an order to implement dyanmic feature delivery, you might need to update your application structure to extract out code of an existing feature. 

If you are setting up a new project then, you can start right away.

Add below mentioned dependency in **app/build.gradle** file

```groovy
// app/build.gradle
implementation 'com.google.android.play:core:1.8.0'
```

Create a new **dynamic feature module** from menu. Let's name it **New_Feature**.

This **"New Feature"** just like your **"app module"** containing activities, resources and other library in it's **build.gradle** file. The only different is, it uses "dynamic feature as plugin" and has **"app"** as module dependency. Meaning it inherits everything from **app module**.

```groovy
// New_Feature/build.gradle
apply plugin: 'com.android.dynamic-feature'

dependencies {
    implementation project(':app')

    ...
}
```

Before you try to open up any activity or try to call any utility function or code from **New_Feature**, you need download by executing below mentioned code from calling calling activity.


```java

private void installNew_FeatureModule(String className) {
 // Get a reference to Split APK Install Manager
    splitInstallManager = SplitInstallManagerFactory.create(App.getInstance());
 
 // Code to download New_Feature on demand
    SplitInstallRequest request = SplitInstallRequest.newBuilder()
            .addModule("New_Feature")
            .build();
    splitInstallManager.startInstall(request)
            .addOnSuccessListener(integer -> {
                  Toast.makeText(DashboardActivity.this,
                            "New Feature installed",Toast.LENGTH_SHORT).show();
             })
            .addOnFailureListener(e -> {
                    Toast.makeText(DashboardActivity.this,
                            "unable to download New feature",Toast.LENGTH_SHORT).show();
            });
}
```

To launch any activity from **New_Feature**, need to pass full class name prefixed with package name like

**com.example.New_Feature.TestActivity**

```java
// Launching Test activity of New Feature module from App module
private void launchTestActivity() {
       Intent i = new Intent();
       i.setClassName(BuildConfig.APPLICATION_ID, "com.example.New_Feature.TestActivity");
       startActivity(i);
}
```

## Conclusion 

As you can see, implementing dynamic feature for a new project is quiet easy and simple. You should try it out for your next project. Also If you want to try out for one of your existing projects, you can but there is an effort involved in decoupling of your features.

## References:-

1. Read more about [Dynamic Delivery](https://developer.android.com/guide/playcore/dynamic-delivery)

2. Learn how to [restructure](https://developer.android.com/guide/app-bundle/dynamic-delivery#create_dynamic_feature) your project for dynamic delivery 

## Some good reads you may like:-

1. Read here to know more about [Android Testing Strategy](http://blog.nayan.co/Android/Android-Testing-Strategy/)

2. Checkout To integrate [Paytm Gateway Integration](http://blog.nayan.co/Android/sharing-modules-across-android-apps/)
