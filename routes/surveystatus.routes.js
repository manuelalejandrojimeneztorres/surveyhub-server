module.exports = app => {
    const surveyStatusController = require('../controllers/surveystatus.controller.js');
    const authController = require('../controllers/auth.controller.js');
    const { validateTokenVersion, authorizeRoles } = require('../middlewares/auth.middleware');
    const router = require('express').Router();

    // Create a new SurveyStatus
    router.post('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), surveyStatusController.create);

    // Retrieve all SurveyStatus
    router.get('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), surveyStatusController.findAll);

    // Search for a SurveyStatus by status name
    router.get('/:status', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), surveyStatusController.findByName);

    // Retrieve a single SurveyStatus with id
    router.get('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), surveyStatusController.findOne);

    // Update a SurveyStatus with id
    router.put('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), surveyStatusController.update);

    // Delete a SurveyStatus with id
    router.delete('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), surveyStatusController.delete);

    app.use('/api/v1/survey-statuses', router);
};
