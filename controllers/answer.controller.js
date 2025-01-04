const db = require('../models');
const Answer = db.answer;
const Op = db.Sequelize.Op;

// Create and Save a new Answer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.responseId || !req.body.questionId) {
        res.status(400).send({
            message: 'Content can not be empty.'
        });

        return;
    }

    // Create a Answer
    const answer = {
        responseId: req.body.responseId,
        questionId: req.body.questionId,
        answer: req.body.answer,
        createdAt: new Date()
    };

    // Save Answer in the database
    Answer.create(answer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Answer.'
            });
        });
};

// Retrieve all Answer from the database
exports.findAll = (req, res) => {
    Answer.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Answer.'
            });
        });
};

// Retrieve all Answer from the database
exports.findByResponseId = (req, res) => {
    const id = req.params.id;

    Answer.findAll({ where: { responseId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Answer.'
            });
        });
};

// Retrieve all Answer from the database
exports.findByQuestionId = (req, res) => {
    const id = req.params.id;

    Answer.findAll({ where: { questionId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Answer.'
            });
        });
};

// Find a single Answer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Answer.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Answer with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving Answer with id=' + id
            });
        });
};

// Update a Answer by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    // Update updatedAt with current date and time only when the Answer is updated
    req.body.updatedAt = new Date();

    Answer.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Answer was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update Answer with id=${id}. Maybe Answer was not found or req.body is empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating Answer with id=' + id
            });
        });
};

// Delete a Answer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Answer.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Answer was deleted successfully.'
                });
            } else {
                res.send({
                    message: `Cannot delete Answer with id=${id}. Maybe Answer was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete Answer with id=' + id
            });
        });
};
