// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config(); //allows us to execute when we use connection.js and all .env data is avaiable at process.end.variableName

// create new connection to our database, pass in your MySQL information for username and password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });

module.exports = sequelize;