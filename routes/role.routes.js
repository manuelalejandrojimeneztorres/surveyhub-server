module.exports = app => {
    const roleController = require('../controllers/role.controller.js');
    const authController = require('../controllers/auth.controller.js');
    const { validateTokenVersion, authorizeRoles } = require('../middlewares/auth.middleware');
    const router = require('express').Router();

    // Create a new Role
    router.post('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator']), roleController.create);

    // Retrieve all Role
    router.get('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), roleController.findAll);

    // Search for a Role by name
    // router.get('/:name', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), roleController.findByName);

    // Retrieve a single Role with id
    router.get('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), roleController.findOne);

    // Update a Role with id
    router.put('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator']), roleController.update);

    // Delete a Role with id
    router.delete('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator']), roleController.delete);

    app.use('/api/v1/roles', router);
};
