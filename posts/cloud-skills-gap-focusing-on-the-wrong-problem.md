There have been a [couple](https://cloudpundit.com/2022/09/12/cloud-adoption-will-fail-because-of-the-skills-gap/) [recent](https://www.jeremydaly.com/lets-talk-about-the-cloud-skills-gap/) posts that I've read about the cloud skills gap including some conversations on Twitter that I think are focusing on the wrong problem.

It's not that I'm saying there _isn't_ a cloud skills gap - there likely is. It's that we _don't_ need to solve this issue by skilling up more devs to understand how to wrangle AWS and GCP with [Terraform](https://www.terraform.io/) or worse - _Cloudformation_. Developers need better solutions.

The big cloud providers today are all about providing the "plumbing" for cloud services - not "platforms." I think the focus should be on building amazing platforms out of these lower level cloud services. We call it "infrastructure" in the industry because that's a good comparison.

## Plumbing

Let's take water - it's pumps and pipes and water treatment and water towers. Now let's say you're [opening a coffee shop like my friend Greg](https://www.intothevoidjc.com/) - you need water...damn good water. You live in society so you don't find a water source, treat it all yourself then build the pipes and pumps to get the water to your building. You just use the city water supply. You probably should add a an on-site reverse osmosis system, but you are not digging a well.

This is where we're at with cloud services and the skills gap, but some of these takes are thinking about it wrong. We don't need training programs for the 700 services that AWS has or more people to deeply understand exactly how Kubernetes networking and service meshes work. We need better **platforms**.

## Platforms

Platforms are like a functioning water system, or a reliable electrical grid. They should combine many components together at a lower level that 99% of the population do not need to know exist. This is the same for cloud services and software.

Platforms must combine cloud services across cloud providers to build systems that are easy to use and where people can just focus on building something. They can focus their expertise on making damn good cup of coffee and not hire expert plumbers. Platforms are abstraction layers.

The major difference in this metaphor is that plumbing exists in the physical world and you cannot automate some pipes with some terraform and use an auto-scaler. That would be awesome though.

This is what is at the core of [Inngest](https://www.inngest.com) - _it's a platform_ - not plumbing. It's meant to stitch together many individually simple components into a seamless platform so you can focus on building amazing products for your customers. The core of Inngest is [open source](https://github.com/inngest/inngest) and we've designed Inngest to be able to run on different underlying cloud infra. This means it can run on your own laptop, in your own cloud, but it also means that we can build a flexible scalable platform that abstracts the pain of creating your own system end-to-end.

## Trends

I recently spoke to an engineer who said a goal of their technical strategy is to use "cloud-source" technology. They explained this to mean - use 'SaaS' wherever possible, if not, use managed services. The company's CTO understands that their competitive advantage on their product (which helps sports coaches and athletes) is not going to be on their infrastructure team - it's going to be with how they can ship something that helps coaches and athletes learn and develop.

Some people will leave a comment on Hacker News about vendor lock in, only using open sourced software, or needing to fully control their services down to the bare metal. Fine. Good. You do you. And while you do, someone else is going to innovate you out of business because they focused on what sets their business apart.

Cloud services gap. Sure. But "gap" implies the difference between supply and demand for those skills. I think this misses the higher order questions where the demand comes from - the demand is there because businesses need to serve their customers efficiently. It's not because their business is going to make it or break it based on how awesome the k8s cluster autoscaling works. The demand for products, APIs and software from businesses will increase and we cannot and shot not try to scale the industry linearly by proportionally growing the number of cloud infra engineers with JavaScript engineers.

We need better solutions for businesses, small and large. We need better platforms, not more AWS cloud engineers.
