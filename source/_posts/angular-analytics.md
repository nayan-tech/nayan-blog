---
title: Google analytics with Tag manager and Angular
date: 2020-10-25 13:14:41
author: Abhishek Rana
category:
  - ["Web"]
tags:
  - Google Analytics
  - SEO
  - Angular
  - Meta tags
  - Monitoring
---

![Google Analytics](/blog/Web/angular-analytics/banner.png)

In 2018, Google Tag Manager (GTM) became the recommended way to integrate Google Analytics (GA) into a site. Here's how to integrate the new Tag Manager SDK into your Angular app to track normal page views.

## Assumptions & Setup
This tutorial assumes you already have the router installed and configured. We'll be relying on it to get the appropriate events for tracking.

1. Setup Analytics Property & Get Tracking ID
This isn't an analytics tutorial, but it's pretty easy to visit [analytics.google.com](https://analytics.google.com/analytics/web/provision/#/provision) and create a new analytics property. The important thing you will need is the tracking ID it gives you.

2. Install GTM
Copy and paste the tracking code into the beginning of your `head` tag in your index.html. It should look something like this, but make sure to replace `MY_TAG` with something that looks like `UA-23639210-1`.
```
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=MY_TAG"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
</script>
```

Also note that we removed one line. This line was responsible for submitting the first page load, but we'll let our router do that.

REMOVE THIS LINE:
`gtag('config', 'MY_TAG);`

3. Track Router NavigationEnd Events
We need to let GA know whenever a user makes a client side navigation. This will happen on page load, as well as on upon any navigation event ending. This will ignore intermediate pages and redirects, as well things like guards that might prevent a page from being accessed.

We need to do this somewhere exactly once in our application, so I always put this code in my root component `app.component.ts`.

Let's add a tool from RxJS to get just the events we care about. I'll let VSCode add the other imports we'll need (`Router` if you don't have it, `NavigationEnd` from router as well).
```
import { filter } from 'rxjs/operators';
```

Below the import statements, let's let the typing system know were going to be using a global variable registered by GTM.
```
declare var gtag
```

Now let's track the events and let GA know for each event the URL that the user has ended up on.
```
constructor(router: Router) {
  const navEndEvent$ = router.events.pipe(
    filter(e => e instanceof NavigationEnd)
  );
  navEndEvent$.subscribe((e: NavigationEnd) => {
    gtag('config', 'MY_ID', {'page_path':e.urlAfterRedirects});
  });

}
```

![Dev Tools](/blog/Web/angular-analytics/image_1.png)

## Bonus Step - Variable Tracking IDs based on environmental variable
Perhaps you want to track your development environment separately from your production environment? To do this we have to tweak the way we import GTM.

Let's leave some of the config setup in our `index.html`.
```
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
</script>
```

The rest is moved to our `app.component.ts` constructor. Here we dynamically inject it via an environmental variable from `environment.ts` and `environment.prod.ts`
```
const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.code;
    document.head.prepend(script);﻿
```

For this code to work, we need to add a `code` property and import our environment file. In the `envioronment.ts` file for each of our environments, we add:
```
code: 'MY_TRACKING_ID'
```

Feel free to name the variable something that makes sense and doesn't conflict with your other configuration.

## References:-
1. [Google Analytics](https://analytics.google.com/analytics/web/provision/?hl=en#/provision)
2. [Google Dev docs](https://developers.google.com/analytics)

## Some good reads you may like:-
1. [Angular Youtube integration](https://nayan.co/blog/Web/angular-youtube/)
2. [Angular maps and clusters](https://nayan.co/blog/Web/angular-maps/)