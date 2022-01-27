//this file collects and exports user model data with prefixes
//serves as a means to collect all of the API routes and package them up for us

//import user file
const User = require('./User');
const Post = require("./Post");

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
  });

//define relationship of post model to the user
Post.belongsTo(User, {
    foreignKey: 'user_id', //post can belong to only one user
});

//export an object with user file as a property
module.exports = { User, Post };