const db = require('../models');
const SystemUser = db.systemuser;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const { getSystemUserRoles } = require('../utils/systemuser.utils');
const authUtils = require('../utils/auth.utils');
const jwt = require('jsonwebtoken');

exports.signin = async (req, res) => {
    const { loginName, emailAddress, phoneNumber, passwordHash } = req.body;

    // Return 400 status if loginName/passwordHash is not exist
    // Validación de la solicitud
    if (!loginName || !passwordHash) {
        return res.status(400).json({
            error: true,
            message: 'Both loginName and passwordHash are required.'
        });
    }

    /*
    // Return 401 status if the credential is not match
    SystemUser.findOne({ where: { loginName } })
        .then(data => {
            const isPasswordMatch = bcrypt.compareSync(passwordHash, data.passwordHash);
            if (!isPasswordMatch) return res.status(401).send('Invalid password');
 
            // Generate access token
            const accessToken = utils.generateAccessToken(data);
 
            // Get basic user details
            const userDetails = utils.extractBasicUserDetails(data);
 
            // Return the access token along with user details
            return res.json({ user: userDetails, access_token: accessToken });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving SystemUser.'
            });
        });
        */

    try {
        // Find user by loginName
        const user = await SystemUser.findOne({ where: { loginName } });
        if (!user) {
            return res.status(401).send('User not found');
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(passwordHash, user.passwordHash);
        if (!isPasswordMatch) {
            return res.status(401).send('Invalid password');
        }

        // Update lastLoginAt field
        await user.update({ lastLoginAt: new Date() });

        // Get user roles
        const roles = await getSystemUserRoles(user.id);

        // Generate access token
        const accessToken = authUtils.generateAccessToken(user, roles);

        // Get basic user details
        const userDetails = authUtils.extractBasicUserDetails(user, roles);

        // Return the access token along with user details
        return res.status(200).json({ user: userDetails, access_token: accessToken });

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: err.message || 'Some error occurred while retrieving SystemUser.'
        });
    }
};

exports.isAuthenticated = (req, res, next) => {
    // Check header or url parameters or post parameters for token
    // var token = req.body.token || req.query.token;
    var token = req.token;
    if (!token) {
        return res.status(400).json({
            error: true,
            message: 'Token is required'
        });
    }
    // Check token that was passed by decoding token using secret
    // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) return res.status(401).json({
            error: true,
            message: 'Invalid token'
        });

        SystemUser.findByPk(user.id)
            .then(data => {
                // Return 401 status if the userId does not match
                if (!user.id) {
                    return res.status(401).json({
                        error: true,
                        message: 'Invalid user'
                    });
                }
                // Get basic user details
                next();
            })
            .catch(err => {
                res.status(500).send({
                    message: 'Error retrieving SystemUser with id=' + id
                });
            });
    });
};
