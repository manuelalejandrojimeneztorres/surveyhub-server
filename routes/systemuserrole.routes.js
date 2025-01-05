module.exports = app => {
    const systemUserRoleController = require('../controllers/systemuserrole.controller.js');
    const authController = require('../controllers/auth.controller.js');
    const { validateTokenVersion, authorizeRoles } = require('../middlewares/auth.middleware');
    const router = require('express').Router();

    // Create a new SystemUserRole
    router.post('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator']), systemUserRoleController.create);

    // Retrieve all SystemUserRole
    router.get('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), systemUserRoleController.findAll);

    // Retrieve all SystemUserRole equals an id
    router.get('/system-users/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), systemUserRoleController.findBySystemUserId);

    // Retrieve all SystemUserRole equals an id
    router.get('/roles/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), systemUserRoleController.findByRoleId);

    // Retrieve a single SystemUserRole with id
    router.get('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), systemUserRoleController.findOne);

    // Update a SystemUserRole with id
    router.put('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator']), systemUserRoleController.update);

    // Delete a SystemUserRole with id
    router.delete('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator']), systemUserRoleController.delete);

    app.use('/api/v1/system-user-roles', router);
};
