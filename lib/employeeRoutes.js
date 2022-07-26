const db = require('../db/connection');

function getAllEmployees() {
    console.log('Showing all employees')

    const sql = `SELECT * FROM employee`

    db.quer
}