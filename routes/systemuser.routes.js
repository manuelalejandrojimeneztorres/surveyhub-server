module.exports = app => {
    const systemUsers = require('../controllers/systemuser.controller.js');
    const auth = require('../controllers/auth.controller.js');

    const upload = require('../middlewares/file-upload.middleware.js');

    var router = require('express').Router();

    // Create a new SystemUser
    router.post('/', upload.single('profilePicture'), systemUsers.create);

    // Sign In
    router.post('/signin', auth.signin);

    // Retrieve all SystemUser
    router.get('/', auth.isAuthenticated, systemUsers.findAll);

    // Search for a SystemUser by loginName
    router.get('/:loginName', auth.isAuthenticated, systemUsers.findByLoginName);

    // Search for a SystemUser by emailAddress
    router.get('/:emailAddress', auth.isAuthenticated, systemUsers.findByEmailAddress);

    // Search for a SystemUser by phoneNumber
    router.get('/:phoneNumber', auth.isAuthenticated, systemUsers.findByPhoneNumber);

    // Retrieve a single SystemUser with id
    router.get('/:id', auth.isAuthenticated, systemUsers.findOne);

    // Update a SystemUser with id
    router.put('/:id', auth.isAuthenticated, upload.single('profilePicture'), systemUsers.update);

    // Delete a SystemUser with id
    router.delete('/:id', auth.isAuthenticated, systemUsers.delete);

    app.use('/api/v1/system-users', router);
};
