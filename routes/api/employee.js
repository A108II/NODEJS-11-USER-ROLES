const express = require('express');
const router = express.Router();
const emp_controller = require('../../controllers/emp_controller');
const ROLES_LIST = require('../../config/roles_list');
const rolesVerification = require('../../middleware/rolesVerification');
router.route('/')
  .get(emp_controller.get_all_employees)
  .post(rolesVerification(ROLES_LIST.User, ROLES_LIST.Editor), emp_controller.add_employee)
  .put(rolesVerification(ROLES_LIST.Editor), emp_controller.update_employee)
  .delete(rolesVerification(ROLES_LIST.Admin), emp_controller.delete_employee)
router.route('/:id')
  .get(emp_controller.get_emp_id)
  
module.exports = router;

























