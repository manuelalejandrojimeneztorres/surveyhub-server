module.exports = app => {
    const systemUserController = require('../controllers/systemuser.controller.js');
    const upload = require('../middlewares/file-upload.middleware.js');
    const authController = require('../controllers/auth.controller.js');
    const { validateTokenVersion, authorizeRoles } = require('../middlewares/auth.middleware');
    const router = require('express').Router();

    // Create a new SystemUser
    router.post('/', upload.single('profilePicture'), systemUserController.create); // authorizeRoles(['System Administrator'])

    // Sign In
    router.post('/signin', authController.signin);

    // Retrieve all SystemUser
    router.get('/', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), systemUserController.findAll);

    // Search for a SystemUser by loginName
    // router.get('/:loginName', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), systemUserController.findByLoginName);

    // Search for a SystemUser by emailAddress
    // router.get('/:emailAddress', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), systemUserController.findByEmailAddress);

    // Search for a SystemUser by phoneNumber
    // router.get('/:phoneNumber', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager']), systemUserController.findByPhoneNumber);

    // Retrieve a single SystemUser with id
    router.get('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), systemUserController.findOne);

    // Update a SystemUser with id
    router.put('/:id', authController.isAuthenticated, upload.single('profilePicture'), validateTokenVersion, authorizeRoles(['System Administrator', 'Survey Manager', 'Respondent']), systemUserController.update);

    // Delete a SystemUser with id
    router.delete('/:id', authController.isAuthenticated, validateTokenVersion, authorizeRoles(['System Administrator']), systemUserController.delete);

    app.use('/api/v1/system-users', router);
};
