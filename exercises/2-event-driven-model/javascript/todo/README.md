# Introduction
Welcome! The following exercises will help you become familiar with developing 
event-driven architecutres. In this exercise we're building an event-driven system!

# Developing a new sports webshop
Your company sells sports products. Things like basketballs, t-shirts etc.
The current webshop which was made in the early 2000's was cool back in the days.
However, this has become a big monolithic legacy system no one wants to work with.
Since the sales were starting to drop, it (finally) got the attention of the management.
They decided that the old legacy system must be replaced, so they put you in charge
to investigate how we can do this.

Everybody is talking about microservices, event-driven architectures and the cloud.
You've heard a few things, but are not sure how this exactly works and whether it
can solve your technical problems. You decide to find out.

Before you start, you assure yourself:
"*We're going to develop this baby from scratch!
This time we're going to do it the right way!*"

# Project structure
The project structure is very simple:
- `services/`: code of independent (micro)services
  - `services/orders`: Orders service. We use this service to place orders made by a customer.

# Where to start?
Navigate to the Orders service folder and then install the dependencies of that service:
`npm install`.

Next, open up the following file and read the TODO:
- `services/orders/server.js`

To start a service, you can just simply run the following command (from the service folder):
 `npm start`.