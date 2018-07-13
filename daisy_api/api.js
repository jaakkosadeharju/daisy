let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let hosts = {};

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/quizzes', function (req, res) {
  QuizService.listQuizzes((err, rows) => {
    res.send(JSON.stringify(rows.map(r => ({ id: r.id, title: r.title }))));
  });
});

app.get('/quiz/:id', function (req, res) {
  QuizService.getQuiz(req.params.id, (err, row) => {
    res.send(JSON.stringify({ id: row.id, title: row.title }));
  });
});

app.get('/quiz_session/clients', (req, res) => {
  res.send(JSON.stringify(io.sockets.adapter.rooms[quizSessionId]));
});

io.on('connection', socket => {
  console.log(`User connected: ${socket.id}`);

  // TODO: Use some secret identifier for host instead of quizId
  socket.on('register-quiz', (quizSessionId, quizId) => {
    
    if (!hosts[quizSessionId] || hosts[quizSessionId]['quizId'] === quizId) {
      hosts[quizSessionId] = {
        quizId: quizId,
        host: socket.id
      }
    }
    else {
      console.log('Error when registering host.')
    }
    console.log(hosts);
  });

  socket.on('join-quiz', ({quizSessionId, nickname}) => {
    console.log(`User ${socket.id}:${nickname} joined to quiz: ${quizSessionId}`);
    socket.join(quizSessionId);
    socket.quizSessionId = quizSessionId;
    socket.nickname = nickname;
    console.log('joined clients so far: ', socket.adapter.rooms[quizSessionId]);
    if (hosts[quizSessionId]) {
      io.to(hosts[quizSessionId]['host']).emit('user-joined', {
        quizSessionId: quizSessionId,
        nickname: nickname,
        clients: socket.adapter.rooms[quizSessionId] || []
      });
    }
  })


  socket.on('disconnect', () => {
    console.log(`User disconnected ${socket.id}`);
    console.log('socket quiz session', socket.quizSessionId);
    if (hosts[socket.quizSessionId]) {
      io.to(hosts[socket.quizSessionId]['host']).emit('user-disconnected', socket.id);
    }
  });


  socket.on('change-question', (quizSessionId, question) => {
    if (hosts[quizSessionId] && hosts[quizSessionId]['host'] === socket.id) {
      io.to(quizSessionId).emit('change-question', { question: question });
    }
  });

  socket.on('answer-question', (optionId) => {
    console.log('question answered');
    if (hosts[socket.quizSessionId]) {
      io.to(hosts[socket.quizSessionId]['host']).emit('answer-question', {optionId, socketId: socket.id});
    }
  });

});


server.listen(8081, () => {
  let host = server.address().address
  let port = server.address().port

  console.log("Daisy app listening at http://%s:%s", host, port)
})
