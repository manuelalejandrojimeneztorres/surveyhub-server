module.exports = app => {
    const questionController = require('../controllers/question.controller.js');
    const authController = require('../controllers/auth.controller.js');
    const { validateTokenVersion, authorizeRoles } = require('../middlewares/auth.middleware');
    const router = require('express').Router();

    // Create a new Question
    router.post('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), questionController.create);

    // Retrieve all Question
    router.get('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), questionController.findAll);

    // Search for a Question by text
    // router.get('/:text', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), questionController.findByName);

    // Retrieve all Question equals an id
    router.get('/surveys/:id/questions', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), questionController.findBySurveyId);

    // Retrieve all Question equals an id
    router.get('/question-types/:id/questions', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), questionController.findByQuestionTypeId);

    // Retrieve a single Question with id
    router.get('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), questionController.findOne);

    // Update a Question with id
    router.put('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), questionController.update);

    // Delete a Question with id
    router.delete('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), questionController.delete);

    app.use('/api/v1/questions', router);
};
