# Culled from Brad Traversy's Udemy class entitled 'MERN Stack Front To Back.'
## This repository encapsulates the server-side section of the class.

- Introduction:
  1. Technologies:
    - ES6+ JavaScript.
    - Node.js/Express.
    - MongoDB.
    - React and Redux.
    - Twitter Bootstrap 4.

- Welcome To The Course:
  1. What are we creating:
    - DevConnector project: A small social network with authentication, profiles, dashboard, and posts.

- A Look At the Main App:
  - JWT in local storage. et al...

- Before We Begin:
  1. Full Project:
    - https://github.com/bradtraversy/devconnector

- VSCode Setup:
  - Recommended VSCode extensions: Preferences -> Settings
  - emmet.includeLanguages: {"javascript": "javascriptreact"}
  - emmet.syntaxProfiles: {"javascript": "jsx"}
  - Extensions:
  - ES6 React/Redux/GraphQL/React-Native snippets: Snippets for technologies. 
  - e.g.: React component ()=> rcc + [Tab]
  - Bracket Pair Colorizer: Colors pairs of brackets for nested.
  - Prettier - Code formatter: Formatting code upon 'save.'
  - Live Server: Serve up static HTML pages.
  - Node.js Modules Intellisense: import statements, et al.

- MongoDB Setup With mLab:

- Install Dependencies and Basic Server Setup:
  ```javascript
    npm i express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator
    npm i -D nodemon
  ```
  - node server
  ```javascript
    "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js"
    }
  ```

- Connecting To MongoDB With Mongoose:
  ```javascript
    mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => console.log(`db connection: ${db}`))
      .catch(err => {
        console.log(`db connection err: ${err}`)
      });
  ```