const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {},
    comment_text: {
        validate: {
        len: [1]
      }},
    user_id: {},
    post_id: {}
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = { User, Post, Vote, Comment };