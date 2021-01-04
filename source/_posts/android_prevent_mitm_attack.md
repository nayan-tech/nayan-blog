---
title: Ssl pining in android to avoid MITM attack 
date: 2020-12-26 10:00:00
author: Puneet
categories : 
- ["Android"]
tags:
  - Security
  - Android
  - MITM
  - Frontend
  - NAYAN
  - AppDevelopment
  - Puneet
  - NAYANINDIA
---

![Prevent your apps from MITM attacks](/blog/Android/android_prevent_mitm_attack/hacker.jpg)

**Man in the middle or MITM attack happens when a third party places itself between a connection.** 

Let’s understand it with the context of an example.  Consider that you are at a mall and connect to the internet via public wifi service provided there. You as a client are trying to connect to [Nayan.co](https://nayan.co) to checkout latest stats of the road violation caught by Nayan on a public wifi.  You think that you have established a secure connection with Nayan server. But in reality a hacker is able to view all requests and modify them before relaying it to the host server. That is why it is called Man in the middle attack.

## How to prevent MITM from happening?

Use **ssl which encrypts transmitted data** so that any third party or hacker can’t eavesdrop and modify request. Only the client and server can understand data which is transmitted over an ssl connection. One who tries to intercept data won’t be able to decrypt it and will only see gibberish. **To go even further you can add ssl pinning technique to validate remote hosts.** If not implemented then applications trust custom certificates and allow proxy tools to intercept traffic.

## What is Ssl Pinning?

**Ssl pinning is a process of associating a host  with a ssl certificate or a public key.** This ensures that the application trusts only valid and pre-defined certificates or public keys. It is recommended to use ssl pinning as an additional security layer for apps which ensures that connection is made between right parties.

## How to implement Ssl Pinning?

In this article we will see how to implement ssl pinning using OkHttp. It is very easy to implement, **only requires to create an instance of CertificatePinner** using a builder with its corresponding fingerprint. **We can either hard code fingerprints into the application or inject them into the build process using the buildConfigField method.**

```kotlin
val certificatePinner = CertificatePinner.Builder()
    .add(
        "www.nayan.co",
        "sha256/ZCOF65ADBWPDK8P2V7+mqodtvbsTRR/D74FCU+CEEA="
    )
    .build()
```

After that you need to **provide this newly created CertificatePinner instance in OkHttpClientBuilder**.

```kotlin
val okHttpClient = OkHttpClient.Builder()
    .certificatePinner(certificatePinner)
    .build()
```
You can add multiple fingerprints for different domains. But the question raises which certificate to pin from the chain of trust of SSL Certificate Chain. A Certificate Chain is an ordered list of certificates, containing an SSL Certificate and Certificate Authority (CA) Certificates which enable the receiver to verify that the sender and all CA’s are trustworthy. 

Without Ssl certificate pinning, an application will accepts any certificate which matches the requested hostname and is issued by any trusted CA. There is a good possibility that one of trusted CA might get successfully attacked. Hence you should consider this technique.


## References:-

1. Read more about [Ssl Security](https://developer.android.com/training/articles/security-ssl)

## Some good reads you may like:-

1. Read here to know about [Dynamic feature deployment in android](https://nayan.co/blog/Android/Dynamic-feature-deployment-in-android/)

2. How to add [Firebase Analytics in an Android application](https://nayan.co/blog/Android/firebase_crashlytics/)
