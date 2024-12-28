module.exports = (sequelize, Sequelize) => {
    const QuestionOption = sequelize.define('questionoption', {
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
        value: {
            type: Sequelize.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: {
                    msg: 'Value is required'
                },
                len: {
                    args: [1, 255],
                    msg: 'Value must be between 1 and 255 characters'
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
        tableName: 'QuestionOption',
        freezeTableName: true,
        underscored: false,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_spanish_ci',
        indexes: [
            {
                name: 'AK_QuestionOption_QuestionId_Order',
                unique: true,
                fields: ['questionId', 'order']
            },
            {
                name: 'AK_QuestionOption_QuestionId_Value',
                unique: true,
                fields: ['questionId', 'value']
            }
        ]
    });

    QuestionOption.associate = function (models) {
        QuestionOption.belongsTo(models.question, {
            foreignKey: {
                name: 'questionId',
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
    };

    return QuestionOption;
};
