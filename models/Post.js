const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create our post model
class Post extends Model {}