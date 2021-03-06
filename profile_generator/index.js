//Requiring specific packages
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const pdf = require('html-pdf');

const writeFileAsync = util.promisify(fs.writeFile);

//Prompting the user to answer specific quetsions
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

  //Passing the answers through to be used in two Axsios calls to get information from the GitHub API
    .then((questionAnswers) => {
      let answers = questionAnswers

      //Array of Axios calls
      axios.all([
        axios.get(`https://api.github.com/users/${answers.username}`),
        axios.get(`https://api.github.com/users/${answers.username}/repos?per_page=100`)
      ])
      //Information pulled from the GitHub API
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

          //Pulling the stars count from each Repo and adding the stars together
          const stars = res2.data.map((stargazer) => {
            return stargazer.stargazers_count;
          });
          console.log(stars);

          const nums = stars;
          for (let i = 0; i < nums.length; i++) {
          }
          const add = (a, b) =>
            a + b
          const sum = nums.reduce(add)
          

          //Writing to index.html with the answers and information pulled from the GitHub API
          return writeFileAsync("index.html", `
          <!DOCTYPE html>
          <html lang="en">
        
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
              <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet">
              <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
              <style>
              body {
                background-color: white;
                font-family: 'Poppins', sans-serif;
            }
            
            .jumbotron {
                background-color: lightgray;
                width: 100%;
                height: 400px;
            }
            
            a {
                color: white;
            }
            
            .image {
                height: 250px;
                width: 250px;
                border: 3px solid yellow;
                border-radius: 150px;
                position: absolute;
                right: 41%;
                top: -10px;
                text-align: center;
                z-index: 1;
            }
            
            .info {
                height: 375px;
                width: 100%;
                margin: 0 auto;
                margin-top: 30px;
                padding-top: 240px;
                text-align: center;
                line-height: 12px;
                font-size: 24px;
                color: white;
                border-radius: 15px;
            }
            
            .container {
                margin-top: 100px;
                font-size: 24px;
            }
            
            .bio {
                width: 100%;
                height: 150px;
                color: black;
                text-align: center;
            }
            
            .repos, .followers, .stars, .following {
                border-radius: 15px;
                width: 100%;
                height: 120px;
                padding: 20px;
                text-align: center;
                margin: 0 auto;
                margin-top: 20px;
                margin-bottom: 20px;
                color: white;
            }
            
            footer {
                background-color: lightgray;
                width: 100%;
                height: 300px;
                margin-top: 50px;
            }
              </style>
              <title>Profile</title>
          </head>
        
          <body>
              <div class="jumbotron">
                  <div class="overlay"></div>
                  <div class="inner">
                      <div class="row">
                          <div class="col-12">
                              <img class="image" src="${res.data.avatar_url}">
                              <div class="info" style="background-color:${answers.color};">
                                  <p class="greeting">Hi!</p>
                                  <p class="name">My name is ${res.data.name}</p>
                                  <p class="company">Currently at ${res.data.company}</p>
                                  <p class="location"> <i class="fa fa-map-marker" aria-hidden="true"></i> <a href="https://google.com/maps/search/${res.data.location}" target="_blank"> ${res.data.location}</a>  &nbsp <i class="fa fa-github" aria-hidden="true"></i><a href="${res.data.html_url}" target="_blank">GitHub</a> &nbsp  <i class="fa fa-rss" aria-hidden="true"></i><a href="${res.data.blog}" target="_blank">blog</a></p>
                              </div>
                          </div>
                      </div> 
                  </div>
              </div>     
                <div class="container">
                  <div class="row">
                      <div class="col-3"></div>
                      <div class="col-6 bio">
                          ${res.data.bio}
                      </div>
                      <div class="col-3"></div>
                  </div>
                  <div class="row">
                      <div class="col-2"></div>
                      <div class="col-4">
                          <div class="repos" style="background-color:${answers.color};">Public Repositories: <br> ${res.data.public_repos}</div>
                      </div>
                      <div class="col-4">
                          <div class="followers" style="background-color:${answers.color};">Followers: <br> ${res.data.followers}</div>
                      </div>
                      <div class="col-2"></div>
                  </div>
                  <div class="row">
                      <div class="col-2"></div>
                      <div class="col-4">
                          <div class="stars" style="background-color:${answers.color};">GitHub Stars: <br> ${sum} </div>
                      </div>
                      <div class="col-4">
                          <div class="following" style="background-color:${answers.color};">Following: <br> ${res.data.following}</div>
                      </div>
                      <div class="col-2"></div>
                  </div>
              </div>
        
          </body>
          <footer></footer>
        
        
          </html>`);

        }));
    });
}

//Function to read the generated html file and convert it to a PDF
  async function init() {
    try {
      await promptUser();
  
      var readHtml = fs.readFileSync('index.html', 'utf8');
      var options = { format: 'Letter', height: "2000px", width: "2000px" };
       
      pdf.create(readHtml, options).toFile('profile.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); 
      });
  
      console.log("Successfully wrote to index.html");
    } catch (err) {
      console.log(err);
    }
  }
  init();
  
  

