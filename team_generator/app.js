const inquirer = require("inquirer");
const fs = require("fs");

console.log("Build your team");

function manager() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your manager's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your manager's email?"
        },
        {
            type: "input",
            name: "office",
            message: "What is your manager's office number?"
        }

    ]).then(function (answers) {
        console.log(answers);
        Team();
        fs.writeFile("./main.html", `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
            <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet">
            <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
                integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
            <style>
                .jumbotron {
                    background-image: url(assets/images/background.jpg);
                    height: 300px;
                    position: center;
                    background-size: cover;
                }
        
                h1 {
                    font-family: 'Kaushan Script', cursive;
                    font-size: 136px;
                }
        
                .card-header {
                    background-color: rgb(152, 182, 169);           
                }
        
                .fa-briefcase {
                    font-size: 24px;
                }

                .fa-graduation-cap {
                    font-size: 24px;
                }
        
                p {
                    font-size: 28px;
                }
        
                li {
                    font-weight: bold;
                }
        
                .card {
                    margin: 10px, 20px, 10px, 20px;
                    float: left;
                    margin-left: 20px;
                }
        
                .fa-calculator {
                    font-size: 24px;
                }
        
            </style>
        </head>
        
        <body>
            <div class="jumbotron">
                <h1>Team Excellence</h1>
                <p></p>
            </div>

            <div class="card" style="width: 18rem;">
        <div class="card-header">
            <p>${answers.name}</p>
            <i class="fa fa-briefcase" aria-hidden="true"></i> <strong>Manager</strong>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${answers.id} </li>
            <li class="list-group-item">Email: ${answers.email}</li>
            <li class="list-group-item">Office Number: ${answers.office}</li>
        </ul>
    </div>`, (err) => {
            if (err)
                throw err;
        }
        )
    });

};


function Team() {
    return inquirer.prompt([
        {
            type: "list",
            name: "team",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "No more. I'm all set"

            ]
        }
    ]).then(function (answer) {
        switch (answer.team) {
            case "Engineer": Engineer();
                break;
            case "Intern": Intern();
                break;
            default:
                console.log("******* Your team is complete. *******");
                fs.appendFile("./main.html", "</body></html>", (err) => {
                    if (err)
                        throw err;
                });
        };
    });
};




function Engineer() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your engineers name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is your engineer's GitHub username?"
        },
    ]).then(function (answers) {
        Team();
        fs.appendFile("./main.html", `
                <div class="card" style="width: 18rem;">
                    <div class="card-header">
                        <p>${answers.name}</p>
                        <i class="fa fa-calculator" aria-hidden="true"></i> <strong>Engineer</strong>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${answers.id}</li>
                        <li class="list-group-item">Email: ${answers.email}</li>
                        <li class="list-group-item">GitHub: ${answers.github}</li>
                    </ul>
                </div>`, (err) => {
            if (err)
                throw err;
        }
        )
    });
};


function Intern() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your intern's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your intern's email?"
        },
        {
            type: "input",
            name: "school",
            message: "What is your intern's school?"
        }
    ]).then(function (answers) {
        Team();
        fs.appendFile("./main.html", ` <div class="card" style="width: 18rem;">
        <div class="card-header">
            <p>${answers.name}</p>
            <i class="fa fa-graduation-cap" aria-hidden="true"></i> <strong>Intern</strong>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${answers.id}</li>
            <li class="list-group-item">Email: ${answers.email}</li>
            <li class="list-group-item">School: ${answers.school}</li>
        </ul>
    </div>`, (err) => {
            if (err)
                throw err;
        }
        )
    });
};

manager();

