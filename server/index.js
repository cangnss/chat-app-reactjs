const app = require("express")()
const socket = require("socket.io")

const server = app.listen(4000)

const io = socket(server, {
  cors: {
    methods: ["GET", "POST"]
  }
})

io.on('connection', socket =>
{
  socket.on('chat', ({message, name}) =>
  {
    io.emit('chat', {message, name})
  })
})
