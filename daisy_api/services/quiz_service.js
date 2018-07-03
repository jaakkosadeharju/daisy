var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/daisy.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the daisy database.');
  });

module.exports = {
    listQuizzes: function(callback) {
        let q = `SELECT id, title
            FROM quiz
            ORDER BY id`;

        db.all(q, [], callback)
    },

    getQuiz: function(id, callback) {
        let q = `SELECT id, title
            FROM quiz
            WHERE id = ?`;

        db.get(q, [id], callback);
    }
};
