module.exports = (sequelize, Sequelize) => {
    const Response = sequelize.define('response', {
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
        beginDate: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true,
                notNull: {
                    msg: 'Begin date is required'
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
        tableName: 'Response',
        freezeTableName: true,
        underscored: false,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_spanish_ci',
        indexes: [
            {
                name: 'AK_Response_SurveyId_SystemUserId',
                unique: true,
                fields: ['surveyId', 'systemUserId']

            }
        ]
    });

    Response.associate = function (models) {
        Response.belongsTo(models.survey, {
            foreignKey: {
                name: 'surveyId',
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        Response.belongsTo(models.systemuser, {
            foreignKey: {
                name: 'systemUserId',
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        Response.hasMany(models.answer, {
            foreignKey: 'responseId'
        });
    };

    return Response;
};
