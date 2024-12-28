module.exports = (sequelize, Sequelize) => {
    const SurveyStatus = sequelize.define('surveystatus', {
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
        status: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                notNull: {
                    msg: 'Status is required'
                },
                isIn: {
                    args: [['Planned', 'Open', 'Closed', 'Suspended']],
                    msg: 'Status must be one of: Planned, Open, Closed, Suspended'
                },
                len: {
                    args: [1, 50],
                    msg: 'Status must be between 1 and 50 characters'
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
        tableName: 'SurveyStatus',
        freezeTableName: true,
        underscored: false,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_spanish_ci',
        indexes: [
            {
                name: 'AK_SurveyStatus_Status',
                unique: true,
                fields: ['status']
            }
        ]
    });

    SurveyStatus.associate = function (models) {
        SurveyStatus.hasMany(models.survey, {
            foreignKey: 'surveyStatusId'
        });
    };

    return SurveyStatus;
};
