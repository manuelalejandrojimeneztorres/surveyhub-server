module.exports = app => {
    const responses = require('../controllers/response.controller.js');
    const auth = require('../controllers/auth.controller.js');

    var router = require('express').Router();

    // Create a new Response
    router.post('/', auth.isAuthenticated, responses.create);

    // Retrieve all Response
    router.get('/', auth.isAuthenticated, responses.findAll);

    // Retrieve all Response equals an id
    router.get('/surveys/:id', auth.isAuthenticated, responses.findBySurveyId);

    // Retrieve all Response equals an id
    router.get('/system-users/:id', auth.isAuthenticated, responses.findBySystemUserId);

    // Retrieve a single Response with id
    router.get('/:id', auth.isAuthenticated, responses.findOne);

    // Update a Response with id
    router.put('/:id', auth.isAuthenticated, responses.update);

    // Delete a Response with id
    router.delete('/:id', auth.isAuthenticated, responses.delete);

    app.use('/api/v1/responses', router);
};
