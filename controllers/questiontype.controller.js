const db = require('../models');
const QuestionType = db.questiontype;
const Op = db.Sequelize.Op;

// Create and Save a new QuestionType
exports.create = (req, res) => {
    // Validate request
    if (!req.body.type) {
        res.status(400).send({
            message: 'Content can not be empty.'
        });

        return;
    }

    // Create a QuestionType
    const questionType = {
        type: req.body.type,
        createdAt: new Date()
    };

    // Save QuestionType in the database
    QuestionType.create(questionType)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the QuestionType.'
            });
        });
};

// Retrieve all QuestionType from the database
exports.findAll = (req, res) => {
    QuestionType.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving QuestionType.'
            });
        });
};

// Search for a QuestionType by type
/* exports.findByName = (req, res) => {
    // Get the type from the URL parameters
    const typeName = req.params.type;

    // Validate if a type was passed
    if (!typeName) {
        return res.status(400).send({
            message: 'QuestionType type must be provided.'
        });
    }

    // Perform search with LIKE operator (case insensitive search)
    QuestionType.findAll({
        where: {
            type: {
                [Op.like]: `%${typeName}%` // Partial match with LIKE
            }
        }
    })
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send({
                    message: `No QuestionType found with type ${typeName}.`
                });
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving the QuestionType.'
            });
        });
}; */

// Find a single QuestionType with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    QuestionType.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find QuestionType with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving QuestionType with id=' + id
            });
        });
};

// Update a QuestionType by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    // Update updatedAt with current date and time only when the QuestionType is updated
    req.body.updatedAt = new Date();

    QuestionType.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'QuestionType was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update QuestionType with id=${id}. Maybe QuestionType was not found or req.body is empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating QuestionType with id=' + id
            });
        });
};

// Delete a QuestionType with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    QuestionType.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'QuestionType was deleted successfully.'
                });
            } else {
                res.send({
                    message: `Cannot delete QuestionType with id=${id}. Maybe QuestionType was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete QuestionType with id=' + id
            });
        });
};
