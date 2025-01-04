const db = require('../models');
const SystemUserRole = db.systemuserrole;
const Op = db.Sequelize.Op;

// Create and Save a new SystemUserRole
exports.create = (req, res) => {
    // Validate request
    if (!req.body.systemUserId || !req.body.roleId) {
        res.status(400).send({
            message: 'Content can not be empty.'
        });

        return;
    }

    // Create a SystemUserRole
    const systemUserRole = {
        systemUserId: req.body.systemUserId,
        roleId: req.body.roleId,
        createdAt: new Date()
    };

    // Save SystemUserRole in the database
    SystemUserRole.create(systemUserRole)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the SystemUserRole.'
            });
        });
};

// Retrieve all SystemUserRole from the database
exports.findAll = (req, res) => {
    SystemUserRole.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving SystemUserRole.'
            });
        });
};

// Retrieve all SystemUserRole from the database
exports.findBySystemUserId = (req, res) => {
    const id = req.params.id;

    SystemUserRole.findAll({ where: { systemUserId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving SystemUserRole.'
            });
        });
};

// Retrieve all SystemUserRole from the database
exports.findByRoleId = (req, res) => {
    const id = req.params.id;

    SystemUserRole.findAll({ where: { roleId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving SystemUserRole.'
            });
        });
};

// Find a single SystemUserRole with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    SystemUserRole.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find SystemUserRole with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving SystemUserRole with id=' + id
            });
        });
};

// Update a SystemUserRole by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    // Update updatedAt with current date and time only when the SystemUserRole is updated
    req.body.updatedAt = new Date();

    SystemUserRole.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'SystemUserRole was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update SystemUserRole with id=${id}. Maybe SystemUserRole was not found or req.body is empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating SystemUserRole with id=' + id
            });
        });
};

// Delete a SystemUserRole with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    SystemUserRole.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'SystemUserRole was deleted successfully.'
                });
            } else {
                res.send({
                    message: `Cannot delete SystemUserRole with id=${id}. Maybe SystemUserRole was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete SystemUserRole with id=' + id
            });
        });
};
