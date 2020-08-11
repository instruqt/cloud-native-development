const amqp = require('amqplib')
const express = require('express')
const app = express()
app.use(express.json())
const port = 3001

const defaultExchange = 'amq.default'
const amqpUrl = 'amqp://localhost'

async function connectToRabbitMq() {
    let connection = await amqp.connect(amqpUrl);
    return connection.createConfirmChannel();
}

async function publishToChannel(channel, { routingKey, exchange, data }) {
    return new Promise((resolve, reject) => {
        const dataBuffer = Buffer.from(JSON.stringify(data), 'utf-8');

        channel.publish(exchange, routingKey, dataBuffer, { persistence: true }, err => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}

const controller = {
    placeOrder: async function(req, res) {
        /**
         * TODO: Implement the placeOrder method
         *
         * This method gets a POST request and should put a message on the `order_placed` queue through
         * the default RabbitMQ exchange.
         *
         * Hint: Use auxiliary methods `connectToRabbitMq` and `publishToChannel`.
         *
         * More information:
         * - ExpressJS API: http://expressjs.com/en/api.html
         * - RabbitMQ CLI: https://www.rabbitmq.com/management-cli.html
         * - AMQP library: https://www.npmjs.com/package/amqplib
         */
        res.send('ok')
    }
}

const routes = function(app) {
    app.route('/orders')
       .post(controller.placeOrder)
}
routes(app)

app.listen(port, function() {
   console.log('Server started on port: ' + port)
})