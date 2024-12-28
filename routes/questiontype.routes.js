module.exports = app => {
    const questionTypes = require('../controllers/questiontype.controller.js');
    const auth = require('../controllers/auth.controller.js');

    var router = require('express').Router();

    // Create a new QuestionType
    router.post('/', auth.isAuthenticated, questionTypes.create);

    // Retrieve all QuestionType
    router.get('/', auth.isAuthenticated, questionTypes.findAll);

    // Retrieve a single QuestionType with id
    router.get('/:id', auth.isAuthenticated, questionTypes.findOne);

    // Update a QuestionType with id
    router.put('/:id', auth.isAuthenticated, questionTypes.update);

    // Delete a QuestionType with id
    router.delete('/:id', auth.isAuthenticated, questionTypes.delete);

    app.use('/api/v1/question-types', router);
};
