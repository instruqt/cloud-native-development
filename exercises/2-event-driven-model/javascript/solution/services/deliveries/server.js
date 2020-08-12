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
            // parse message
            let data = JSON.parse(msg.content.toString())
            let orderId = data.orderId
            console.log("Received a placed_order event with ID: " + orderId)

            // process order
            console.log(`Processing order ${orderId}`)
            await processOrder(data)

            // publish `order_processed` event
            await publishToChannel(sendingChannel, {
                routingKey: "order_processed",
                data: { orderId }
            })
            console.log(`Order ${orderId} processed.`)

            // acknowledge message as processed successfully
            await receivingChannel.ack(msg);
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