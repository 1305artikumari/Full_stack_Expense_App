const sequenlize = require('sequelize');
const mysql = new sequenlize('example', 'root', 'Arti@123', {
    host: 'localhost',
    dialect: 'mysql'
})
module.exports = mysql;
