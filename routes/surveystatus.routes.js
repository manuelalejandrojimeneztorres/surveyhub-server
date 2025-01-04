module.exports = app => {
    const surveyStatuses = require('../controllers/surveystatus.controller.js');
    const auth = require('../controllers/auth.controller.js');

    var router = require('express').Router();

    // Create a new SurveyStatus
    router.post('/', auth.isAuthenticated, surveyStatuses.create);

    // Retrieve all SurveyStatus
    router.get('/', auth.isAuthenticated, surveyStatuses.findAll);

    // Search for a SurveyStatus by status name
    router.get('/:status', auth.isAuthenticated, surveyStatuses.findByName);

    // Retrieve a single SurveyStatus with id
    router.get('/:id', auth.isAuthenticated, surveyStatuses.findOne);

    // Update a SurveyStatus with id
    router.put('/:id', auth.isAuthenticated, surveyStatuses.update);

    // Delete a SurveyStatus with id
    router.delete('/:id', auth.isAuthenticated, surveyStatuses.delete);

    app.use('/api/v1/survey-statuses', router);
};
