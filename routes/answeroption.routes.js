module.exports = app => {
    const answerOptions = require('../controllers/answeroption.controller.js');
    const auth = require('../controllers/auth.controller.js');

    var router = require('express').Router();

    // Create a new AnswerOption
    router.post('/', auth.isAuthenticated, answerOptions.create);

    // Retrieve all AnswerOption
    router.get('/', auth.isAuthenticated, answerOptions.findAll);

    // Retrieve all AnswerOption equals an id
    router.get('/answers/:id', auth.isAuthenticated, answerOptions.findByAnswerId);

    // Retrieve all AnswerOption equals an id
    router.get('/question-options/:id', auth.isAuthenticated, answerOptions.findByQuestionOptionId);

    // Retrieve a single AnswerOption with id
    router.get('/:id', auth.isAuthenticated, answerOptions.findOne);

    // Update a AnswerOption with id
    router.put('/:id', auth.isAuthenticated, answerOptions.update);

    // Delete a AnswerOption with id
    router.delete('/:id', auth.isAuthenticated, answerOptions.delete);

    app.use('/api/v1/answer-options', router);
};
