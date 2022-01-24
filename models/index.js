//this file collects and exports user model data with prefixes
//serves as a means to collect all of the API routes and package them up for us

//import user file
const User = require('./User');
//export an object with user file as a property
module.exports = { User };