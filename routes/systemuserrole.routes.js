module.exports = app => {
    const systemUserRoles = require('../controllers/systemuserrole.controller.js');
    const auth = require('../controllers/auth.controller.js');

    var router = require('express').Router();

    // Create a new SystemUserRole
    router.post('/', auth.isAuthenticated, systemUserRoles.create);

    // Retrieve all SystemUserRole
    router.get('/', auth.isAuthenticated, systemUserRoles.findAll);

    // Retrieve all SystemUserRole equals an id
    router.get('/system-users/:id', auth.isAuthenticated, systemUserRoles.findBySystemUserId);

    // Retrieve all SystemUserRole equals an id
    router.get('/roles/:id', auth.isAuthenticated, systemUserRoles.findByRoleId);

    // Retrieve a single SystemUserRole with id
    router.get('/:id', auth.isAuthenticated, systemUserRoles.findOne);

    // Update a SystemUserRole with id
    router.put('/:id', auth.isAuthenticated, systemUserRoles.update);

    // Delete a SystemUserRole with id
    router.delete('/:id', auth.isAuthenticated, systemUserRoles.delete);

    app.use('/api/v1/system-user-roles', router);
};
