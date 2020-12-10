const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'business_db'
  });

function promptUser() {
    inquirer.prompt(
        {
            type: "list", 
            name: "choices",
            message: "Hello! Please select one of the following options: ", 
            choices: [
                "View all Departments", 
                "View all Roles", 
                "View all Employees", 
                "Add a Department", 
                "Add a Role", 
                "Add an Employee",
                "Update an existing employee role",
            ],
        }
    ).then((answers) => {
        console.log(answers);
    });
}

promptUser();


// to start the mysql server run 'mysql -u root -p' and then do source db/schema.sql and to check do 'show databases;' and 'show tables;'