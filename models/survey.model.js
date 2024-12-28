module.exports = (sequelize, Sequelize) => {
    const Survey = sequelize.define('survey', {
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
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                notNull: {
                    msg: 'Name is required'
                },
                len: {
                    args: [1, 255],
                    msg: 'Name must be between 1 and 255 characters'
                }
            }
        },
        description: {
            type: Sequelize.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: {
                    msg: 'Description is required'
                },
                len: {
                    args: [1, 255],
                    msg: 'Description must be between 1 and 255 characters'
                }
            }
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true,
                notNull: {
                    msg: 'Start date is required'
                },
                isDate: true,
                isDate: {
                    msg: 'Must be a valid date'
                }
            }
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
                isDate: true,
                isDate: {
                    msg: 'Must be a valid date'
                }
            }
        },
        minResponses: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true,
            validate: {
                isInt: true,
                min: 0
            }
        },
        maxResponses: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true,
            validate: {
                isInt: true,
                min: 0
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
        tableName: 'Survey',
        freezeTableName: true,
        underscored: false,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_spanish_ci',
        indexes: [
            {
                name: 'AK_Survey_Name',
                unique: true,
                fields: ['name']
            }
        ]
    });

    Survey.associate = function (models) {
        Survey.belongsTo(models.surveystatus, {
            foreignKey: {
                name: 'surveyStatusId',
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        Survey.hasMany(models.question, {
            foreignKey: 'surveyId'
        });
    };

    return Survey;
};
