/* module.exports = {
    DB: 'onlinesurveymanagementsystem',
    USER: 'root',
    PASSWORD: 'nuts55.JBY',
    dialect: 'mysql',
    HOST: 'localhost',
    pool: {
        min: 0,
        max: 5,
        idle: 10000,
        acquire: 30000,
    }
}; */

require('dotenv').config();

module.exports = {
    development: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql'
    },
    test: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql'
    },
    production: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
}
