'use strict';

// const dbConfig = require('../config/db.config.js');

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

/* const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: dbConfig.dialect,
    host: dbConfig.HOST,
    operatorsAliases: false,
    pool: {
        min: dbConfig.pool.min,
        max: dbConfig.pool.max,
        idle: dbConfig.pool.idle,
        acquire: dbConfig.pool.acquire,
    }
}); */

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/* db.surveystatuses = require('./surveystatus.model.js')(sequelize, Sequelize);
db.surveys = require('./survey.model.js')(sequelize, Sequelize);
db.questiontypes = require('./questiontype.model.js')(sequelize, Sequelize);
db.questions = require('./question.model.js')(sequelize, Sequelize);
db.questionoptions = require('./questionoption.model.js')(sequelize, Sequelize);
db.systemusers = require('./systemuser.model.js')(sequelize, Sequelize); */

/* db.surveystatuses.hasMany(db.surveys, {
    foreignKey: 'surveyStatusId'
}); */

/* db.surveys.belongsTo(db.surveystatuses, {
    foreignKey: {
        name: 'surveyStatusId',
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
}); */

//

/* db.surveys.hasMany(db.questions, {
    foreignKey: 'surveyId'
}); */

/* db.questions.belongsTo(db.surveys, {
    foreignKey: {
        name: 'surveyId',
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
}); */

// 

/* db.questiontypes.hasMany(db.questions, {
    foreignKey: 'questionTypeId'
}); */

/* db.questions.belongsTo(db.questiontypes, {
    foreignKey: {
        name: 'questionTypeId',
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
}); */

//

/* db.questions.hasMany(db.questionoptions, {
    foreignKey: 'questionId'
}); */

/* db.questionoptions.belongsTo(db.questions, {
    foreignKey: {
        name: 'questionId',
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
}); */

/* SurveyStatuses
Surveys
QuestionTypes
Questions
QuestionOptions */

module.exports = db;
