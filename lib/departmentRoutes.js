const db = require('../db/connection');
const inquirer = require('inquirer');


function getAllDepartments() {
    console.log('Showing All Departments');

    const sql = `SELECT department.id AS id, department.name AS department FROM department`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
    });
};

function addDepartment() {
    return inquirer.prompt([
        {
            type: 'text',
            name: 'name',
            message: "What is the name of the department you'd like to add?"
        }
    ]).then(answer => {
        const params = [answer.name]

        const sql = `INSERT INTO department (name)
                VALUES(?)`;

        db.query(sql, params, (err, rows) => {
            if (err) throw err;

            console.log(`Added ${answer.name} to departments!`)
        });
    })
};
module.exports = { getAllDepartments, addDepartment };