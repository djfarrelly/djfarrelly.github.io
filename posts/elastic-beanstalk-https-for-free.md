<img src="/images/posts/https.jpg" class="img-med" alt="Timezone.io now on https" />

These days, everything we build as developers should be served securely. There are several
reasons why you likely want to be serving your site securely and many users today expect it.

- You're authenticating users
- Your users are passing sensitive data across the wire
- You want to protect your users from man-in-the-middle attacks
- You want to use
[modern JavaScript APIs](https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only)

You can go out there and buy a SSL certificate if you'd like or if you're bootstrapping your side
project and want to secure users while saving your money there are free alternatives.
[Let's Encrypt](https://letsencrypt.org/) is an amazing project that allows you to obtain a free
cert, but there's a bit of configuration and scripting up of renewals if you'd like to do it right.
If your app is running on AWS, you can now use
[AWS Certificate Manager](https://aws.amazon.com/certificate-manager/) to request a certificate
is super simple and you can add to to your server or elastic load balancer with relative ease.

## AWS Certificate Manager + Elastic Beanstalk

Let's say you're running your app using Elastic beanstalk, here's an outline of the steps you
need to take to get up and running:

### Verify your domain with ACM

In your AWS console, head over to Certificate Manager and "Request a new Certificate." Here you
can add your domain and subdomains. For example, I'm serving my size without the www, and may want
to add a subdomain soon, so I chose:

```
timezone.io
*.timezone.io
```

Now for this to work, you'll need to be able to
[verify your domain by email](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-validate.html),
meaning you'll have to be able to access one of the contact emails in WHOIS or one of the following
emails at your domain: `admin@ administrator@ hostmaster@ postmaster@ webmaster@`.

### Run your app behind a load balancer

### Add the listener .ebextension

### Add the http to https redirect
