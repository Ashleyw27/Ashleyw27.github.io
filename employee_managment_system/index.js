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
          "Add Department",
          "Add Role",
          "Update Employee's Role",
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
      else if (answer.begin === "Add Department") {
        addDept();
      }
      else if (answer.begin === "Add Role") {
        addRole();
      }
      else if (answer.begin === "Update Employee's Role") {
        updateRole();
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
  var sql = "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id)"
  connection.query(sql, function (err, result) {
    if (err) throw err;

    console.table(result);
    start();
  });
}

//View all employees by department
//========================================
function viewEmpDepartment() {
  var sql = "SELECT department FROM department"
  connection.query(sql, function (err, result) {
    if (err) throw err;

    var deptArray = [];

    for (var i = 0; i < result.length; i++) {
      var choices = result[i].department;

      deptArray.push(choices);
    }
    inquirer
      .prompt({
        name: "department",
        type: "list",
        message: "Which department would you like to see employees for?",
        choices: deptArray
      })
      .then(function (answer) {
        var sql = "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id) WHERE department.department = ?"
        connection.query(sql, [answer.department], function (err, result) {
          if (err) throw err;

          console.table(result);
          start();
        });
      });
  });
}
//View all employees by role
//========================================
function viewEmpRole() {
  var sql = "SELECT title FROM roles"
  connection.query(sql, function (err, result) {
    if (err) throw err;

    var roleArray = [];

    for (var i = 0; i < result.length; i++) {
      var choices = result[i].title;

      roleArray.push(choices);
    }
    inquirer
      .prompt({
        name: "role",
        type: "list",
        message: "Which role would you like to see employees for?",
        choices: roleArray
      })
      .then(function (answer) {
        var sql = "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.department FROM ((employee INNER JOIN roles ON employee.role_id = roles.id) INNER JOIN department ON roles.department_id = department.id) WHERE title = ?"
        connection.query(sql, [answer.role], function (err, result) {
          if (err) throw err;

          console.table(result);
          start();
        });
      });
  });
}

//Add new employee
//========================================
function addEmployee() {
  var sql = "SELECT title, id FROM roles"
  connection.query(sql, function (err, result) {
    if (err) throw err;

    var roleArray = [];

    for (var i = 0; i < result.length; i++) {
      var choices = result[i].title + "-" + result[i].id;

      roleArray.push(choices);
    }

    var sql = "SELECT department, id FROM department"
    connection.query(sql, function (err, result) {
      if (err) throw err;

      var deptArray = [];

      for (var i = 0; i < result.length; i++) {
        var choices = result[i].department + "-" + result[i].id;

        deptArray.push(choices);
      }

      var sql = "SELECT manager_id FROM employee"
      connection.query(sql, function (err, result) {
        if (err) throw err;

        var managerArray = [];

        for (var i = 0; i < result.length; i++) {
          var choices = result[i]

          managerArray.push(choices);
        }

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
              choices: roleArray
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
              choices: deptArray
            },
            {
              name: "manager",
              type: "list",
              message: "Who is your employees manager?",
              choices: ["Dave", "Kaitlin", "Nick", "Carrie", "None"]
            }
          ])
          .then(function (answer) {
            var deptId = answer.dept.split("-");
            var sql = `INSERT INTO roles SET title = '${answer.title}', salary = '${answer.salary}', department_id = '${deptId[1]}'`
            connection.query(sql,
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
              manager_id = 0;
            }

            var roleId = answer.title.split("-");
            var sql = `INSERT INTO employee SET first_name = '${answer.first}', last_name = '${answer.last}', role_id = '${roleId[1]}', manager_id = '${manager_id}'`
            connection.query(sql,
              function (err, result) {
                if (err) throw err;

                console.log("=== New Employee Added ===");
                start();
              }
            );
          });
      });
    });
  })
}

//Add new Department
//========================================
function addDept() {
  inquirer
    .prompt([
      {
        name: "newDept",
        type: "input",
        message: "What department would you like to add?",
      }
    ])
    .then(function (answer) {
      var sql = "INSERT INTO department SET ?"
      connection.query(sql,
        {
          department: answer.newDept,
        },
        function (err, result) {
          if (err) throw err;
        }
      );
      console.log("=== New Department Added ===");
      start();
    });
}

//Add new Role
//========================================
function addRole() {
  var sql = "SELECT department, id FROM department"
  connection.query(sql, function (err, result) {
    if (err) throw err;

    var deptArray = [];

    for (var i = 0; i < result.length; i++) {
      var choices = result[i].department + "-" + result[i].id;

      deptArray.push(choices);
    }
    inquirer
      .prompt([
        {
          name: "newRole",
          type: "input",
          message: "What role would you like to add?",
        },
        {
          name: "pay",
          type: "input",
          message: "What is the salary for this role?"
        },
        {
          name: "dept",
          type: "list",
          message: "What department is this role in?",
          choices: deptArray
        }
      ])
      .then(function (answer) {
        var deptId = answer.dept.split("-");
        var sql = `INSERT INTO roles SET title = '${answer.newRole}', salary = '${answer.pay}', department_id = '${deptId[1]}'`
        connection.query(sql,
          function (err, result) {
            if (err) throw err;
          }
        );
        console.log("=== New Role Added ===");
        start();
      });
  });
}

//Update employee role
//========================================
function updateRole() {
  var sql = "SELECT first_name, last_name FROM employee"
  connection.query(sql, function (err, result) {
    if (err) throw err;

    var choiceArray = [];

    for (var i = 0; i < result.length; i++) {
      var choices = result[i].first_name + " " + result[i].last_name;

      choiceArray.push(choices);
    }

    var sql = "SELECT title, id FROM roles"
    connection.query(sql, function (err, result) {
      if (err) throw err;

      var roleArray = [];

      for (var i = 0; i < result.length; i++) {
        var choices = result[i].title + "-" + result[i].id;

        roleArray.push(choices);
      }

      inquirer
        .prompt([{
          name: "employee",
          type: "list",
          message: "Which employee would you like to update?",
          choices: choiceArray
        },
        {
          name: "newTitle",
          type: "list",
          message: "What is the employee's new role?",
          choices: roleArray
        }])
        .then(function (answer) {
          console.log(answer.employee);

          var firstName = answer.employee.split(" ");
          var newRole = answer.newTitle.split("-");
          var sql = `UPDATE employee SET role_id = ${newRole[1]} WHERE first_name = '${firstName[0]}'`
          connection.query(sql,
            function (err, result) {
              if (err) throw err;

              console.log("=== Updated Employee ===");
              start();
            }
          )
        });
    });
  });

}