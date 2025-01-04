module.exports = app => {
    const questionOptions = require('../controllers/questionoption.controller.js');
    const auth = require('../controllers/auth.controller.js');

    var router = require('express').Router();

    // Create a new QuestionOption
    router.post('/', auth.isAuthenticated, questionOptions.create);

    // Retrieve all QuestionOption
    router.get('/', auth.isAuthenticated, questionOptions.findAll);

    // Retrieve a single QuestionOption with id
    router.get('/:id', auth.isAuthenticated, questionOptions.findOne);

    // Retrieve all QuestionOption equals an id
    router.get('/questions/:id/question-options', auth.isAuthenticated, questionOptions.findByQuestionId);

    // Update a QuestionOption with id
    router.put('/:id', auth.isAuthenticated, questionOptions.update);

    // Delete a QuestionOption with id
    router.delete('/:id', auth.isAuthenticated, questionOptions.delete);

    app.use('/api/v1/question-options', router);
};
