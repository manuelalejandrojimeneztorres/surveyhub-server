module.exports = app => {
    const surveys = require('../controllers/survey.controller.js');
    const auth = require('../controllers/auth.controller.js');

    var router = require('express').Router();

    // Create a new Survey
    router.post('/', auth.isAuthenticated, surveys.create);

    // Retrieve all Survey
    router.get('/', auth.isAuthenticated, surveys.findAll);

    // Retrieve a single Survey with id
    router.get('/:id', auth.isAuthenticated, surveys.findOne);

    // Retrieve all Survey equals an id
    router.get('/survey-statuses/:id/surveys', auth.isAuthenticated, surveys.findAllBySurveyStatusId);

    // Update a Survey with id
    router.put('/:id', auth.isAuthenticated, surveys.update);

    // Delete a Survey with id
    router.delete('/:id', auth.isAuthenticated, surveys.delete);

    app.use('/api/v1/surveys', router);
};
