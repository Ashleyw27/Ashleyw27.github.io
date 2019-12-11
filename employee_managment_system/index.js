//Requiring npm packages
//========================================
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");
var CFonts = require("cfonts");

//Title section
//========================================
CFonts.say('Employee|Manager!', {
  font: 'block',
  align: 'center',
  colors: ['system'],
  background: 'transparent',
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: '0',
});

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
      choices:
        [
          "View All Employees",
          "View Employees by Department",
          "View Employees by Role",
          "Add Employee",
          "Update Employee's Role",
          // "Remove Employee",
          "Quit"
        ]
    })
    .then(function (answer) {
      // based on their answer, call the function
      if (answer.begin === "View All Employees") {
        viewAllEmp();
      }
      else if (answer.begin === "View Employees by Department") {
        viewEmpDepartment();
      }
      else if (answer.begin === "View Employees by Role") {
        viewEmpRole();
      }
      else if (answer.begin === "Add Employee") {
        addEmployee();
      }
      else if (answer.begin === "Update Employee's Role") {
        updateRole();
      }
      // else if (answer.begin === "Remove Employee") {
      //   removeEmp();
      // }
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
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id)", function (err, result) {
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
        connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id) WHERE department = ?", [answer.department], function (err, result) {
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
      choices:
        [
          "Divisional Sales Manager",
          "Sales Assistant",
          "Product Manager",
          "Associate Product Manager",
          "Design Engineer",
          "Associate Engineer",
          "Marketing Manager",
          "Associate Marketing Manager"
        ]
    })
    .then(function (answer) {
      if (answer.role === "Divisional Sales Manager" || "Sales Assistant" || "Product Manager" || "Associate Product Manager" || "Design Engineer" || "Associate Engineer" || "Marketing Manager" || "Associate Marketing Manager") {
        connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id) WHERE title = ?", [answer.role], function (err, result) {
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
        choices:
          [
            "Divisional Sales Manager",
            "Sales Assistant",
            "Product Manager",
            "Associate Product Manager",
            "Design Engineer",
            "Associate Engineer",
            "Marketing Manager",
            "Associate Marketing Manager"
          ]
      },
      {
        name: "salary",
        type: "input",
        message: "What is your employees salary?"
      },
      {
        name: "dept",
        type: "list",
        message: "What is your employees department?",
        choices: ["Sales", "Product", "Engineering", "Marketing"]
      },
      {
        name: "manager",
        type: "list",
        message: "Who is your employees manager?",
        choices: ["Dave", "Kaitlin", "Nick", "Carrie", "None"]
      }
    ])
    .then(function (answer) {

      var dept_id;
      if (answer.dept === "Sales") {
        dept_id = 1;
      }
      else if (answer.dept === "Product") {
        dept_id = 2;
      }
      else if (answer.dept === "Engineering") {
        dept_id = 3;
      }
      else if (answer.dept === "Marketing") {
        dept_id = 4;
      }

      connection.query("INSERT INTO roles SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: dept_id
        },
        function (err, result) {
          if (err) throw err;
        }
      );

      var manager_id;
      if (answer.manager === "Dave") {
        manager_id = 1;
      }
      else if (answer.manager === "Kaitlin") {
        manager_id = 2;
      }
      else if (answer.manager === "Nick") {
        manager_id = 3;
      }
      else if (answer.manager === "Carrie") {
        manager_id = 4;
      }
      else if (answer.manager === "None") {
        manager_id = null;
      }

      var role_id;
      if (answer.title === "Divisional Sales Manager") {
        role_id = 1;
      }
      else if (answer.title === "Sales Assistant") {
        role_id = 2;
      }
      else if (answer.title === "Product Manager") {
        role_id = 3;
      }
      else if (answer.title === "Associate Product Manager") {
        role_id = 4;
      }
      else if (answer.title === "Design Engineer") {
        role_id = 5;
      }
      else if (answer.title === "Associate Engineer") {
        role_id = 6;
      }
      else if (answer.title === "Marketing Manager") {
        role_id = 7;
      }
      else if (answer.title === "Associate Marketing Manager") {
        role_id = 8;
      }

      connection.query("INSERT INTO employee SET ?",
        {
          first_name: answer.first,
          last_name: answer.last,
          role_id: role_id,
          manager_id: manager_id
        },
        function (err, result) {
          if (err) throw err;

          console.log("=== New Employee Added ===");
          start();
        }
      );
    });
}

//Update employee role
//========================================
function updateRole() {
  connection.query("SELECT first_name, last_name FROM employee", function (err, result) {
    if (err) throw err;

    var choiceArray = [];

    for (var i = 0; i < result.length; i++) {
      var choices = result[i].first_name + " " + result[i].last_name;

      choiceArray.push(choices);
    }
    inquirer
      .prompt({
        name: "employee",
        type: "list",
        message: "Which employee would you like to update?",
        choices: choiceArray
      },
        {
          name: "newTitle",
          type: "list",
          message: "What is the employee's new role?",
          choices:
            [
              "Divisional Sales Manager",
              "Sales Assistant",
              "Product Manager",
              "Associate Product Manager",
              "Design Engineer",
              "Associate Engineer",
              "Marketing Manager",
              "Associate Marketing Manager"
            ]
        })
      .then(function (answer) {
        console.log(answer.employee);
        var role_id;
        if (answer.newTitle === "Divisional Sales Manager") {
          role_id = 1;
        }
        else if (answer.newTitle === "Sales Assistant") {
          role_id = 2;
        }
        else if (answer.newTitle === "Product Manager") {
          role_id = 3;
        }
        else if (answer.newTitle === "Associate Product Manager") {
          role_id = 4;
        }
        else if (answer.newTitle === "Design Engineer") {
          role_id = 5;
        }
        else if (answer.newTitle === "Associate Engineer") {
          role_id = 6;
        }
        else if (answer.newTitle === "Marketing Manager") {
          role_id = 6;
        }
        else if (answer.newTitle === "Associate Marketing Manager") {
          role_id = 6;
        }
        connection.query("UPDATE roles SET ? JOIN roles",
          {
            title: answer.newTitle
          },
          function (err, result) {
            if (err) throw err;
          },

          connection.query("UPDATE employee SET ?",
            {
              role_id: role_id
            },
            function (err, result) {
              if (err) throw err;

              console.log("=== Updated Employee ===");
              start();
            }
          )
        )
      });
  })
}

//Remove employee
//========================================
// function removeEmp() {
//   connection.query("SELECT first_name, last_name FROM employee", function (err, result) {
//     if (err) throw err;

//     var choiceArray = [];

//     for (var i = 0; i < result.length; i++) {
//       var choices = result[i].first_name + " " + result[i].last_name;
//       choiceArray.push(choices);
//     }
//     inquirer
//       .prompt({
//         name: "remove",
//         type: "list",
//         message: "Which employee would you like to remove?",
//         choices: choiceArray
//       })
//       .then(function (answer) {
//         connection.query("DELETE FROM employee WHERE ?",
//           {
//             first_name: answer.choiceArray
//           },
//           function (err, result) {
//             if (err) throw err;

//             console.log("=== Employee has been Removed ===");
//             start();
//           });
//       });
//   });
// }