const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your GitHub Username?"
    },
    {
      type: "list",
      name: "color",
      message: "What is your favorite color?",
      choices: [
        "purple",
        "green",
        "pink",
        "orange"
      ],
    }
  ])
    .then((answers) => {
      axios.all([
        axios.get(`https://api.github.com/users/${answers.username}`),
        axios.get(`https://api.github.com/users/${answers.username}/repos?per_page=100`)
      ])
        .then(axios.spread((res, res2) => {
          const image = res.data.avatar_url;
          console.log(image);

          const fullName = res.data.name;
          console.log(fullName);

          const company = res.data.company;
          console.log(company);

          const location = res.data.location;
          console.log(location);

          const gitHub = res.data.html_url;
          console.log(gitHub);

          const blog = res.data.blog;
          console.log(blog);

          const bio = res.data.bio;
          console.log(bio);

          const publicRepos = res.data.public_repos;
          console.log(publicRepos);

          const followers = res.data.followers;
          console.log(followers);

          const following = res.data.following;
          console.log(following);

          const stars = res2.data.map((stargazer) => {
            return stargazer.stargazers_count;
          });
          console.log(stars);

          const nums = stars;
          for (let i = 0; i < nums.length; i++) {
          }
          const add = (a, b) =>
            a + b
          let sum = nums.reduce(add)
          console.log(sum);

          const html = generateHTML(answers, res, sum);
          return writeFileAsync("index.html", html);

        }));
    });
}


function generateHTML(answers, res, sum) {
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet">
      <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
      <link rel="stylesheet" type="text/css" href="assets/css/style.css">
      <title>Document</title>
  </head>

  <body>
      <div class="jumbotron">
          <div class="overlay"></div>
          <div class="inner">
              <div class="row">
                  <div class="col-md-12">
                      <img class="image" src="${res.data.avatar_url}">
                      <div class="info" style="background-color:${answers.color};">
                          <p class="greeting">Hi!</p>
                          <p class="name">My name is ${res.data.name}</p>
                          <p class="company">Currently at ${res.data.company}</p>
                          <p class="location"> <i class="fa fa-map-marker" aria-hidden="true"></i>${res.data.location} &nbsp <i class="fa fa-github" aria-hidden="true"></i><a href="${res.data.html_url}" target="_blank">GitHub</a> &nbsp  <i class="fa fa-rss" aria-hidden="true"></i><a href="${res.data.blog}" target="_blank">blog</a></p>
                      </div>
                  </div>
              </div> 
          </div>
      </div>     
        <div class="container">
          <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-6 bio">
                  ${res.data.bio}
              </div>
              <div class="col-md-3"></div>
          </div>
          <div class="row">
              <div class="col-md-2"></div>
              <div class="col-md-4">
                  <div class="repos" style="background-color:${answers.color};">Public Repositories: <br> ${res.data.public_repos}</div>
              </div>
              <div class="col-md-4">
                  <div class="followers" style="background-color:${answers.color};">Followers: <br> ${res.data.followers}</div>
              </div>
              <div class="col-md-2"></div>
          </div>
          <div class="row">
              <div class="col-md-2"></div>
              <div class="col-md-4">
                  <div class="stars" style="background-color:${answers.color};">GitHub Stars: <br> ${sum} </div>
              </div>
              <div class="col-md-4">
                  <div class="following" style="background-color:${answers.color};">Following: <br> ${res.data.following}</div>
              </div>
              <div class="col-md-2"></div>
          </div>
      </div>

  </body>
  <footer></footer>


  </html>`;
}

promptUser()
  .then(function () {
    console.log("Successfully wrote to index.html");
  })
  .catch(function (err) {
    console.log(err);
  });
