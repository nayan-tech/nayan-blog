---
title: Using Lottie on Android to display dynamic animations in your application.
date: 2020-08-26 18:40:48
author: Diwakar Singh
category: Android
tags:
- android
- lottie
- kotlin
- dynamic
- animation
- Diwakar Singh

---

Lottie is an 'Android', IOS and React Native library that renders After Effects animations in real time, allowing apps to use animations as easily as they use static images.

![Lottie Animation](/blog/Android/How-to-add-Lottie-Animation-in-an-Android-app/image_1.gif)

## Lottie, the future of product animation

- Multi-platform (A single instance that works on all your devices)
- Easy Integration (As simple as embedding an image or video)
- Lightweight (Lighter and leaner than video or animated GIF)
- Interactivity (Add events and dynamic properties to your animations)
- Responsive (Scalable vector animations that adapt to any size)

## Let’s begin

1. Create a new project

![Create New Project In Android Studio](/blog/Android/How-to-add-Lottie-Animation-in-an-Android-app/image_2.jpg)

2. Add the required Lottie animation dependency in the app level build.gradle file:

```
//Lottie Animation
implementation ‘com.airbnb.android:lottie:3.4.0’
```
3. Add animations.json files in assets folder. You can create your own animations using Adobe After Effects, or feel free to use the ones uploaded by other users on: https://lottiefiles.com/

![app/assets](/blog/Android/How-to-add-Lottie-Animation-in-an-Android-app/image_3.jpg)

4. Adding animation to activity_main.xml file:

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:background="@android:color/white"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <com.airbnb.lottie.LottieAnimationView
        android:layout_width="140dp"
        android:layout_height="80dp"
        android:layout_margin="24dp"
        android:background="@drawable/bg_header"
        app:lottie_autoPlay="true"
        app:lottie_fileName="lottie_logo_animation.json"
        app:lottie_loop="true" />

    <com.airbnb.lottie.LottieAnimationView
        android:id="@+id/firstAnimationView"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        app:lottie_autoPlay="true"
        app:lottie_fileName="animation.json"
        app:lottie_loop="true" />

    <com.airbnb.lottie.LottieAnimationView
        android:id="@+id/secondAnimationView"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:visibility="gone"
        app:lottie_autoPlay="true"
        app:lottie_fileName="animation_1.json"
        app:lottie_loop="true" />

    <com.airbnb.lottie.LottieAnimationView
        android:id="@+id/toggle"
        android:layout_width="wrap_content"
        android:layout_height="100dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginBottom="8dp"
        app:lottie_autoPlay="false"
        app:lottie_fileName="toggle_switch.json"
        app:lottie_loop="false"
        app:lottie_speed="1.75" />
</LinearLayout>
```

5. Write the following code in MainActivity.kt

```
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private var isSwitchOn = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        toggle.setOnClickListener {
            changeToggleState()
        }
    }

    private fun changeToggleState() {
        if (isSwitchOn) {
            toggle.setMinAndMaxProgress(0.5f, 1f)
            toggle.playAnimation()
            firstAnimationView.visibility = View.VISIBLE
            secondAnimationView.visibility = View.GONE
        } else {
            toggle.setMinAndMaxProgress(0f, 0.5f)
            toggle.playAnimation()
            secondAnimationView.visibility = View.VISIBLE
            firstAnimationView.visibility = View.GONE
        }
        isSwitchOn = !isSwitchOn
    }
}
```
6. And we are done!

![Lottie Animation](/blog/Android/How-to-add-Lottie-Animation-in-an-Android-app/image_4.gif)

## References

https://airbnb.design/introducing-lottie/
https://airbnb.io/lottie/#/android

## Some good reads you may like:-

1. [App-Heartbeat](https://nayan.co/blog/Android/App-Heartbeat/)
2. [How to apply Proguard in an android application](https://nayan.co/blog/Android/Applying-Proguard-in-an-android-application/)