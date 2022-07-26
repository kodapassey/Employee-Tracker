const Role = require('./lib/roleRoutes');
const inquirer = require('inquirer');

async function promptUser() {
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
        .then((answers) => {
            const { choices } = answers;

            if (choices === 'View all roles') {
                Role.getAllRoles();
            } else if (choices === 'Add a role') {
                Role.addRole();
            }
        });
}

promptUser();

// module.exports = { promptUser };