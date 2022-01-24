//collecting the packaged group of API endpoints and prefixing them with the path /api
const router = require('express').Router();

const userRoutes = require('./user-routes.js');

router.use('/users', userRoutes);

module.exports = router;