module.exports = app => {
    const questionTypeController = require('../controllers/questiontype.controller.js');
    const authController = require('../controllers/auth.controller.js');
    const { validateTokenVersion, authorizeRoles } = require('../middlewares/auth.middleware');
    const router = require('express').Router();

    // Create a new QuestionType
    router.post('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), questionTypeController.create);

    // Retrieve all QuestionType
    router.get('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), questionTypeController.findAll);

    // Search for a QuestionType by type name
    // router.get('/:type', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), questionTypeController.findByName);

    // Retrieve a single QuestionType with id
    router.get('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), questionTypeController.findOne);

    // Update a QuestionType with id
    router.put('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), questionTypeController.update);

    // Delete a QuestionType with id
    router.delete('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), questionTypeController.delete);

    app.use('/api/v1/question-types', router);
};
