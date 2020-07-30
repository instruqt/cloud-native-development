const express = require('express')
const app = express()
const port = 3002

const controller = {
    getCustomer: function(req, res) {
        /**
         * TODO: implement controller for getting a customer
         * Given:
         * - Customer data which you can read from `../data/customers.json`
         * - A request that contains an ID that identifies a customer using `req.params.id`
         *
         * Expected return result:
         * - a customer object (JSON) when a customer exists
         * - a 404 response with body "Customer not found" when a customer does not exist
         *
         * More information:
         * - http://expressjs.com/en/api.html#req
         * - http://expressjs.com/en/api.html#res
         */
    }
}

const routes = function(app) {
    app.route('/customers/:id')
       .get(controller.getCustomer)
}
routes(app)

app.listen(port, function() {
   console.log('Server started on port: ' + port)
})