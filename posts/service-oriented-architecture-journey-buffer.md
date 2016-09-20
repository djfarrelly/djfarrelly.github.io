As [Buffer](https://buffer.com) is well into it’s 6th year of existence, we’ve
evolved a lot as an engineering team. When I joined the team in early 2014, we
were 6 engineers; 4 who worked on our web application and api specifically.
We’re a lot larger now, pushing more code into a single large repo every day.
Over time our workflows have evolved to try to keep the development and
deployment process light, but with team growth in the last year, we’ve outgrown
some of those patterns and practices. It was time to rip the band-aid off and
make a big change.

Buffer is primarily made up of a large php application and a single page web app
application, both in one git repo. Parts of this application runs across 4
environments for the web app, the api, worker environments that run 100s of
various processes and a server to handle miscellaneous cron jobs. Coordinating
merges and deploys at peak times became a bottleneck. Tightly coupled parts of
the application meant that a fatal error somewhere in the code could bring down
a very different part of the application. Things were fragile.

## A different approach

The feeling was building across the team. Our CTO,
[Sunil](https://twitter.com/sunils34), and I started talking seriously about a
re-architecture effort in April of this year. Sharing articles,
[videos](https://www.youtube.com/watch?v=5yK3lx-PQV0), and brainstorming over
Slack culminated when we met in New York in May and laid out some ideas on what
we needed to do. Our journey towards migrating Buffer to a service oriented
architecture was about to start.

The first step was to research how Buffer would run containers in production.
Buffer's development environment had recently been rebuilt to use Docker
containers, so it was a technology more people on the team were starting to be
comfortable with. We evaluated Kubernetes, Mesosphere, and Amazon’s ECS. Our
systems team had experience with ECS, but there were [some
disadvantages](https://railsadventures.wordpress.com/2015/12/06/why-we-chose-kubernetes-over-ecs/).
The Mesosphere DC/OS was pretty slick, but it didn't have everything we wanted.
We happily settled on [Kubernetes](http://kubernetes.io/) to handle our cluster
management and container orchestration needs. Kubernetes’ focus on running
containers, being cloud-provider-agnostic, and most importantly it’s maturity
were some of the many reasons we chose it. A lot more could be written about
this decision, but there are plenty of resources across the web and it's all
about choosing what meets the requirements or desires you have for your system.

## Creating a plan

During out evaluation period, we began to putting together a plan for how to
start transitioning our architecture. Instead of having several engineers start
building services straight away, we wanted to set some solid precedents early
on. Building a few quality services first could act as models for future
services, hopefully encouraging good practices and helping prevent future
fragmentation in our system. Borrowing a concept and name from Sam Newman’s
[_Building
Microservices_](https://www.amazon.com/Building-Microservices-Sam-Newman-ebook/dp/B00T3N7XB4),
we were out to build out first _exemplar_.

A few requirements we decided our exemplar service must have:

- Simple to run and write automated tests with 100% test coverage
- Good documentation
- Simple and quick to access logging
- Automated code linting
- Easy to set up monitoring
- Load testing beyond current production throughput
- Bug tracking
- Dead simple Slack based deploys, ex. `/deploy <service>`

With those goals in mind, we chose our url metadata scraper functionality to be
the first bit of code to extract from our monolith repo. This was a easy service
for us to start with as it was stateless, had a clear, single purpose, and
already had some tests written. Additionally, this was a core piece of our
application so it had to be fast and dependable.

![Some of the data provided by our url metadata scraper](/images/posts/url-metadata.jpg)
_Some of the data provided by our url metadata scraper_

## Project 🍕

Since we were starting to slice up our monolithic repo, we called it Project
Pizza. In weekly sprints we built the service, hitting all of our requirements
along the way. A small team ramped up on all things Kubernetes, learning the
ropes to ensure we’d be confident our cluster could handle production traffic.
Our systems team divided up parts they would own,
[Steven](https://twitter.com/stevenc81) worked on out logging infrastructure,
[Adnan](https://twitter.com/kiriappeee) focused on cluster management and our
deploys and [Eric](https://twitter.com/eric_khun) dug into on monitoring. After
three weeks we started diverting some traffic to our new service. Outside of a
few expected minor hiccups and bug fixes, everything was running smoothly! This
was a major win, but there was still lots left to do.

The team spent the follow few weeks working through lots of fun challenges,
upgrading to Kubernetes 1.3, learning how to troubleshoot downtime and
issues on our services and cluster. We experimented with different
approaches for logging, monitoring and deploying new images into production. The
new services could deployed in under 60 seconds with a single Slack slash
command. Overall, the project was a huge success and the team felt incredibly
empowered by the system had in place.

## What happens next?

As the initial project wrapped, we really had just scratched the surface. How do
we keep the momentum and determine what a service oriented architecture looks
like at Buffer? As a team, we had ramped up on how to build and deploy services,
but there still were many questions.

At this point, we have started deciding our application's [bounded
contexts](http://martinfowler.com/bliki/BoundedContext.html) and we’re
experimenting with new ways that our services will interact with each other.
More engineers on the team have started to ramp up on Kubernetes and Docker and
we’re rolling out new services each week. In the near future we'll work to
extract truly core pieces from our application like user authentication and the
posting of updates (800+k a day) into new services.

So far we've gotten a taste of the benefits when we decouple services and have
lots more to do until all teams at Buffer are joining the party. It’s been an
incredible learning experience for myself and the team so far and I can’t wait
to share more updates and learnings along the way!
