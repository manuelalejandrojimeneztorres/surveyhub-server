module.exports = app => {
    const answers = require('../controllers/answer.controller.js');
    const auth = require('../controllers/auth.controller.js');

    var router = require('express').Router();

    // Create a new Answer
    router.post('/', auth.isAuthenticated, answers.create);

    // Retrieve all Answer
    router.get('/', auth.isAuthenticated, answers.findAll);

    // Retrieve all Answer equals an id
    router.get('/responses/:id', auth.isAuthenticated, answers.findByResponseId);

    // Retrieve all Answer equals an id
    router.get('/questions/:id', auth.isAuthenticated, answers.findByQuestionId);

    // Retrieve a single Answer with id
    router.get('/:id', auth.isAuthenticated, answers.findOne);

    // Update a Answer with id
    router.put('/:id', auth.isAuthenticated, answers.update);

    // Delete a Answer with id
    router.delete('/:id', auth.isAuthenticated, answers.delete);

    app.use('/api/v1/answers', router);
};
