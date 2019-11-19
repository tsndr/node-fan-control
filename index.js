const express = require('express')
const cors = require('cors')
const app = express()

// Enable cors
app.use(cors())

// Enable JSON body parsing
app.use(express.json())

app.use(express.static('public'))
app.use('/api/v1/fan', require('./routes/fan'))
app.use('/api/v1/temp', require('./routes/temp'))

// const Fan = require('./model/Fan')
// const fan = new Fan

// console.log(fan.getSpeed(2))
// fan.setPwm(2, 90)

server = app.listen(8000)

function shutdown() {
    server.close()
    process.exit()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)