const db = require('../models');
const Response = db.response;
const Op = db.Sequelize.Op;

// Create and Save a new Response
exports.create = (req, res) => {
    // Validate request
    if (!req.body.surveyId || !req.body.systemUserId || !req.body.beginDate) {
        res.status(400).send({
            message: 'Content can not be empty.'
        });

        return;
    }

    // Create a Response
    const response = {
        surveyId: req.body.surveyId,
        systemUserId: req.body.systemUserId,
        beginDate: req.body.beginDate,
        endDate: req.body.endDate,
        createdAt: new Date()
    };

    // Save Response in the database
    Response.create(response)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Response.'
            });
        });
};

// Retrieve all Response from the database
exports.findAll = (req, res) => {
    Response.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Response.'
            });
        });
};

// Retrieve all Response from the database
exports.findBySurveyId = (req, res) => {
    const id = req.params.id;

    Response.findAll({ where: { surveyId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Response.'
            });
        });
};

// Retrieve all Response from the database
exports.findBySystemUserId = (req, res) => {
    const id = req.params.id;

    Response.findAll({ where: { systemUserId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Response.'
            });
        });
};

// Find a single Response with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Response.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Response with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving Response with id=' + id
            });
        });
};

// Update a Response by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    // Update updatedAt with current date and time only when the Response is updated
    req.body.updatedAt = new Date();

    Response.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Response was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update Response with id=${id}. Maybe Response was not found or req.body is empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating Response with id=' + id
            });
        });
};

// Delete a Response with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Response.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Response was deleted successfully.'
                });
            } else {
                res.send({
                    message: `Cannot delete Response with id=${id}. Maybe Response was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete Response with id=' + id
            });
        });
};
