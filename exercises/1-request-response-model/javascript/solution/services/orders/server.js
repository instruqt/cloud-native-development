const express = require('express')
const app = express()
const port = 3001

const orders = require('../../data/orders.json')

const controller = {
    getOrders: function(req, res) {
        const customerOrders = orders.filter(o => o.customerId == req.query.customerId)
        return res.json(customerOrders)
    }
}

const routes = function(app) {
    app.route('/orders')
       .get(controller.getOrders)
}
routes(app)

app.listen(port, function() {
   console.log('Server started on port: ' + port)
})