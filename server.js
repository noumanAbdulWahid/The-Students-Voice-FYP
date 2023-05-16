const express = require('express');
const connect = require('./configs/db');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRouter');
const profileRoutes = require('./routes/profileRouter');
// const commentRoutes = require('./routes/commentRouter');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

// mongoDB conection
connect();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
  });

// Set up the Socket.IO server
io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('message', (message)=>{
    console.log('messs',message);
    socket.emit('allmessage', message)
  })


  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});


app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', profileRoutes);
// app.use('/', commentRoutes);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "/student_voice_react/build/")))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'student_voice_react', 'build', 'index.html'))
  })
}

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = io;





















// const io = require('socket.io')(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true
//   }
// });


// io.on('connection', (socket) => {
//   console.log(`Socket ${socket.id} connected`);
//   socket.on("comment",(data)=>{
//     console.log(data);
//     socket.emit('data', data)
//   })

//   socket.on('disconnect', () => {
//     console.log(`Socket ${socket.id} disconnected`);
//   });
// });



// socket.on("comment",(data)=>{
  //   console.log(data);
  //   socket.emit('data', data)
  // })

  // socket.on('joinPostRoom', (postId) => {
  //   socket.join(postId.toString());
  // });

  // socket.on('leavePostRoom', (postId) => {
  //   socket.leave(postId.toString());
  // });

  // socket.on('commentAdded', async (comment) => {
  //   const result = await commentControllers.handleComments(null, null, io)(comment);
  //   console.log('Comment result:', result);
  //   console.log(comment);
  // });