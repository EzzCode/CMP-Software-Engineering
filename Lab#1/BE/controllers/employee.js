const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  const index = employee.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Employee not found', data: id });
  }
  employee.splice(index, 1);
  res.status(200).json({ message: 'Employee deleted', data: id });
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;
  const newEmployee = { id, name };
  if (!id || !name) {
    return res.status(400).json({ message: 'Please provide id and name' });
  }
  if (employee.find((e) => e.id === id)) {
    return res.status(400).json({ message: 'Employee already exists' });
  }
  employee.push(newEmployee);
  res.status(201).json({ message: 'Employee created', data: newEmployee });
};
