var express = require('express');

var app = express();


var QuizService = require('./services/quiz_service');


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

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
