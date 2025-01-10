const db = require('../models');
const Role = db.role;
const Op = db.Sequelize.Op;

// Create and Save a new Role
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.description) {
        res.status(400).send({
            message: 'Content can not be empty.'
        });

        return;
    }

    // Create a Role
    const role = {
        name: req.body.name,
        description: req.body.description,
        createdAt: new Date()
    };

    // Save Role in the database
    Role.create(role)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Role.'
            });
        });
};

// Retrieve all Role from the database
exports.findAll = (req, res) => {
    Role.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Role.'
            });
        });
};

// Search for a Role by name
/* exports.findByName = (req, res) => {
    // Get the name from the URL parameters
    const roleName = req.params.name;

    // Validate if a name was passed
    if (!roleName) {
        return res.status(400).send({
            message: 'Role name must be provided.'
        });
    }

    // Perform search with LIKE operator (case insensitive search)
    Role.findAll({
        where: {
            name: {
                [Op.like]: `%${roleName}%` // Partial match with LIKE
            }
        }
    })
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send({
                    message: `No Role found with name ${roleName}.`
                });
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving the Role.'
            });
        });
}; */

// Find a single Role with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Role.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Role with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving Role with id=' + id
            });
        });
};

// Update a Role by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    // Update updatedAt with current date and time only when the Role is updated
    req.body.updatedAt = new Date();

    Role.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Role was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating Role with id=' + id
            });
        });
};

// Delete a Role with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Role.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Role was deleted successfully.'
                });
            } else {
                res.send({
                    message: `Cannot delete Role with id=${id}. Maybe Role was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete Role with id=' + id
            });
        });
};
