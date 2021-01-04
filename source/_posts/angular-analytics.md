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

In 2018, Google Tag Manager (GTM) became the recommended way to integrate Google Analytics (GA) into the site. Here's how to add a new Tag Manager SDK to your Angular app to track standard page views.

## Guessing and setting

This tutorial assumes that you already have a router installed and configured. We will be relying on it to find the right tracking events.

1. Set Analytics Asset & Get tracking ID
   This is not a mathematical study, but it is easy to visit [analytics.google.com] (https://analytics.google.com/analytics/web/provision/#/provision) and build a new mathematical asset. The most important thing you will need is the tracking ID it gives you.

2. Install the GTM
   Copy and paste the tracking code at the beginning of your `head` tag to your index.html. It should look like something like this, but be sure to replace it with `MY_TAG` with something that looks like` UA-23639210-1`.
   ```
   <! - Global Site Marker (gtag.js) - Google Analytics ->
   <script async src = "https://www.googletagmanager.com/gtag/js?id=MY_TAG"> </script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag () {dataLayer.push (argument);}
     gtag ('js', new day ());
   </script>
   ```

Also note that we have deleted one line. This line was intended to deliver the first load of the page, but we will allow our route to do so.

Delete this Line:
`gtag ('setup', 'MY_TAG);`

3. Track Router NavigationEnd Events
   We need to notify GA whenever a user performs client side roaming. This will happen in page loading, and at any end of the navigation event. This will ignore the middle pages and redirect, as well as security features that could block the page from being found.

We need to do this somehow once in our app, so I always put this code in my root section `app.component.ts`.

Let's add a tool from RxJS to find just the events we care about. I will allow VSCode to add another import we will need (`Router` if you do not have,` NavigationEnd` from the router again).
`import {filter} from 'rxjs / operator';`

Below the import statements, let us know the typing system will use the GTM-registered land variables.
`call var gtag`

Now let's follow the events and notify GA for each event the user has saved the URL.

```
builder (route: Router) {
const navEndEvent $ = router.events.pipe (
filter (e => e instanceof NavigationEnd)
);
navEndEvent $ .subscribe ((e: NavigationEnd) => {
gtag ('config', 'MY_ID', {'page_path': e.urlAfterRedirects});
});

}
```

![Dev tools](/blog/Web/angular-analytics/image_1.png)

## Bonus Step - Variable Tracking IDs are based on natural variables

Maybe you want to follow your development environment differently in your production environment? To do this we need to change the way we import GTM.

Let's leave some setup in our `index.html`.

```
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag () {dataLayer.push (argument);}
  gtag ('js', new day ());
</script>
```

Some are removed from our `app.component.ts` builder. Here we are injecting it vigorously with evolution from `nature.ts` and` nature.prod.ts`
`script = document.createElement ('script'); script.async = true; script.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.code; document.head.prepend (script);`

For this code to work, we need to install `code` properties and import our native file. In the `en eniononment.ts` file for each of our locations, we add:
`code: 'MY_TRACKING_ID'`

Feel free to name a variable that makes sense and does not conflict with your other configurations.

## References:-

1. [Google Analytics](https://analytics.google.com/analytics/web/provision/?hl=en#/provision)
2. [Google Dev docs](https://developers.google.com/analytics)

## Some good reads you may like:-

1. [Angular Youtube integration](https://nayan.co/blog/Web/angular-youtube/)
2. [Angular maps and clusters](https://nayan.co/blog/Web/angular-maps/)
