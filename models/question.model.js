module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define('question', {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            validate: {
                notNull: {
                    msg: 'Id is required'
                },
                isInt: true,
                min: 1
            }
        },
        order: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Order is required'
                },
                isInt: true,
                min: 1
            }
        },
        text: {
            type: Sequelize.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: {
                    msg: 'Text is required'
                },
                len: {
                    args: [1, 255],
                    msg: 'Text must be between 1 and 255 characters'
                }
            }
        },
        isMandatory: {
            type: Sequelize.STRING(3),
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: {
                    msg: 'Is mandatory is required'
                },
                isIn: {
                    args: [['No', 'Yes']],
                    msg: 'Is mandatory must be one of: No, Yes'
                },
                len: {
                    args: [1, 3],
                    msg: 'Is mandatory must be between 1 and 3 characters'
                }
            }
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            // defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            validate: {
                notEmpty: true,
                notNull: true,
                notNull: {
                    msg: 'Creation date is required'
                },
                isDate: true,
                isDate: {
                    msg: 'Must be a valid date'
                }
            }
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            // defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            // onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
            validate: {
                // notEmpty: true,
                // notNull: true,
                // notNull: {
                //     msg: 'Update date is required'
                // },
                isDate: true,
                isDate: {
                    msg: 'Must be a valid date'
                }
            }
        }
    }, {
        tableName: 'Question',
        freezeTableName: true,
        underscored: false,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_spanish_ci',
        indexes: [
            {
                name: 'AK_Question_SurveyId_Order',
                unique: true,
                fields: ['surveyId', 'order']
            },
            {
                name: 'AK_Question_SurveyId_Text',
                unique: true,
                fields: ['surveyId', 'text']
            }
        ]
    });

    Question.associate = function (models) {
        Question.belongsTo(models.survey, {
            foreignKey: {
                name: 'surveyId',
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        Question.belongsTo(models.questiontype, {
            foreignKey: {
                name: 'questionTypeId',
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        Question.hasMany(models.questionoption, {
            foreignKey: 'questionId'
        });
    };

    return Question;
};
