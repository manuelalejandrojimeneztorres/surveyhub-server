module.exports = app => {
    const questionOptionController = require('../controllers/questionoption.controller.js');
    const authController = require('../controllers/auth.controller.js');
    const { validateTokenVersion, authorizeRoles } = require('../middlewares/auth.middleware');
    const router = require('express').Router();

    // Create a new QuestionOption
    router.post('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), questionOptionController.create);

    // Retrieve all QuestionOption
    router.get('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), questionOptionController.findAll);

    // Retrieve a single QuestionOption with id
    router.get('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), questionOptionController.findOne);

    // Retrieve all QuestionOption equals an id
    router.get('/questions/:id/question-options', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), questionOptionController.findByQuestionId);

    // Update a QuestionOption with id
    router.put('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), questionOptionController.update);

    // Delete a QuestionOption with id
    router.delete('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), questionOptionController.delete);

    app.use('/api/v1/question-options', router);
};
