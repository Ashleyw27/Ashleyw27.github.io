# Profile Generator
## User Story
As a product manager

I want a developer profile generator

So that I can easily prepare reports for stakeholders

## Description and Usage
The Profile Generator application can be used to create a user profile outlining the below information (this information is pulled from the GitHub API via Axios calls):
* Profile Image
* Name
* Location Link (clicking the link will open a Google Maps page for the shown location)
* GitHub Link (clicking the link will open the user's GitHub page)
* Blog Link (clicking the blog link will open a link to the user's blog - if one is available)
* Bio
* Number of public repositories, followers, GitHub stars, and following

#### To run the application follow the below steps:
First, install the NPM packages required to properly run the application. Once all required packages are installed, type "node index.js" into the command line. Answer each prompt as it appears: "What is your GitHub Username?" and "What is your favorite color?" (choose from the selection of colors provided). Once all prompts are answered, the index.html file will be updated with all the GitHub information associated with the username provided. It will also customize the color of the profile based on the "favorite color" chosen. Lastly, a PDF of the completed profile will be created.

**Note:** It is important to note that the PDF that is generated will be from the last time the application was run. It will not display the information from the current run. This is a known bug that will be fixed in the future.


[Click here to view the Profile Generator Demo](https://drive.google.com/drive/folders/1BmN_kcu5D0PyJAbO6OhP9A0ldTInjRVD)

![profile generator](assets/images/profile-generator.png)


## Technology
* HTML
* CSS
* Bootstrap
* Google Fonts
* Font Awesome
* Node.js
* Axios
* Async/Await
* Node Modules/package.json
  
## What I Learned
I learned many new concepts and skills while creating this profile generator. A few of which include:
* How to setup a package.json file
* Utilizing npm i to install new packages
* Using multiple Axios calls and utilizing the returned information to write to an HTML file
* Converting an HTML file to a pdf
