module.exports = (sequelize, Sequelize) => {
    const SystemUser = sequelize.define('systemuser', {
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
        loginName: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                notNull: true,
                notNull: {
                    msg: 'Login name is required'
                },
                len: {
                    args: [1, 100],
                    msg: 'Login name must be between 1 and 100 characters'
                }
            }
        },
        firstName: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true,
                notNull: {
                    msg: 'First name is required'
                },
                len: {
                    args: [1, 100],
                    msg: 'First name must be between 1 and 100 characters'
                }
            }
        },
        lastName: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true,
                notNull: {
                    msg: 'Last name is required'
                },
                len: {
                    args: [1, 100],
                    msg: 'Last name must be between 1 and 100 characters'
                }
            }
        },
        emailAddress: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                notNull: true,
                notNull: {
                    msg: 'Email address is required'
                },
                isEmail: true,
                isEmail: {
                    msg: 'Must be a valid email address'
                },
                len: {
                    args: [1, 100],
                    msg: 'Email address must be between 1 and 100 characters'
                }
            }
        },
        phoneNumber: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                notNull: true,
                notNull: {
                    msg: 'Phone number is required'
                },
                len: {
                    args: [1, 20],
                    msg: 'Phone number must be between 1 and 20 characters'
                }
            }
        },
        passwordHash: {
            type: Sequelize.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true,
                notNull: {
                    msg: 'Password hash is required'
                },
                len: {
                    args: [1, 255],
                    msg: 'Password hash must be between 1 and 255 characters'
                }
            }
        },
        status: {
            type: Sequelize.STRING(50),
            allowNull: false,
            defaultValue: 'Active',
            validate: {
                notEmpty: true,
                notNull: true,
                notNull: {
                    msg: 'Status is required'
                },
                isIn: {
                    args: [['Active', 'Inactive', 'Suspended']],
                    msg: 'Status must be one of: Active, Inactive, Suspended'
                },
                len: {
                    args: [1, 50],
                    msg: 'Status must be between 1 and 50 characters'
                }
            }
        },
        tokenVersion: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1,
            validate: {
                notEmpty: true,
                notNull: true,
                notNull: {
                    msg: 'Token version is required'
                },
                isInt: true,
                min: 1
            }
        },
        profilePicture: {
            type: Sequelize.STRING(255),
            allowNull: true,
            // unique: true,
            validate: {
                // isUrl: true,
                len: {
                    args: [0, 255],
                    msg: 'Profile picture path must be between 0 and 255 characters'
                }
            }
        },
        lastLoginAt: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
                isDate: true,
                isDate: {
                    msg: 'Must be a valid date'
                }
            }
        },
        lastPasswordChangeAt: {
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
        tableName: 'SystemUser',
        freezeTableName: true,
        underscored: false,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_spanish_ci',
        indexes: [
            {
                name: 'AK_SystemUser_LoginName',
                unique: true,
                fields: ['loginName']
            },
            {
                name: 'AK_SystemUser_EmailAddress',
                unique: true,
                fields: ['emailAddress']
            },
            {
                name: 'AK_SystemUser_PhoneNumber',
                unique: true,
                fields: ['phoneNumber']
            }
        ]
    });

    SystemUser.associate = function (models) {
        SystemUser.hasMany(models.response, {
            foreignKey: 'systemUserId'
        });

        SystemUser.belongsToMany(models.role, {
            through: models.systemuserrole,
            foreignKey: 'systemUserId',
            otherKey: 'roleId',
        });

        SystemUser.hasMany(models.systemuserrole, {
            foreignKey: 'systemUserId'
        });
    };

    return SystemUser;
};
