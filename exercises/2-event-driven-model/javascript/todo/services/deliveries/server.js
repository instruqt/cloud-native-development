const amqp = require('amqplib')
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


// Note: This function is obviously fake, and here only for demonstration purposes.
// You can imagine here some connections with internal/external systems that take a couple of seconds to process.
function processOrder(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Processing data for order ${data.orderId}`)
            resolve()
        })
    })
}

async function consumeOrderPlacedEvents({ connection, receivingChannel, sendingChannel}) {
    return new Promise((resolve, reject) => {
        receivingChannel.consume("order_placed", async function (msg) {
            /**
             * TODO: Implement consumption of `order_placed` and production of `order_processed` events
             *
             * Steps:
             * 1. Parse message content
             * 2. Process order with `processOrder` function
             * 3. Publish `order_processed` event that contains a JSON payload with `orderId` attribute
             *    (e.g. "{orderId:1}") by using the `publishToChannel` method.
             * 4. Acknowledge the `order_placed` event is processed
             *
             * More information:
             * - AMQP library API: http://www.squaremobius.net/amqp.node/channel_api.html
             *
             */
        })

        // handle closing of connection
        connection.on("close", err => {
            return reject(err)
        })

        // handle errors
        connection.on("error", err => {
            return reject(err)
        })
    })
}

async function listenForMessages() {
    // connect to RabbitMQ
    let connection = await amqp.connect(amqpUrl)

    // create a channel through which we'll consume `order_placed` events, and prefetch one message at a time
    let consumeChannel = await connection.createChannel()
    await consumeChannel.prefetch(1)

    // create a channel through which we'll produce `order_processed` events
    let produceChannel = await connection.createConfirmChannel()

    // start consuming messages
    await consumeOrderPlacedEvents({ connection, receivingChannel: consumeChannel, sendingChannel: produceChannel })
}

listenForMessages();