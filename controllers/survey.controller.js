const db = require('../models');
const Survey = db.survey;
const Op = db.Sequelize.Op;

// Create and Save a new Survey
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.description || !req.body.startDate || !req.body.surveyStatusId) {
        res.status(400).send({
            message: 'Content can not be empty.'
        });

        return;
    }

    // Create a Survey
    const survey = {
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        minResponses: req.body.minResponses,
        maxResponses: req.body.maxResponses,
        surveyStatusId: req.body.surveyStatusId,
        createdAt: new Date()
    };

    // Save Survey in the database
    Survey.create(survey)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Survey.'
            });
        });
};

// Retrieve all Survey from the database
exports.findAll = (req, res) => {
    Survey.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Survey.'
            });
        });
};

// Search for a Survey by name
/* exports.findByName = (req, res) => {
    // Get the name from the URL parameters
    const surveyName = req.params.name;

    // Validate if a name was passed
    if (!surveyName) {
        return res.status(400).send({
            message: 'Survey name must be provided.'
        });
    }

    // Perform search with LIKE operator (case insensitive search)
    Survey.findAll({
        where: {
            name: {
                [Op.like]: `%${surveyName}%` // Partial match with LIKE
            }
        }
    })
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send({
                    message: `No Survey found with name ${surveyName}.`
                });
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving the Survey.'
            });
        });
}; */

// Retrieve all Survey from the database
exports.findBySurveyStatusId = (req, res) => {
    const id = req.params.id;

    Survey.findAll({ where: { surveyStatusId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Survey.'
            });
        });
};

// Find a single Survey with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Survey.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Survey with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving Survey with id=' + id
            });
        });
};

// Update a Survey by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    // Update updatedAt with current date and time only when the Survey is updated
    req.body.updatedAt = new Date();

    Survey.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Survey was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update Survey with id=${id}. Maybe Survey was not found or req.body is empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating Survey with id=' + id
            });
        });
};

// Delete a Survey with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Survey.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Survey was deleted successfully.'
                });
            } else {
                res.send({
                    message: `Cannot delete Survey with id=${id}. Maybe Survey was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete Survey with id=' + id
            });
        });
};
