const express = require('express');
const router = express.Router();
const logout_controller = require('../controllers/logout_contoller')

router.get('/', logout_controller.handleLogOut);

module.exports = router;