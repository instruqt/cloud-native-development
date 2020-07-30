const express = require('express')
const app = express()
const port = 3002

const customers = require('../../data/customers.json')

const controller = {
    getCustomer: function(req, res) {
        const customerResults = customers.filter(c => c.id == req.params.id)
        return customerResults.length > 0 ? res.json(customerResults[0]) : res.status(404).send("Customer not found")
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