const util = require("util");
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { start } = require("repl");

const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "employeeDB_admin",
        password: "EmployeeRecorder",
        database: "employees",
    }
);

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start () {
    inquirer
        .prompt({
            name: "employeeList",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Info",
                "View Departments",
                "Exit",

            ],
        })
.then((answer) => {
    if (answer.employeeList === "View All Employees"){
        viewAllEmployees();
    } else if (answer.employeeList === "Add Employee") {
        addEmployeePrompt();
    } else if (answer.employeeList === "Update Employee Info") {
        updateEmployee();
    } else if (answer.employeeList === "View Departments") {
        viewDepartments
    } else if (answer.employeeList === "Exist") {
        connection.end();
    }
});
}

function addEmployeePrompt() {
    console.log("Working");
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is your first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is your last name?"
            },
            {
                name: "idNumber",
                type: "input",
                message: "What is your ID?",
            },
            {
                name: "manager",
                type: "input",
                message: "Who is your manager?",
            },
            {
                name: "title",
                type: "input",
                message: "What is your title?",
            },
            {
                name: "salary",
                type: "input",
                message: "What is your salary?",
            },
            {
                name: "department",
                type: "input",
                message: "What is your department?",
            },
            {
                name: "departmentId",
                type: "input",
                message: "What is your department Id?",
            }
        ])

    .then((answers) => {
        connection.query("INSERT INTO employee_info SET ?", {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.roleId,
            manager_name: answers.manager,
        });
        connection.query("INSERT INTO roles SET ?", {
            title: answers.title,
            salary: answers.salary,
            department_id: answers.departmentId,
        });
        connection.query("INSERT INTO deparment SET ?", {
            title: answers.departmentName,
            department_id: answers.departmentId,
        });
        start();
    });
}

function viewAllEmployees () {
    connection.query("SELECT * FROM employee_info", function (err, results){
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: "choice",
                type: "rawlist",
                message: "Which Employee Record will you change?",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].id);
                    }
                    return choiceArray;
                },
            },
            {
                name: "firstName",
                type: "input",
                message: "What is your first name?",
            },
            {
                name: "lastName",
                type: "input",
                message: "What is your last name?",
            },
            {
                name: "idNumber",
                type: "input",
                message: "What is your id number?",
            },
            {
                name: "manager",
                type: "input",
                message: "Who is your manager?",
            },
            {
                name: "title",
                type: "input",
                message: "What is your title?",
            },
            {
                name: "salary",
                type: "input",
                message: "What is your salary",
            },
            {
                name: "department",
                type: "input",
                message: "What is your department?",
            },
            {
                name: "departmentId",
                type: "input",
                message: "What is your department ID?",
            },
        ])
        .then((answers) => {
            var chosenItem;
            for (var i = 0; i <results.length; i++) {
                if (results[i].id === answers.choice) {
                    chosenItem = results[i];
                }
            }
            connection.query("UPDATE employee_info SET ? WHERE ?", [
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    id_numbers: answers.idNumbers,
                    manager_name: answers.manager,
                },
                {
                    id: chosenItem.id,
                },
            ]);
            connection.query("UPDATE roles SET ? WHERE ?", [
                {
                    title: answers.title,
                    salary: answers.salary,
                    department_id: answers.departmentId,
                },
                {
                    id: chosenItem.id
                },
            ]);
            connection.query("UPDATE department SET ? WHERE ?" , [
                {
                    name: answers.departmentName,
                    department_id: answers.departmentId,
                },
                {
                    id: chosenItem.id,
                },
            ]);
            start();
        });
    });
}

module.exports = connections;