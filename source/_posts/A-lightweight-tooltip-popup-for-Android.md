---
title: How to add a lightweight Tooltip popup in your Android Application
date: 2020-09-23 13:40:48
author: Diwakar Singh
category: Android
tags:
- android
- tooltip
- kotlin
- nayan
- user interaction
- Diwakar Singh

---

A tooltip is a small descriptive message that appears near a view when users long press the view or hover their mouse over it. This is useful when your app uses an icon to represent an action or piece of information to save space in the layout.
You’ve surely seen tooltips in some of your favorite products—like `Facebook`, `Twitter`, and `Slack`. When used with consideration, tooltips can be a powerful UI [`(User Interaction)`](https://nayan.co/) pattern that will guide your users to take action in your product. A good tooltip can be a great thing indeed.Below, we’ll look at how to design tooltips on Android 8.0 (API level 26) and higher that enhance the user experience and add value.

![Tooltips](/blog/Android/A-lightweight-tooltip-popup-for-Android/tooltip_1.jpg)

A lightweight popup like tooltips, fully customizable with arrow and animations.The [balloon](https://github.com/skydoves/Balloon) is one of the most popular libraries.

## Let’s start

Add below codes to your build.gradle file:

```gradle
dependencies {
    //tooltips
    implementation "com.github.skydoves:balloon:1.2.2"
}
```
Create a balloon instance using kotlin in your activity class


```kotlin
val balloon = Balloon.Builder(baseContext).apply {
    setWidthRatio(0.5f)
    setHeight(65)
    setArrowSize(10)
    setArrowOrientation(ArrowOrientation.BOTTOM)
    setArrowVisible(true)
    setArrowPosition(0.5f)
    setTextSize(15f)
    setCornerRadius(4f)
    setAlpha(0.9f)
    setTextColor(ContextCompat.getColor(baseContext, R.color.white))
    setBalloonAnimation(BalloonAnimation.FADE)
    setLifecycleOwner(this@MainActivity)
    setAutoDismissDuration(5_000L)
}
```

# Specific size

We can set the specific size of the balloon regardless size of the contents.

```kotlin
balloon.setWidth(220)
balloon.setHeight(160)
```
We can also set the width according to the ratio of the horizontal screen’s size.

```kotlin
balloon.setWidthRatio(0.5f)
balloon.setHeight(65)
```
We can control the content size of the balloon using padding of the content.

```kotlin
balloon.setPadding(6)
balloon.setPaddingLeft(8)
balloon.setPaddingTop(12)
```

If the location of the tooltip is located at the boundaries on the screen, the tooltip will be stick to the end of the screen. In that case, we can resolve by giving margins to the balloon.

```kotlin
ballon.setMargin(12)
ballon.setMarginLeft(14)
ballon.setMarginRight(14)
```

# Arrow Composition

We can customize the arrow on the tooltip popup. We can customize the visibility, size, position based on ratio, orientation and drawable.

```kotlin
balloon.setArrowVisible(true)
balloon.setArrowSize(10)
balloon.setArrowPosition(0.8f)
balloon.setArrowOrientation(ArrowOrientation.BOTTOM)
balloon.setArrowDrawable(ContextCompat.getDrawable(context, R.drawable.arrow))
```

# Text Composition

We can customize the text on the tooltip popup.

```kotlin
balloon.setText("Facebook Login")
balloon.setTextSize(15f)
balloon.setTextTypeface(Typeface.BOLD)
balloon.setTextColor(ContextCompat.getColor(context,R.color.white_87))
```

# Listeners (OnBalloonClickListener, OnBalloonDismissListener, OnBalloonOutsideTouchListener)

We can listen to the balloon popup is clicked, dismissed or touched outside using listeners.

```kotlin
balloon.setOnBalloonClickListener(new OnBalloonClickListener() {
  @Override
  public void onBalloonClick() {
    // doSomething;
  }
});

balloon.setOnBalloonDismissListener(new OnBalloonDismissListener() {
  @Override
  public void onBalloonDismiss() {
    // doSomething;
  }
});
balloon.setOnBalloonOutsideTouchListener(new OnBalloonOutsideTouchListener() {
  @Override
  public void onBalloonOutsideTouch() {
    // doSomething;
  }
});
```

And we are done!

![Tooltip](/blog/Android/A-lightweight-tooltip-popup-for-Android/tooltip_3.gif)

## References

1. [Tooltips](https://developer.android.com/guide/topics/ui/tooltips)
2. [Tooltips Docs](https://github.com/skydoves/Balloon)

## Some good reads you may like:-

1. [Lottie Animation](https://nayan.co/blog/Android/How-to-add-Lottie-Animation-in-an-Android-app/)
2. [How to apply Proguard in an android application](https://nayan.co/blog/Android/Applying-Proguard-in-an-android-application/)

p.s. Nayan is a platform that offers high precision services for [traffic monitoring](https://nayan.co/) and [road safety](https://nayan.co/). Check out our [website](https://nayan.co/).