let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

let QuizService = require('./services/quiz_service');

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/quizzes', function (req, res) {
  QuizService.listQuizzes((err, rows) => {
    res.send(JSON.stringify(rows.map(r => ({id: r.id, title: r.title}))));
  });
});

app.get('/quiz/:id', function (req, res) {
  QuizService.getQuiz(req.params.id, (err, row) => {
    res.send(JSON.stringify({id: row.id, title: row.title}));
  });
});


io.on('connection', socket => {
  console.log('User connected.');
  io.emit('user-joined');

  socket.on('disconnect', () => {
    console.log('User disconnected');
    io.emit('user-disconnected');
  });


  socket.on('change-question', (questionId) => {
    io.emit('change-question', {questionId: questionId});
  });

});


server.listen(8081, () => {
   let host = server.address().address
   let port = server.address().port
   
   console.log("Daisy app listening at http://%s:%s", host, port)
})
