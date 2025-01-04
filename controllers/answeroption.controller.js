const db = require('../models');
const AnswerOption = db.answeroption;
const Op = db.Sequelize.Op;

// Create and Save a new AnswerOption
exports.create = (req, res) => {
    // Validate request
    if (!req.body.answerId || !req.body.questionOptionId) {
        res.status(400).send({
            message: 'Content can not be empty.'
        });

        return;
    }

    // Create a AnswerOption
    const answerOption = {
        answerId: req.body.answerId,
        questionOptionId: req.body.questionOptionId,
        createdAt: new Date()
    };

    // Save AnswerOption in the database
    AnswerOption.create(answerOption)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the AnswerOption.'
            });
        });
};

// Retrieve all AnswerOption from the database
exports.findAll = (req, res) => {
    AnswerOption.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving AnswerOption.'
            });
        });
};

// Retrieve all AnswerOption from the database
exports.findByAnswerId = (req, res) => {
    const id = req.params.id;

    AnswerOption.findAll({ where: { answerId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving AnswerOption.'
            });
        });
};

// Retrieve all AnswerOption from the database
exports.findByQuestionOptionId = (req, res) => {
    const id = req.params.id;

    AnswerOption.findAll({ where: { questionOptionId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving AnswerOption.'
            });
        });
};

// Find a single AnswerOption with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    AnswerOption.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find AnswerOption with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving AnswerOption with id=' + id
            });
        });
};

// Update a AnswerOption by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    // Update updatedAt with current date and time only when the AnswerOption is updated
    req.body.updatedAt = new Date();

    AnswerOption.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'AnswerOption was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update AnswerOption with id=${id}. Maybe AnswerOption was not found or req.body is empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating AnswerOption with id=' + id
            });
        });
};

// Delete a AnswerOption with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    AnswerOption.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'AnswerOption was deleted successfully.'
                });
            } else {
                res.send({
                    message: `Cannot delete AnswerOption with id=${id}. Maybe AnswerOption was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete AnswerOption with id=' + id
            });
        });
};
