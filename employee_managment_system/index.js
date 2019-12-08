//Requiring npm packages
//========================================
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
var express = require("express");

var app = express();
//Creating database connection
//========================================
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: process.env.PORT || 3306,

  // Your username
  user: "root",

  // Your password
  password: "SunBear69!",
  database: "employeeDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

//Start application
//========================================
function start() {
  inquirer
    .prompt({
      name: "begin",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Employees", "View All Employees by Department", "View All Employees by Role", "Add Employee", "Update Employee's Role", "Quit"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.begin === "View All Employees") {
        viewAllEmp();
      }
      else if(answer.begin === "View All Employees by Department") {
        viewEmpDepartment();
      } 
      else if (answer.begin === "View All Employees by Role") {
        viewEmpRole();
      }
      else if (answer.begin === "Add Employee") {
        addEmployee();
      }
      else if (answer.begin === "Update Employee's Role") {
        updateRole();
      }
      else if (answer.begin === "Quit") {
        start();
      }
      else{
        connection.end();
      }
    });
}

//View all employees
//========================================
function viewAllEmp() {
  connection.query("SELECT * FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department ON roles.department_id = department.id", function(err, result) {
    if (err) throw err;

    console.table(result);
  });
}

//View all employees by department
//========================================
function viewEmpDepartment() {
  inquirer
  .prompt({
    name: "department",
    type: "list",
    message: "Which department would you like to see employees for?",
    choices: ["Sales", "Product", "Engineering", "Marketing"]
  })
  .then(function(answer) {
    if (answer.department === "Sales" || "Product" || "Engineering" || "Marketing") {
      connection.query("SELECT * FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department ON roles.department_id = department.id WHERE department.name = ?", [answer.department], function(err, result) {
        if (err) throw err;
        
        console.table(result);
      });
    }
  });
}

//View all employees by role
//========================================
function viewEmpRole() {
  inquirer
  .prompt({
    name: "role",
    type: "list",
    message: "Which role would you like to see employees for?",
    choices: ["Divisional Sales Manager", "Sales Assistant", "Product Manager", "Associate Product Manager", "Design Engineer", "Associate Engineer", "Marketing Manager", "Associate Marketing Manager"]
  })
  .then(function(answer) {
    if (answer.role === "Divisional Sales Manager" || "Sales Assistant" || "Product Manager" || "Associate Product Manager" || "Design Engineer" || "Associate Engineer" || "Marketing Manager" || "Associate Marketing Manager") {
      connection.query("SELECT * FROM employee INNER JOIN roles ON employee.role_id = roles.id WHERE title = ?", [answer.role], function(err, result) {
        if (err) throw err;
        
        console.table(result);
      });
    }
  });
}
