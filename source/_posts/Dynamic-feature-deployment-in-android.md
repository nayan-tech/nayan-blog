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

With Google Play’s Dynamic Delivery, your app can download dynamic feature modules on demand to devices running Android 5.0 (API level 21) and higher. 

![Dynamic Feature Module](/blog/Android/Dynamic-feature-deployment-in-android/dynamic_feature_module_base_image.png)

Your app simply needs to call APIs in the Play Core Library to download and install those modules as required, and the Google Play Store pushes only the code and resources needed for that module to the device. You can also use this API to download on demand modules for your Android Instant Apps.

## Why you should be considering this?

The benefit of split APKs is the ability to break up a monolithic APK—that is, an APK that includes code and resources for all features and device configurations your app supports—into smaller, discrete packages that are installed on a user’s device as required.

## Getting started

In an order to implement dyanmic feature delivery, you might need to update your application structure to extract out code of an existing feature. 

If you are setup a new project then, you can start right away.

Add below mentioned dependency in **app/build.gradle** file

```groovy
implementation 'com.google.android.play:core:1.8.0'
```

Create a new **dynamic feature module** from menu. Let's name it New_Feature.

```java
 splitInstallManager = SplitInstallManagerFactory.create(App.getInstance());
```

```java
   private void installRegistrationModule(String className) {
        SplitInstallRequest request = SplitInstallRequest.newBuilder()
                .addModule("New_Feature")
                .build();

        splitInstallManager.startInstall(request)
                .addOnSuccessListener(integer -> {
                    Intent i = new Intent();
                    i.setClassName(BuildConfig.APPLICATION_ID, className);
                    startActivity(i);
                })
                .addOnFailureListener(e -> {
                    Toast.makeText(DashboardActivity.this,
                            "unable to get dynamic feature",Toast.LENGTH_SHORT).show();
                });
    }
```

## References:-

1. Read more about [Dynamic Delivery](https://developer.android.com/guide/playcore/dynamic-delivery)

2. Learn how to [restructure](https://developer.android.com/guide/app-bundle/dynamic-delivery#create_dynamic_feature) your project for dynamic delivery 

## Some good reads you may like:-

1. Read here to know more about [Android Testing Strategy](http://blog.nayan.co/Android/Android-Testing-Strategy/)

2. Checkout To integrate [Paytm Gateway Integration](http://blog.nayan.co/Android/sharing-modules-across-android-apps/)
