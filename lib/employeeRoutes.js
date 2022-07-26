const inquirer = require('inquirer');
const db = require('../db/connection');

function getAllEmployees() {
    console.log('Showing all employees')

    const sql = `SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.name AS department,
    role.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`



    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
    })
}

function addEmployee() {
    return inquirer.prompt([
        {
            type: 'text',
            name: 'firstName',
            message: "What is the first name of the employee you'd like to add?"
        },
        {
            type: 'text',
            name: 'lastName',
            message: "What is the last name of the employee you'd like to add?"
        }
    ]).then(answer => {
        const params = [answer.firstName, answer.lastName]

        const roleSql = `SELECT title, id FROM role`;

        db.query(roleSql, (err, data) => {
            if (err) throw err;

            const roles = data.map(({ id, title }) => ({ name: title, value: id }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'What role is this employee?',
                    choices: roles
                }
            ]).then(roleChoice => {
                const role = roleChoice.role;
                params.push(role);

                const managerSql = `SELECT * FROM employee`;

                db.query(managerSql, (err, data) => {
                    if (err) throw err;

                    const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: "Who is the employee's manager?",
                            choices: managers
                        }
                    ])
                        .then(managerChoice => {
                            const manager = managerChoice.manager;
                            params.push(manager);

                            const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES(?, ?, ?, ?)`;

                            db.query(sql, params, (err, result) => {
                                if (err) throw err;
                                console.log("Employee has been added!")
                            })
                        })
                })
            })
        })
    })
};


module.exports = { getAllEmployees, addEmployee };