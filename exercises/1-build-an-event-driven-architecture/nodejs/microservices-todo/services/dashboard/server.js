const express = require('express')
const app = express()
const port = 3000
const bent = require('bent')

const controller = {
    getDashboard: async function(req, res) {
        /**
         * TODO: implement controller for showing number of orders a customer has made
         * Given:
         * - Endpoint http://localhost:3001 where the Orders service runs
         * - Endpoint http://localhost:3002 where the Customers service runs
         * - A request that contains an ID that identifies a customer using `req.params.customerId`
         *
         * Expected return result:
         * - The number of orders a customer has made, as text, using exactly the following template:
         *   `${customerName} made ${numberOfOrders} order(s).`
         * - If any service returns a 404: return a 404 response with body "Not found"
         * - If any service is down: return a 503 response with body "Service not available"
         *
         * Notes:
         * - We're using the "bent" library here. You're free to choose any other library (or none if you wish),
         *   as long as the end results are the same. Using a library for making requests is recommended however.
         *
         * More information:
         * - https://github.com/mikeal/bent
         * - http://expressjs.com/en/api.html#req
         * - http://expressjs.com/en/api.html#res
         */
    },
}

const routes = function(app) {
    app.route('/dashboard/:customerId')
       .get(controller.getDashboard)
}
routes(app)

app.listen(port, function() {
   console.log('Server started on port: ' + port)
})