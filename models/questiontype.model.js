module.exports = (sequelize, Sequelize) => {
    const QuestionType = sequelize.define('questiontype', {
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
        type: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                notNull: {
                    msg: 'Type is required'
                },
                isIn: {
                    args: [['Open', 'Dropdown', 'Multiple Choice', 'Logical']],
                    msg: 'Type must be one of: Open, Dropdown, Multiple Choice, Logical'
                },
                len: {
                    args: [1, 50],
                    msg: 'Type must be between 1 and 50 characters'
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
        tableName: 'QuestionType',
        freezeTableName: true,
        underscored: false,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_spanish_ci',
        indexes: [
            {
                name: 'AK_QuestionType_Type',
                unique: true,
                fields: ['type']
            }
        ]
    });

    QuestionType.associate = function (models) {
        QuestionType.hasMany(models.question, {
            foreignKey: 'questionTypeId'
        });
    };

    return QuestionType;
};
