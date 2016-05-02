So you want to make your side project more secure by moving it to https, but you
don't want to pony up the money for a certificate and don't know how to set it
up? If you're running your project on AWS Elastic Beanstalk like I am, there is
hope, here's a guide to get your site running on https in no time.

- ACM + your domain w/ email verification
- Make sure you're running elastic load balancer
- Beanstalk listener extension
- Add http to https redirect
