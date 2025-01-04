const db = require('../models');
const Question = db.question;
const Op = db.Sequelize.Op;

// Create and Save a new Question
exports.create = (req, res) => {
    // Validate request
    if (!req.body.surveyId || !req.body.questionTypeId || !req.body.order || !req.body.text || !req.body.isMandatory) {
        res.status(400).send({
            message: 'Content can not be empty.'
        });

        return;
    }

    // Create a Question
    const question = {
        surveyId: req.body.surveyId,
        questionTypeId: req.body.questionTypeId,
        order: req.body.order,
        text: req.body.text,
        isMandatory: req.body.isMandatory,
        createdAt: new Date()
    };

    // Save Question in the database
    Question.create(question)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Question.'
            });
        });
};

// Retrieve all Question from the database
exports.findAll = (req, res) => {
    Question.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Question.'
            });
        });
};

// Search for a Question by text
exports.findByName = (req, res) => {
    // Get the text from the URL parameters
    const questionText = req.params.text;

    // Validate if a text was passed
    if (!questionText) {
        return res.status(400).send({
            message: 'Question text must be provided.'
        });
    }

    // Perform search with LIKE operator (case insensitive search)
    Question.findAll({
        where: {
            text: {
                [Op.like]: `%${questionText}%` // Partial match with LIKE
            }
        }
    })
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send({
                    message: `No Question found with text ${questionText}.`
                });
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving the Question.'
            });
        });
};

// Retrieve all Question from the database
exports.findBySurveyId = (req, res) => {
    const id = req.params.id;

    Question.findAll({ where: { surveyId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Question.'
            });
        });
};

// Retrieve all Question from the database
exports.findByQuestionTypeId = (req, res) => {
    const id = req.params.id;

    Question.findAll({ where: { questionTypeId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Question.'
            });
        });
};

// Find a single Question with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Question.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Question with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving Question with id=' + id
            });
        });
};

// Update a Question by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    // Update updatedAt with current date and time only when the Question is updated
    req.body.updatedAt = new Date();

    Question.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Question was updated successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update Question with id=${id}. Maybe Question was not found or req.body is empty.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating Question with id=' + id
            });
        });
};

// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Question.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Question was deleted successfully.'
                });
            } else {
                res.send({
                    message: `Cannot delete Question with id=${id}. Maybe Question was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete Question with id=' + id
            });
        });
};
