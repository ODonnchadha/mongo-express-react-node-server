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

- Route Files With Express Router:
  ```javascript
    router.get('/', (request, response) => {
    response.json({
      'healthcheck': 'OK'
    });
  });
  ```
  - Create, and hack, the .gitignore file:
    ```javascript
      /node-modules
      package-lock.json
      /config/keys.js
    ```
    ```javascript
      git init
      git add .
      git commit -am 'Initial development.'
    ```

- Creating The User Model:
  1. Creating a mongoose model with a schema.
  ```javascript
    module.exports = User = mongoose.model('users', UserSchema);
  ```
  2. Export the User variable and then set the mongoose model: the name we want to use and then the schema.

- User Registration & Postman:
  1. Create a user. Persist within MongoDB. We'll be making the requests with POSTMAN.
  ```javascript
    npm i gravatar
  ```
  2. We'll then take the email and send it on the gravatar.
  3. NOTE: Postman is build on Electron js.

- Email Password Login:
  ```javascript
    User.findone()
    bcrypt.compare(password, user.password).then(isMatch => {
  ```

- Creating The JWT:
  ```javascript
    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });
    {
      "success": true,
      "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZWRjNjAyYzQ0ZTU0MGJmOGVkMjg1ZCIsIm5hbWUiOiJEYW5pZWwgRG9uYWh1ZSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvNDYzZGE3MzVmMGQyZjQxN2M4NTE2N2Q1MDMyODk2Mjc_cz0yMDAmcj1wZyZkPW1tIiwiaWF0IjoxNTQyMzIwMDI1LCJleHAiOjE1NDIzMjM2MjV9.2j135urshL_sRXHG9hbEkqsSQGQq2_JEg7EQTL642Do"
    }
  ```

- Passport JWT Authentication Strategy:
  1. Implement passport for private routes via token verification
   ```javascript
    const options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = keys.secretOrKey;
    module.exports = passport => {
      passport.use(new JwtStrategy(options, (jwt_payload, done) => {
      }));
    };
   ```
  - NOTE: et al.

- Create & Update Profile Routes:
  1. When we register, we don't have a profile.
  - e.g.: db.collection.findOneAndUpdate(filter, update, options)

- Profile Field Validations:
  ```javascript
    .populate('user', ['name', 'avatar'])
  ```

- More Profile API Routes:

- Add Experience & Education Routes:

- Creating The Post Model: