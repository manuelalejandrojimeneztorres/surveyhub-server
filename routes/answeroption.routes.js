module.exports = app => {
    const answerOptionController = require('../controllers/answeroption.controller.js');
    const authController = require('../controllers/auth.controller.js');
    const { validateTokenVersion, authorizeRoles } = require('../middlewares/auth.middleware');
    const router = require('express').Router();

    // Create a new AnswerOption
    router.post('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), answerOptionController.create);

    // Retrieve all AnswerOption
    router.get('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), answerOptionController.findAll);

    // Retrieve all AnswerOption equals an id
    router.get('/answers/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), answerOptionController.findByAnswerId);

    // Retrieve all AnswerOption equals an id
    router.get('/question-options/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), answerOptionController.findByQuestionOptionId);

    // Retrieve a single AnswerOption with id
    router.get('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), answerOptionController.findOne);

    // Update a AnswerOption with id
    router.put('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), answerOptionController.update);

    // Delete a AnswerOption with id
    router.delete('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), answerOptionController.delete);

    app.use('/api/v1/answer-options', router);
};
