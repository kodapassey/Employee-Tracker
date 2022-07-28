const prompt = require('../server');
const inquirer = require('inquirer');
const db = require('../db/connection');



function getAllRoles() {
    console.log('Showing all roles');

    const sql = `SELECT role.id, role.title, role.salary, department.name as department
    FROM role
    INNER JOIN department on role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
    });
};


function addRole() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: "What role do you want to add?",
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary of this role?",
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
                            console.log(`Added ${answer.role} to roles!`);

                        });
                    });
            })
        });
};

module.exports = { getAllRoles, addRole };