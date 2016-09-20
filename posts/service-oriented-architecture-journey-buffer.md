As [Buffer](https://buffer.com) is well into into it’s 6th year of existence,
we’ve evolved a lot as an engineering team. In early 2014 when I joined we were
6 engineers, 4 who worked on our web application and api specifically. We’re a
lot larger now pushing a lot more code into our monolithic repo every day. Over
the years our workflows have tried to evolve with new constraints while trying
to keep the development and deployment process light, but with our team growth
in recent months, we’ve quickly outgrown some of our patterns and practices that
did so well for us over the years. It was time to rip the bandaid off and make a
big change.

Buffer is primarily made up of a large php application and a single page web app
application in one repo. We run parts of this application across 4 environments
for our web app, our api, some servers that run 100s of various worker processes
and a server to handle cron jobs. Coordinating merges and deploys at peak times
became a bottleneck and our tightly coupled parts of our application meant that
a fatal error somewhere in the code could bring down a very different part of
our application. Things were fragile.

## A different approach

The feeling was building across the team. Our CTO,
[Sunil](https://twitter.com/sunils34), and I started talking seriously about a
re-architecture effort in April of this year. Sharing articles,
[videos](https://www.youtube.com/watch?v=5yK3lx-PQV0), and brainstorming over
Slack and video culminated when we met in New York in May and laid out some
ideas on what we needed to do. We were about to start our journey towards
migrating Buffer to a service oriented architecture.

That day we dove into research on Kubernetes, Mesosphere, and Amazon’s ECS. We
had been incubating a reimagined containerized development environment built
with Docker so it felt logical to figure out how we can use Docker the way we
wanted to in production. Despite our systems team having used ECS for a bit and
enjoying aspects of Mesosphere, we settled on
[Kubernetes](http://kubernetes.io/) to handle our cluster management and
container orchestration needs. Kubernetes’ focus on running containers, being
cloud-provider-agnostic, and most importantly it’s maturity were some of the
many reasons we chose it. There are plenty of [great
articles](https://railsadventures.wordpress.com/2015/12/06/why-we-chose-kubernetes-over-ecs/)
that compare solutions, but the key was choosing one and moving forward.

## Creating a plan

While evaluating how we would run our containers, we began to put together a
plan for how we would start to transition our architecture. We wanted to start
breaking things apart, but wanted to set some solid precedents early on. Working
out what we needed to have in place and creating a few quality first services
was key as we knew many engineers will look to these for inspiration and
guidance for they build their own services. Borrowing a concept and name from
Sam Newman’s [_Building
Microservices_](https://www.amazon.com/Building-Microservices-Sam-Newman-ebook/dp/B00T3N7XB4),
we were out to build out first Exemplar.

A few things we decided our exemplar service must have:

- Simple to run and write automated tests with 100% test coverage
- Good documentation
- Simple and quick to access logging
- Automated code linting
- Easy to set up monitoring
- Load testing beyond current production throughput
- Bug tracking
- Dead simple Slack based deploys

Now that we had our goals, we chose our webpage metadata scraper functionality
to be the first bit of code we could extract from our monolith repo. This was a
great service for us to start with as it was stateless, had a clear, single
purpose, and already had some tests written. Additionally, this was a core piece
of our application so it had to be fast and dependable.

## Project 🍕

We were starting to slice up our monolithic repo, we called it Project Pizza.
Through weekly sprints we took a few weeks building the service and hitting all
of our requirements. A small team ramped up on all things Kubernetes, learning
the ropes to ensure we’d be confident our cluster could handle production
traffic. Our systems team divided up parts they would own,
[Steven](https://twitter.com/stevenc81) worked on out logging infrastructure,
[Adnan](https://twitter.com/kiriappeee) focused on cluster management and our
deploys and [Eric](https://twitter.com/eric_khun) focused on monitoring. After
three weeks we started diverting some traffic to our new service. Outside of a
few expected minor hiccups and bug fixes, everything was running smoothly! This
was a major win, but there was still lots left to do.

We spent the follow few weeks working through lots of fun challenges, upgrading
to a Kubernetes 1.3 cluster, learning how to troubleshoot downtime and issues on
our services and cluster. Our team experimented with different approaches for
logging, monitoring and deploying new images into production. Our new services
could deployed in under 60 seconds with a single Slack slash command. Overall,
the project was a huge success and we felt incredibly empowered by what we had
in place.

## What happens next?

As our initial project wrapped, now an even harder part started: how do we keep
the momentum and continue to migrate our application to a new architecture? As a
team we had learned how to build and deploy services, but we still had many
questions.

At this point, we have started dividing our application into bounded contexts
and we’re planning and experimenting with new ways that our services will
interact with each other. More engineers on the team have started to ramp up on
Kubernetes and we’re rolling out new services each week.

There are still some fun challenges ahead like extracting truly core pieces from
our application like user authentication and the posting of updates (800+k a
day) to new services. It’s been an incredible learning experience for myself and
the team so far and I can’t wait to share more updates and learnings along our
journey!
