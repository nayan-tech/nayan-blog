---
title: How to add Firebase Crashlytics in an Android application
date: 2020-10-31 21:50:48
author: Diwakar Singh
category: Android
tags:
- android
- firebase
- kotlin
- crashlytics
- nayan
- Diwakar Singh

---

![Firebase Crashlytics](/blog/Android/firebase_crashlytics/firebase_crashlytics_1.png)

Crashlytics is a Google-owned Boston, Massachusetts-based software company founded in May 2011 by entrepreneurs Wayne Chang and Jeff Seibert. Crashlytics helps collecting, analyzing and organizing app crash reports.

Google has now completely migrated from Fabric to Firebase Crashlytics. If you are still using Fabric SDK and you are not able to see the crash report on Firebase console then you need to do some changes in the app as well.

Before we get into the how to integrate Firebase Crashlytics, first we need to register and configure our app on Firebase.

## Add Firebase Crashlytics to your app

Open top-level build.gradle file and add below classpaths in dependencies

```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.3.4'
        classpath 'com.google.firebase:firebase-crashlytics-gradle:2.3.0'
    }
}

allprojects {
    repositories {
        google()
    }
}
```

Add Firebase Crashlytics plugin to your app-level build.gradle file

```gradle
apply plugin: 'com.google.gms.google-services'
apply plugin: 'com.google.firebase.crashlytics'
```

## Initialize Crashlytics

Add Firebase Crashlytics SDK and Google Analytics SDK (recommended) to your app.

```gradle
dependencies {
    implementation platform('com.google.firebase:firebase-bom:26.0.0')
    implementation 'com.google.firebase:firebase-crashlytics-ktx'
    implementation 'com.google.firebase:firebase-analytics-ktx'
}
```

That’s it! Now run your app now and it is successfully configured with firebase Crashlytics!To check if crashes are being reported or not add below code

```kotlin
throw RuntimeException("Test Crash") // Force a crash
```

![Sample Crashlytics Report](/blog/Android/firebase_crashlytics/firebase_crashlytics_2.png)

## References

1. [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics/get-started?platform=android)

## Some good reads you may like:-

1. [App-Heartbeat](https://nayan.co/blog/Android/App-Heartbeat/)
2. [How to add Lottie Animation in an android application](https://nayan.co/blog/Android/How-to-add-Lottie-Animation-in-an-Android-app/)