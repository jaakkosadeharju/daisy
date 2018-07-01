var express = require('express');
var app = express();
var QuizService = require('./services/quiz_service');

app.get('/quizzes', function (req, res) {
   res.send(JSON.stringify(QuizService.listQuizzes()));
});

app.get('/quiz/:id', function (req, res) {
  res.send(JSON.stringify(QuizService.getQuiz(req.params.id)));
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})