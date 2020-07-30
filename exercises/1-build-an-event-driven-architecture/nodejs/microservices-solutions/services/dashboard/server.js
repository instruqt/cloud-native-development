const express = require('express')
const app = express()
const port = 3000
const bent = require('bent')
const getJSON = bent('json')

const controller = {
    getDashboard: async function(req, res) {
        try {
            const customerId = req.params.customerId
            const ordersResponse = await getJSON(`http://localhost:3001/orders?customerId=${customerId}`)
            const customersResponse = await getJSON(`http://localhost:3002/customers/${customerId}`)

            res.send(`${customersResponse.name} made ${ordersResponse.length} order(s).`)
        } catch (error) {
            if (error.statusCode === 404) {
                res.status(404).send("Not found")
            }
            else {
                console.log("Error on making request to service")
                console.log(error)
                res.status(503).send("Service not available")
            }
        }
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