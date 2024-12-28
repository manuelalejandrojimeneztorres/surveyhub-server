const db = require('../models');
const SystemUser = db.systemuser;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const saltRounds = 12;
const utils = require('../utils');
const fs = require('fs');
const path = require('path');

// Create and Save a new SystemUser
exports.create = (req, res) => {
    // Validate request
    if (!req.body.loginName || !req.body.firstName || !req.body.lastName || !req.body.emailAddress || !req.body.passwordHash || !req.body.status || !req.body.tokenVersion) {
        res.status(400).send({
            message: 'Content can not be empty.'
        });

        return;
    }

    // Create a SystemUser
    let systemUser = {
        loginName: req.body.loginName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        passwordHash: req.body.passwordHash,
        status: req.body.status,
        tokenVersion: req.body.tokenVersion,
        profilePicture: req.file ? req.file.filename : '', // : null
        createdAt: new Date()
    };

    //
    SystemUser.findOne({ where: { loginName: systemUser.loginName } })
        .then(data => {
            if (data) {
                const isPasswordMatch = bcrypt.compareSync(systemUser.passwordHash, data.passwordHash);
                if (!isPasswordMatch) return res.status(401).send('Invalid password');

                // Generate access token
                const accessToken = utils.generateAccessToken(data);

                // Get basic user details
                const userDetails = utils.extractBasicUserDetails(data);

                // Return the access token along with user details
                return res.json({ user: userDetails, access_token: accessToken });
            }

            systemUser.passwordHash = bcrypt.hashSync(req.body.passwordHash, saltRounds);

            // SystemUser not found; save SystemUser in the database
            SystemUser.create(systemUser)
                .then(data => {
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
                            err.message || 'Some error occurred while creating the SystemUser.'
                    });
                });

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the SystemUser.'
            });
        });
};