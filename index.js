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

  connection.connect(function(err) {
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
}

function viewDepartments() {
    console.log("Viewing all Departments...");
    connection.query("SELECT * FROM department",
    function(err, res) {
        if (err) throw err;
        console.table(res);
        returnMenu();
      });
};

function viewRoles() {
    console.log("Viewing all Roles...");
    connection.query("SELECT * FROM role",
    function(err, res) {
        if (err) throw err;
        console.table(res);
        returnMenu();
      });
};

function viewEmployees() {
    console.log("Viewing all Employees");
    connection.query("SELECT * FROM employee",
    function(err, res) {
        if (err) throw err;
        console.table(res);
        returnMenu();
    });
}

// function addDepartment() {
    
// }

function returnMenu() {
    inquirer.prompt(
        {
            type: "confirm", 
            name: "confirmMenu", 
            message: "Would you like to return to the menu?",
            default: true
        },
    ) .then(function (answers) {
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