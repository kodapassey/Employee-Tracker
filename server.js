const Role = require('./lib/roleRoutes');
const Employee = require('./lib/employeeRoutes');
const Department = require('./lib/departmentRoutes')
const inquirer = require('inquirer');

function promptUser() {
    console.log('Welcome To Employee Tracker!')

    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices:
                ['View all departments', 'Add a department',
                    'View all roles', 'Add a role',
                    'View all employees', 'Add an employee', 'Update an employee']
        }
    ])
        .then((answer) => {
            const { choices } = answer;

            if (choices === 'View all departments') {
                Department.getAllDepartments();
            } else if (choices === 'Add a department') {
                Department.addDepartment();
            } else if (choices === 'View all roles') {
                Role.getAllRoles();
            } else if (choices === 'Add a role') {
                Role.addRole();
            } else if (choices === 'View all employees') {
                Employee.getAllEmployees();
            } else if (choices === 'Add an employee') {
                Employee.addEmployee();
            } else if (choices === 'Update an employee') {
                Employee.updateEmployee();
            }
        });
};

promptUser();

// module.exports = { promptUser };