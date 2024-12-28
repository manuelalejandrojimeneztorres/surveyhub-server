const db = require('../models');
const QuestionOption = db.questionoption;
const Op = db.Sequelize.Op;

// Create and Save a new QuestionOption
exports.create = (req, res) => {
    // Validate request
    if (!req.body.questionId || !req.body.order || !req.body.value) {
        res.status(400).send({
            message: 'Content can not be empty.'
        });

        return;
    }

    // Create a QuestionOption
    const questionOption = {
        questionId: req.body.questionId,
        order: req.body.order,
        value: req.body.value,
        createdAt: new Date()
    };

    // Save QuestionOption in the database
    QuestionOption.create(questionOption)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the QuestionOption.'
            });
        });
};

// Retrieve all QuestionOption from the database
exports.findAll = (req, res) => {
    QuestionOption.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving QuestionOption.'
            });
        });
};

// Retrieve all QuestionOption from the database
exports.findAllByQuestionId = (req, res) => {
    const id = req.params.id;

    QuestionOption.findAll({ where: { questionId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving QuestionOption.'
            });
        });
};

// Find a single QuestionOption with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    QuestionOption.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find QuestionOption with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving QuestionOption with id=' + id
            });
        });
};

// Update a QuestionOption by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    // Update updatedAt with current date and time only when the user is updated
    req.body.updatedAt = new Date();

    QuestionOption.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'QuestionOption was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update QuestionOption with id=${id}. Maybe QuestionOption was not found or req.body is empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating QuestionOption with id=' + id
            });
        });
};

// Delete a QuestionOption with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    QuestionOption.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'QuestionOption was deleted successfully.'
                });
            } else {
                res.send({
                    message: `Cannot delete QuestionOption with id=${id}. Maybe QuestionOption was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete QuestionOption with id=' + id
            });
        });
};
