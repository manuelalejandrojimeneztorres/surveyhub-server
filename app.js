require('dotenv').config();

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;



app.use(express.static(path.join(__dirname, 'public')));

var corsOptions = {
  origin: 'http://localhost:8100',
  optionsSuccessStatus: 200
};

// Enable CORS
app.use(cors(corsOptions));


/* app.use(express.json());
app.use(express.urlencoded({ extended: true })); */

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Database conection
const db = require('./models');

// Normal use; doesn't delete the database data
// For explotation. Database is not dropped.
// db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database
// Development only. Drops and re-sync db everytime the server starts.
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Online Survey Management System API',
    description: 'This API facilitates the creation, management, and analysis of online surveys. It provides endpoints for creating surveys, managing questions and responses, tracking survey status, and retrieving analytical data. Designed for scalability and flexibility, this API ensures efficient survey handling and real-time data access for comprehensive survey management.',
    version: '1.0.0',
    status: 'Up and Running',
    routes: [
      { path: '/api/v1/survey-statuses', description: 'Retrieve the list of available survey statuses.' },
      { path: '/api/v1/surveys', description: 'Access and manage surveys, including creation and retrieval of survey data.' },
      { path: '/api/v1/surveys/survey-statuses/:id/surveys', description: 'Retrieve and manage surveys filtered by specific survey status ID.' },
      { path: '/api/v1/question-types', description: 'Retrieve the list of available question types for surveys.' },
      { path: '/api/v1/questions', description: 'Manage survey questions, including creation and retrieval of questions.' },
      { path: '/api/v1/questions/surveys/:id/questions', description: 'Retrieve and manage questions associated with a specific survey ID.' },
      { path: '/api/v1/questions/question-types/:id/questions', description: 'Retrieve and manage questions filtered by a specific question type ID.' },
      { path: '/api/v1/question-options', description: 'Manage available options for survey questions.' },
      { path: '/api/v1/question-options/questions/:id/question-options', description: 'Retrieve and manage options for questions associated with a specific question ID.' },
      { path: '/api/v1/system-users', description: 'Manage system users, including the creation, retrieval, and updating of user profiles.' },
      { path: '/api/v1/system-users/signin', description: 'Authenticate system users and provide access tokens for session management.' },
      { path: '/api/v1/roles', description: 'Manage system roles, including creation, retrieval, and updating of role definitions.' },
      { path: '/api/v1/system-user-roles', description: 'Manage the assignment of roles to system users, providing many-to-many relationship data between users and roles.' },
      { path: '/api/v1/responses', description: 'Manage survey responses, including creation and retrieval of response data.' },
      { path: '/api/v1/answers', description: 'Manage individual answers submitted within survey responses.' },
      { path: '/api/v1/answer-options', description: 'Retrieve and manage predefined options available for survey answers.' }
    ],
    documentationLink: '/docs',
    authEnabled: true,
    authDocsLink: '/auth-docs',
    showExample: true,
    exampleRequest: 'curl -X GET "http://localhost:8080/api/v1/surveys?status=Open" -H "Authorization: Bearer {your_token}"',
    supportEmail: 'support@onlinesurveymanagementsystem.com',
    termsLink: '/terms',
    privacyLink: '/privacy'
  });
});


// Middleware that checks if JWT token exists and verifies it if it does exist.
// In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // Check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); // If no token, continue

  if (req.headers.authorization.indexOf('Basic ') === 0) {
    // Verify auth basic credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [loginName, passwordHash] = credentials.split(':');

    req.body.loginName = loginName;
    req.body.passwordHash = passwordHash;

    return next();
  }

  token = token.replace('Bearer ', '');
  // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: 'Invalid user.'
      });
    } else {
      req.user = user; // Set the user to req so other routes can use it
      req.token = token;
      next();
    }
  });
});


require('./routes/surveystatus.routes')(app);
require('./routes/survey.routes')(app);
require('./routes/questiontype.routes')(app);
require('./routes/question.routes')(app);
require('./routes/questionoption.routes')(app);
require('./routes/systemuser.routes')(app);
require('./routes/role.routes')(app);
require('./routes/systemuserrole.routes')(app);
require('./routes/response.routes')(app);
require('./routes/answer.routes')(app);
require('./routes/answeroption.routes')(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

/* var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; */
