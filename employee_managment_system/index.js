//Requiring npm packages
//========================================
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

//Creating database connection
//========================================
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: process.env.PORT || 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employeeDB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("====EMPLOYEE DATABASE====");
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
      choices: ["View All Employees", "View All Employees by Department", "View All Employees by Role", "Add Employee", "Update Employee's Role", "Remove Employee", "Quit"]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.begin === "View All Employees") {
        viewAllEmp();
      }
      else if (answer.begin === "View All Employees by Department") {
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
      else if (answer.begin === "Remove Employee") {
        removeEmp();
      }
      else if (answer.begin === "Quit") {
        console.log("====Goodbye====");
      }
      else {
        connection.end();
      }
    });
}

//View all employees
//========================================
function viewAllEmp() {
  connection.query("SELECT * FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department ON roles.department_id = department.id", function (err, result) {
    if (err) throw err;

    console.table(result);
    start();
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
    .then(function (answer) {
      if (answer.department === "Sales" || "Product" || "Engineering" || "Marketing") {
        connection.query("SELECT * FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department ON roles.department_id = department.id WHERE department.department = ?", [answer.department], function (err, result) {
          if (err) throw err;

          console.table(result);
          start();
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
    .then(function (answer) {
      if (answer.role === "Divisional Sales Manager" || "Sales Assistant" || "Product Manager" || "Associate Product Manager" || "Design Engineer" || "Associate Engineer" || "Marketing Manager" || "Associate Marketing Manager") {
        connection.query("SELECT * FROM employee INNER JOIN roles ON employee.role_id = roles.id WHERE title = ?", [answer.role], function (err, result) {
          if (err) throw err;

          console.table(result);
          start();
        });
      }
    });
}

//Add new employee
//========================================
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "What is your employees first name?"
      },
      {
        name: "last",
        type: "input",
        message: "What is your employees last name?"
      },
      {
        name: "title",
        type: "list",
        message: "What is your employees role?",
        choices: ["Divisional Sales Manager", "Sales Assistant", "Product Manager", "Associate Product Manager", "Design Engineer", "Associate Engineer", "Marketing Manager", "Associate Marketing Manager"]
      }
      // {
      //   name: "manager",
      //   type: "list",
      //   message: "Who is your employees manager?",
      //   choices: ["Dave", "Kaitlin", "Nick", "Carrie"]
      // }
    ])
    .then(function (answer) {
      connection.query("INSERT INTO role SET ?",
        {
          title: answer.role
        },
        function (err, result) {
          if (err) throw err;
        }
      );
      connection.query("INSERT INTO employee SET ?",
        {
          first_name: answer.first,
          last_name: answer.last,
          // manager_id: answer.manager
        },
        function (err, result) {
          if (err) throw err;

          console.table(result);
          start();
        }
      );
    });
}

//Update employee role
//========================================
function updateRole() {
  inquirer
    .prompt({
      name: "role",
      type: "list",
      message: "Which employee would you like to update?",
      choices: ["Divisional Sales Manager", "Sales Assistant", "Product Manager", "Associate Product Manager", "Design Engineer", "Associate Engineer", "Marketing Manager", "Associate Marketing Manager"]
    })
  // .then(function (answer)

}

//Remove employee
//========================================
function removeEmp() {
  inquirer
  .prompt({
    name: "remove",
    type: "list",
    message: "Which employee would you like to remove?",
  })
}