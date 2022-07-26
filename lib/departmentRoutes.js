const db = require('../db/connection');
const inquirer = require('inquirer');

class Department {
    constructor() { }

    getAllDepartments() {
        console.log('Showing All Departments');

        const sql = `SELECT * FROM department`;

        db.query(sql, (err, rows) => {
            if (err) throw err;
            console.table(rows);
            promptUser();
        });
    };

    addDepartment() {
        return inquirer.prompt([
            {
                type: 'text',
                name: 'name',
                message: "What is the name of the department you'd like to add?"
            }
        ])
    };
}

module.exports = Department;