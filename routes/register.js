const express = require('express');
const router = express.Router();
const register_controller = require('../controllers/register_controller');

router.post('/', register_controller.handle_new_user);

module.exports = router;

