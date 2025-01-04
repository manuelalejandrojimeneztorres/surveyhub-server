const db = require('../models');
const SystemUser = db.systemuser;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const saltRounds = 12;
const utils = require('../utils/auth.utils');
const fs = require('fs');
const path = require('path');

// Create and Save a new SystemUser
exports.create = async (req, res) => {
    try {
        // Validar la solicitud
        const { loginName, firstName, lastName, emailAddress, phoneNumber, passwordHash, status, tokenVersion } = req.body;
        if (!loginName || !firstName || !lastName || !emailAddress || !phoneNumber || !passwordHash || !status || !tokenVersion) {
            return res.status(400).send({ message: 'Content cannot be empty.' });
        }

        // Verificar si el usuario ya existe
        // Verificar la unicidad de loginName, emailAddress y phoneNumber
        const existingUser = await SystemUser.findOne({
            where: {
                [Op.or]: [{ loginName }, { emailAddress }, { phoneNumber }]
            }
        });
        if (existingUser) {
            return res.status(409).send({ message: 'User already exists.' });
        }

        // Hashear la contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(passwordHash, saltRounds);

        // Crear un nuevo usuario
        const systemUser = {
            loginName,
            firstName,
            lastName,
            emailAddress,
            phoneNumber,
            passwordHash: hashedPassword,
            status,
            tokenVersion,
            profilePicture: req.file ? req.file.filename : '', // : null
            createdAt: new Date()
        };

        // Save user in database
        await SystemUser.create(systemUser);

        /*  // Save user in database
            const data = await SystemUser.create(systemUser);
        
            // Generate access token
            const accessToken = utils.generateAccessToken(data);
        
            // Get basic user details
            const userDetails = utils.extractBasicUserDetails(data);
        
            // Return the access token along with user details
            return res.json({ user: userDetails, access_token: accessToken });  */

        return res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).send({ message: 'Some error occurred while creating the SystemUser.' });
    }
};

// Retrieve all SystemUser from the database
exports.findAll = (req, res) => {
    SystemUser.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving SystemUser.'
            });
        });
};

// Search for a SystemUser by loginName
exports.findByLoginName = (req, res) => {
    // Get the loginName from the URL parameters
    const systemUserLoginName = req.params.loginName;

    // Validate if a loginName was passed
    if (!systemUserLoginName) {
        return res.status(400).send({
            message: 'SystemUser loginName must be provided.'
        });
    }

    // Perform search with LIKE operator (case insensitive search)
    SystemUser.findAll({
        where: {
            loginName: {
                [Op.like]: `%${systemUserLoginName}%` // Partial match with LIKE
            }
        }
    })
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send({
                    message: `No SystemUser found with loginName ${systemUserLoginName}.`
                });
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving the SystemUser.'
            });
        });
};

// Search for a SystemUser by emailAddress
exports.findByEmailAddress = (req, res) => {
    // Get the emailAddress from the URL parameters
    const systemUserEmailAddress = req.params.emailAddress;

    // Validate if a emailAddress was passed
    if (!systemUserEmailAddress) {
        return res.status(400).send({
            message: 'SystemUser emailAddress must be provided.'
        });
    }

    // Perform search with LIKE operator (case insensitive search)
    SystemUser.findAll({
        where: {
            emailAddress: {
                [Op.like]: `%${systemUserEmailAddress}%` // Partial match with LIKE
            }
        }
    })
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send({
                    message: `No SystemUser found with emailAddress ${systemUserEmailAddress}.`
                });
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving the SystemUser.'
            });
        });
};

// Search for a SystemUser by phoneNumber
exports.findByPhoneNumber = (req, res) => {
    // Get the phoneNumber from the URL parameters
    const systemUserPhoneNumber = req.params.phoneNumber;

    // Validate if a phoneNumber was passed
    if (!systemUserPhoneNumber) {
        return res.status(400).send({
            message: 'SystemUser phoneNumber must be provided.'
        });
    }

    // Perform search with LIKE operator (case insensitive search)
    SystemUser.findAll({
        where: {
            phoneNumber: {
                [Op.like]: `%${systemUserPhoneNumber}%` // Partial match with LIKE
            }
        }
    })
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send({
                    message: `No SystemUser found with phoneNumber ${systemUserPhoneNumber}.`
                });
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving the SystemUser.'
            });
        });
};

// Find a single SystemUser with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    SystemUser.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find SystemUser with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving SystemUser with id=' + id
            });
        });
};

// Find SystemUser by loginName and passwordHash
exports.findSystemUserByLoginNameAndPasswordHash = (req, res) => {
    const loginName = req.body.loginName;
    const passwordHash = req.body.passwordHash;

    SystemUser.findOne({ where: { loginName, passwordHash } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving SystemUser.'
            });
        });
};

/* // Find SystemUser by loginName and passwordHash
exports.findSystemUserByLoginNameAndPasswordHash = async (req, res) => {
    const { loginName, passwordHash } = req.body;

    try {
        const systemUser = await SystemUser.findOne({ where: { loginName } });

        if (systemUser && bcrypt.compareSync(passwordHash, systemUser.passwordHash)) {
            res.send(systemUser);
        } else {
            res.status(401).send({ message: 'Invalid loginName or passwordHash.' });
        }
    } catch (error) {
        console.error('Error finding SystemUser:', error);
        res.status(500).send({
            message: 'An error occurred while retrieving SystemUser information.',
        });
    }
}; */

/* // Update a SystemUser by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
 
    SystemUser.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'SystemUser was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update SystemUser with id=${id}. Maybe SystemUser was not found or req.body is empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating SystemUser with id=' + id
            });
        });
}; */

// Update a SystemUser by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        // Get the current user record
        const systemUser = await SystemUser.findByPk(id);
        if (!systemUser) {
            return res.status(404).send({
                message: `Cannot find SystemUser with id=${id}.`
            });
        }

        // Check if password is provided in the update request
        if (req.body.passwordHash) {
            const isPasswordDifferent = !bcrypt.compareSync(req.body.passwordHash, systemUser.passwordHash);

            // Encrypt the new password only if it is different from the current one
            if (isPasswordDifferent) {
                req.body.passwordHash = bcrypt.hashSync(req.body.passwordHash, saltRounds);

                // Update lastPasswordChangeAt only when the password is changed
                req.body.lastPasswordChangeAt = new Date();
            } else {
                // Keep the existing password hash if there is no change
                delete req.body.passwordHash;
            }
        }

        // If a new image has been uploaded (field handled by Multer)
        if (req.file) {
            const newProfilePicture = req.file.filename;

            // If the user had a previous image, delete it from the server
            if (systemUser.profilePicture) {
                const oldImagePath = path.join(__dirname, '../public/images', systemUser.profilePicture);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);  // Delete previous image
                }
            }

            // Update profilePicture field in data to be updated
            req.body.profilePicture = newProfilePicture;
        }

        // Update updatedAt with current date and time only when the SystemUser is updated
        req.body.updatedAt = new Date();

        // Update user data
        const [updated] = await SystemUser.update(req.body, {
            where: { id: id }
        });

        if (updated) {
            return res.send({
                message: 'SystemUser was updated successfully.'
            });
        } else {
            return res.status(400).send({
                message: `Cannot update SystemUser with id=${id}. Maybe SystemUser was not found or req.body is empty.`
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Error updating SystemUser with id=' + id
        });
    }
};

// Delete a SystemUser with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    SystemUser.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'SystemUser was deleted successfully.'
                });
            } else {
                res.send({
                    message: `Cannot delete SystemUser with id=${id}. Maybe SystemUser was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete SystemUser with id=' + id
            });
        });
};
