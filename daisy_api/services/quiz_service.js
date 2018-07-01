module.exports = {
    listQuizzes: function() {
        return [
            { id: 1, title: 'Test Quiz 1' },
            { id: 2, title: 'Test Quiz 2' },
            { id: 3, title: 'Test Quiz 3' },
        ];
    },

    getQuiz: function(id) {
        return this.listQuizzes().find(f => f.id == id);
    }
};
