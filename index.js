const inquirer = require('inquirer');

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