module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('role', {
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
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                notNull: {
                    msg: 'Name is required'
                },
                isIn: {
                    args: [['System Administrator', 'Survey Manager', 'Respondent']],
                    msg: 'Name must be one of: System Administrator, Survey Manager, Respondent'
                },
                len: {
                    args: [1, 50],
                    msg: 'Name must be between 1 and 50 characters'
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
        tableName: 'Role',
        freezeTableName: true,
        underscored: false,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_spanish_ci',
        indexes: [
            {
                name: 'AK_Role_Name',
                unique: true,
                fields: ['name']
            }
        ]
    });

    Role.associate = function (models) {
        Role.belongsToMany(models.systemuser, {
            through: models.systemuserrole,
            foreignKey: 'roleId',
            otherKey: 'systemUserId',
        });

        Role.hasMany(models.systemuserrole, {
            foreignKey: 'roleId'
        });
    };

    return Role;
};
