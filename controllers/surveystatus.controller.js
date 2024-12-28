const db = require('../models');
const SurveyStatus = db.surveystatus;
const Op = db.Sequelize.Op;

// Create and Save a new SurveyStatus
exports.create = (req, res) => {
    // Validate request
    if (!req.body.status) {
        res.status(400).send({
            message: 'Content can not be empty.'
        });

        return;
    }

    // Create a SurveyStatus
    const surveyStatus = {
        status: req.body.status,
        createdAt: new Date()
    };

    // Save SurveyStatus in the database
    SurveyStatus.create(surveyStatus)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the SurveyStatus.'
            });
        });
};

// Retrieve all SurveyStatus from the database
exports.findAll = (req, res) => {
    SurveyStatus.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving SurveyStatus.'
            });
        });
};

// Find a single SurveyStatus with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    SurveyStatus.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find SurveyStatus with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving SurveyStatus with id=' + id
            });
        });
};

// Update a SurveyStatus by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    // Update updatedAt with current date and time only when the user is updated
    req.body.updatedAt = new Date();

    SurveyStatus.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'SurveyStatus was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update SurveyStatus with id=${id}. Maybe SurveyStatus was not found or req.body is empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating SurveyStatus with id=' + id
            });
        });
};

// Delete a SurveyStatus with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    SurveyStatus.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'SurveyStatus was deleted successfully.'
                });
            } else {
                res.send({
                    message: `Cannot delete SurveyStatus with id=${id}. Maybe SurveyStatus was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete SurveyStatus with id=' + id
            });
        });
};
