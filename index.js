const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: '',
    database: 'business_db'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log("Connected to the database!");
    promptUser();
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
                "Exit",
            ],
        }
    ).then(function (answers) {
        console.log(answers);
        executeRequest(answers.choices);
    });
}

function executeRequest(res) {
    if (res === "View all Departments") {
        viewDepartments();
    }

    else if (res === "View all Roles") {
        viewRoles();
    }

    else if (res === "View all Employees") {
        viewEmployees();
    }

    else if (res === "Add a Department") {
        addDepartment();
    }

    else if (res === "Add a Role") {
        addRole();
    }
}

function viewDepartments() {
    console.log("Viewing all Departments...");
    connection.query("SELECT * FROM department",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            returnMenu();
        });
};

function viewRoles() {
    console.log("Viewing all Roles...");
    connection.query("SELECT * FROM role",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            returnMenu();
        });
};

function viewEmployees() {
    console.log("Viewing all Employees");
    connection.query("SELECT * FROM employee",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            returnMenu();
        });
}

function addDepartment() {
    console.log("Adding Department...");
    inquirer.prompt(
        {
            type: "input",
            name: "newDepartment",
            message: "What is the name of the department?",
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                }
                else {
                    console.log('Please enter the department name');
                }
            }
        }).then(function (answer) {
            connection.query("INSERT INTO department SET ?",
                { name: answer.newDepartment },
                function (err, res) {
                    if (err) throw err;
                    console.log("Department added!");
                    returnMenu();
                });
        });
};

function addRole() {
    console.log("Adding a role...");
    inquirer.prompt(
        {
          type: "input", 
          name: "title", 
          message: "What is the title of the role?", 
          validate: titleInput => {
            if (titleInput) {
                return true;
            }
            else {
                console.log("Please enter the role's title");
            }
        }
        }, 
        {
            type: "input", 
            name: "salary", 
            message: "What is this role's salary?",
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                }
                else {
                    console.log('Please enter the salary');
                }
            }
        }, 
        {
            type: "input", 
            name: "dept_id", 
            message: "Enter the department ID?", 
            validate: idInput => {
                if (idInput) {
                    return true;
                }
                else {
                    console.log('Please enter the department ID this role belongs to');
                }
            }
        }).then(function (answers) {
            connection.query("INSERT INTO role SET ?", 
            {
                title: answers.title, 
                salary: answers.salary, 
                department_id: answers.dept_id
            },
            function (err, res) {
                if (err) throw err;
                console.log("Role added!");
                returnMenu();
            });
        })
}



function returnMenu() {
    inquirer.prompt(
        {
            type: "confirm",
            name: "confirmMenu",
            message: "Would you like to return to the menu?",
            default: true
        },
    ).then(function (answers) {
        if (answers.confirmMenu) {
            promptUser();
        }
        else {
            exitApp();
        }
    });
}


function exitApp() {
    console.log("Goodbye");
}




// to start the mysql server run 'mysql -u root -p' and then do source db/schema.sql and to check do 'show databases;' and 'show tables;'