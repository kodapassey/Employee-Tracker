const inquirer = require('inquirer');
const db = require('../db/connection');
const Department = require('./departmentRoutes')

class role extends Department {

    constructor() {
        this.title = '';
        this.salary = '';
    }

    getAllRoles() {
        console.log('Showing all roles');

        const sql = `SELECT role.id, role.title, role.salary, department.name AS department
                   FROM role
                   INNER JOIN department ON role.department_id = department.id`;

        db.query(sql, (err, rows) => {
            if (err) throw err;
            console.table(rows);
            promptUser();
        });
    };



};


function addRole() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: "What role do you want to add?",
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter a role');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary of this role?",
            validate: addSalary => {
                if (addSalary) {
                    return true;
                } else {
                    console.log('Please enter a salary');
                    return false;
                }
            }
        }
    ])
        .then(answer => {
            const params = [answer.role, answer.salary];

            // grab dept from department table
            const roleSql = `SELECT name, id FROM department`;

            db.query(roleSql, (err, data) => {
                if (err) throw err;

                const dept = data.map(({ name, id }) => ({ name: name, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'dept',
                        message: "What department is this role in?",
                        choices: dept
                    }
                ])
                    .then(deptChoice => {
                        const dept = deptChoice.dept;
                        params.push(dept);

                        const sql = `INSERT INTO role (title, salary, department_id)
                                VALUES (?, ?, ?)`;

                        db.query(sql, params, (err, result) => {
                            if (err) throw err;
                            console.log('Added' + answer.role + " to roles!");

                        });
                    });
            })
        });
};

console.log(addRole());