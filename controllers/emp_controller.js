const info = {
  employee: require('../model/employee.json'),
  set_employee: function (info) {
    this.employee = info;
  }
};

const get_all_employees = (req, res) => {
  res.json(info.employee)
};

const add_employee = (req, res) => {
  const new_employee = {
    id: info.employee?.length ? info.employee[info.employee.length - 1].id + 1 : 1,
    passport: req.body.passport,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  }
  if (!new_employee.passport || !new_employee.firstname || !new_employee.lastname) {
    return res.status(400).json({ "error": "Bad request, please provide all the information" });
  }
  info.set_employee([...info.employee, new_employee]);
  res.status(201).json(info.employee);
}

const update_employee = (req, res) => {
  const found_emp = info.employee.find(employee => employee.id === parseInt(req.body.id));
  if (!found_emp) {
    return res.status(400).json({ "Error": `Could not find employee id corresponding to ${req.body.id}` });
  }
  const updated_emp = req.body;
  if (updated_emp.passport) found_emp.passport = updated_emp.passport;
  if (updated_emp.firstname) found_emp.firstname = updated_emp.firstname;
  if (updated_emp.lastname) found_emp.lastname = updated_emp.lastname;

  const filter_emp = info.employee.filter(employee => employee.id !== parseInt(req.body.id));
  const found_emp_inserted = [...filter_emp, found_emp];
  info.employee = found_emp_inserted.sort((first_item, second_item) => first_item.id > second_item.id ? 1 : first_item.id < second_item.id ? -1 : 0)
  res.status(200).json(info.employee);
};

const delete_employee = (req, res) => {
  const found_emp = info.employee.find(employee => employee.id === parseInt(req.body.id));
  if (!found_emp) {
    return res.status(400).json({ "Error": `Could not find employee id corresponding to ${req.body.id}` });
  }
  const filter_emp = info.employee.filter(employee => employee.id !== parseInt(req.body.id));
  info.set_employee([...filter_emp]);
  res.status(204).json(info.employee);
};

const get_emp_id = (req, res) => {
  const found_emp = info.employee.find(employee => employee.id === parseInt(req.params.id));
  if (!found_emp) {
    return res.status(400).json({ "Error": `Could not find employee id corresponding to ${req.body.id}` });
  }
  res.json(found_emp);
};

module.exports = {
  get_all_employees,
  add_employee,
  update_employee,
  delete_employee,
  get_emp_id,
};

