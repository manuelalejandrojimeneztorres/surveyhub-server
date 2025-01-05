module.exports = app => {
    const surveyController = require('../controllers/survey.controller.js');
    const authController = require('../controllers/auth.controller.js');
    const { validateTokenVersion, authorizeRoles } = require('../middlewares/auth.middleware');
    const router = require('express').Router();

    // Create a new Survey
    router.post('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), surveyController.create);

    // Retrieve all Survey
    router.get('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), surveyController.findAll);

    // Search for a Survey by name
    router.get('/:name', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), surveyController.findByName);

    // Retrieve all Survey equals an id
    router.get('/survey-statuses/:id/surveys', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), surveyController.findBySurveyStatusId);

    // Retrieve a single Survey with id
    router.get('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), surveyController.findOne);

    // Update a Survey with id
    router.put('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), surveyController.update);

    // Delete a Survey with id
    router.delete('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), surveyController.delete);

    app.use('/api/v1/surveys', router);
};
