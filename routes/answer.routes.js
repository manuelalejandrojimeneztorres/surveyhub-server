module.exports = app => {
    const answerController = require('../controllers/answer.controller.js');
    const authController = require('../controllers/auth.controller.js');
    const { validateTokenVersion, authorizeRoles } = require('../middlewares/auth.middleware');
    const router = require('express').Router();

    // Create a new Answer
    router.post('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), answerController.create);

    // Retrieve all Answer
    router.get('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), answerController.findAll);

    // Retrieve all Answer equals an id
    router.get('/responses/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), answerController.findByResponseId);

    // Retrieve all Answer equals an id
    router.get('/questions/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), answerController.findByQuestionId);

    // Retrieve a single Answer with id
    router.get('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), answerController.findOne);

    // Update a Answer with id
    router.put('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), answerController.update);

    // Delete a Answer with id
    router.delete('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), answerController.delete);

    app.use('/api/v1/answers', router);
};
