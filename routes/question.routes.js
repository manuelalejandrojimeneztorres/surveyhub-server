module.exports = app => {
    const questions = require('../controllers/question.controller.js');
    const auth = require('../controllers/auth.controller.js');

    var router = require('express').Router();

    // Create a new Question
    router.post('/', auth.isAuthenticated, questions.create);

    // Retrieve all Question
    router.get('/', auth.isAuthenticated, questions.findAll);

    // Retrieve a single Question with id
    router.get('/:id', auth.isAuthenticated, questions.findOne);

    // Retrieve all Question equals an id
    router.get('/surveys/:id/questions', auth.isAuthenticated, questions.findAllBySurveyId);

    // Retrieve all Question equals an id
    router.get('/question-types/:id/questions', auth.isAuthenticated, questions.findAllByQuestionTypeId);

    // Update a Question with id
    router.put('/:id', auth.isAuthenticated, questions.update);

    // Delete a Question with id
    router.delete('/:id', auth.isAuthenticated, questions.delete);

    app.use('/api/v1/questions', router);
};
