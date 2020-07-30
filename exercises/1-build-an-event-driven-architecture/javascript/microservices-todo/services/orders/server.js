const express = require('express')
const app = express()
const port = 3001

// load order data
const orders = require('../../data/orders.json')

// define controller
const controller = {
    getOrders: function(req, res) {
        /**
         * TODO: implement controller for getting all orders of a customer
         * Given:
         * - Order data which you can read from `../data/orders.json`
         * - A request that contains an ID that identifies a customer using `req.query.customerId`
         *
         * Expected return result:
         * - list of customer orders (JSON)
         * - empty list if no orders exists for customer
         *
         * More information:
         * - http://expressjs.com/en/api.html#req
         * - http://expressjs.com/en/api.html#res
         */
    }
}

// setup routes
const routes = function(app) {
    app.route('/orders')
       .get(controller.getOrders)
}
routes(app)

// start server
app.listen(port, function() {
   console.log('Server started on port: ' + port)
})