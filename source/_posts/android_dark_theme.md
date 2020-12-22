---
title: How to implement Dark Theme in an Android application
date: 2020-12-22 14:50:48
author: Diwakar Singh
category: Android
tags:
- android
- dark theme
- kotlin
- material design
- nayan
- Diwakar Singh

---

Android 10(API level 29) introduced an exciting new user feature: Dark theme. While support for dark theme is not new to Android, Android 10 introduced a system-level toggle that switches between dark and light themes. That means the theme applies to the system UI as well, not only specific apps.

![Dark Mode](/blog/Android/android_dark_theme/dark_theme_1.png)

It has many benefits:
1. Can reduce power usage by a significant amount (depending on the device’s screen technology).
2. Improves visibility for users with low vision and those who are sensitive to bright light.
3. Makes it easier for anyone to use a device in a low-light environment.


## Let’s begin

### 1. Dependencies

Add the following dependency to your app-level build.gradle file

```gradle
//Material Design
implementation 'com.google.android.material:material:1.2.1'
```

### 2. Declare Themes

Till now we have the parent theme as:

```xml
<style name="Base.AppTheme.MyAppName" parent="Theme.MaterialComponents.DayNight.NoActionBar">
```

Basically, a DayNight theme is composed of a Light theme in the values directory and a Dark theme in the values-night directory.

Create the night resource qualifier under res/values-night/themes.xml

![Night Resource Qualifier](/blog/Android/android_dark_theme/dark_theme_2.png)

values/themes.xml

```xml
<style name="Theme.MaterialComponents.DayNight.NoActionBar.Bridge." parent="Theme.MaterialComponents.Light.NoActionBar.Bridge">
    <item name="colorPrimary">@color/colorPrimary</item>
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="colorAccent">@color/colorAccent</item>
</style>
```

values-night/themes.xml

```xml
<style name="Theme.MaterialComponents.DayNight.NoActionBar.Bridge." parent="Theme.MaterialComponents.NoActionBar.Bridge">
    <item name="colorPrimary">@color/colorPrimary</item>
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="colorAccent">@color/colorAccent</item>
</style>
```

And then, declare your AppTheme:

values/themes.xml

```xml
<style name="AppTheme" parent="Theme.MaterialComponents.DayNight.NoActionBar.Bridge">
    <item name="colorPrimary">@color/colorPrimary</item>
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="colorAccent">@color/colorAccent</item>
</style>
```

values/colors.xml

```xml
<color name="colorPrimary">#fff5f5f5</color>
<color name="colorPrimaryDark">#ff757575</color>
<color name="colorAccent">#ff009688</color>
```

values-night/colors.xml

```xml
<color name="colorPrimary">#ff212121</color>
<color name="colorPrimaryDark">#ff000000</color>
<color name="colorAccent">#ff80cbc4</color>
```

![Light Mode-Dark Mode](/blog/Android/android_dark_theme/dark_theme_3.png)

### 3. Allow users to change the app’s theme

Use the following code in your Activity to change the night mode:

```kotlin
button.setOnClickListener {
   val currentMode = AppCompatDelegate.getDefaultNightMode()
   val newMode =
       if (currentMode == AppCompatDelegate.MODE_NIGHT_YES) {
           AppCompatDelegate.MODE_NIGHT_NO
       } else {
           AppCompatDelegate.MODE_NIGHT_YES
       }
   AppCompatDelegate.setDefaultNightMode(newMode)
}
```

That’s it, run your app and enjoy a dark theme!

## References

1. [Android-Developer Dark Theme](https://developer.android.com/guide/topics/ui/look-and-feel/darktheme)
2. [Material Design](https://material.io/design/color/dark-theme.html)

## Some good reads you may like:-

1. [Firebase Crashlytics](https://nayan.co/blog/Android/firebase_crashlytics/)
2. [How to add Lottie Animation in an android application](https://nayan.co/blog/Android/How-to-add-Lottie-Animation-in-an-Android-app/)