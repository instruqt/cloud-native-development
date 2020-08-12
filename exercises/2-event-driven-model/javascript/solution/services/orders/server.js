const amqp = require('amqplib')
const express = require('express')
const app = express()
app.use(express.json())
const port = 3001

const amqpUrl = 'amqp://localhost'

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

async function connectToRabbitMq() {
    let connection = await amqp.connect(amqpUrl);
    return connection.createConfirmChannel();
}

const controller = {
    placeOrder: async function(req, res) {
        let channel = await connectToRabbitMq()

        // publish the data to Rabbit MQ
        let { orderId, customerId, products } = req.body;
        await publishToChannel(channel, {
            routingKey: "order_placed",
            data: { orderId, customerId, products }
        });
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