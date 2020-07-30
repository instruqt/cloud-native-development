# Introduction
Welcome! The following exercises will help you become familiar with developing 
event-driven architecutres. But before do things event-driven, we first want to
take a look at the traditional way of doing things: the request/response model.

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

# Webshop
Our webshop:
- Conceptually, we have orders, customers, and a dashboard.
- We have data about customers.
- Customers have made orders, and we have this data too.
- The dashboard displays the amount of orders a customer has made.

# Project structure
The project structure is very simple:
- `data/`: contains data the different services use
- `services/`: code of independent (micro)services
  - `services/customers`: Customers service. Showing who customers are.
  - `services/orders`: Orders service. Showing orders a customer has made.
  - `services/dashboard`: Dashboard service. Aggregating data from services Customers and 
  Orders to show the name of the customer and the amount of orders that 
  have been made.

# Where to start?
Navigate to each service folder and then install the dependencies of that service:
`npm install`.

Next, open up the following files and read the TODOs:
- `services/customers/server.js`
- `services/orders/server.js`
- `services/dashboard/server.js`

To start a service, you can just simply run the following command (from the service folder):
 `npm start`.