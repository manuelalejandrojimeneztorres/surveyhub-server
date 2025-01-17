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

const roles = [
  { name: 'System Administrator', description: 'Complete access to all resources, configurations, and system settings.' },
  { name: 'Survey Manager', description: 'Authorized to create, modify, and delete surveys, as well as manage related resources.' },
  { name: 'Respondent', description: 'Limited to viewing and responding to assigned surveys.' }
];

app.get('/', (req, res) => {
  res.render('index', {
    title: 'SurveyHub RESTful API',
    description: 'Your all-in-one platform for seamless survey creation, management, and analysis.',
    version: '1.0.0',
    status: 'Up and Running',
    endpointsByResource: [
      {
        "name": "Survey Statuses",
        "endpoints": [
          {
            "method": "POST",
            "path": "/api/v1/survey-statuses",
            "description": "Create a new survey status"
          },
          {
            "method": "GET",
            "path": "/api/v1/survey-statuses",
            "description": "Retrieve all survey statuses"
          },
          {
            "method": "GET",
            "path": "/api/v1/survey-statuses/:id",
            "description": "Retrieve a survey status by ID"
          },
          {
            "method": "PUT",
            "path": "/api/v1/survey-statuses/:id",
            "description": "Update a survey status by ID"
          },
          {
            "method": "DELETE",
            "path": "/api/v1/survey-statuses/:id",
            "description": "Delete a survey status by ID"
          }
        ]
      },
      {
        "name": "Surveys",
        "endpoints": [
          {
            "method": "POST",
            "path": "/api/v1/surveys",
            "description": "Create a new survey"
          },
          {
            "method": "GET",
            "path": "/api/v1/surveys",
            "description": "Retrieve all surveys"
          },
          {
            "method": "GET",
            "path": "/api/v1/surveys/:id",
            "description": "Retrieve a survey by ID"
          },
          {
            "method": "PUT",
            "path": "/api/v1/surveys/:id",
            "description": "Update a survey by ID"
          },
          {
            "method": "DELETE",
            "path": "/api/v1/surveys/:id",
            "description": "Delete a survey by ID"
          }
        ]
      },
      {
        "name": "Question Types",
        "endpoints": [
          {
            "method": "POST",
            "path": "/api/v1/question-types",
            "description": "Create a new question type"
          },
          {
            "method": "GET",
            "path": "/api/v1/question-types",
            "description": "Retrieve all question types"
          },
          {
            "method": "GET",
            "path": "/api/v1/question-types/:id",
            "description": "Retrieve a question type by ID"
          },
          {
            "method": "PUT",
            "path": "/api/v1/question-types/:id",
            "description": "Update a question type by ID"
          },
          {
            "method": "DELETE",
            "path": "/api/v1/question-types/:id",
            "description": "Delete a question type by ID"
          }
        ]
      },
      {
        "name": "Questions",
        "endpoints": [
          {
            "method": "POST",
            "path": "/api/v1/questions",
            "description": "Create a new question"
          },
          {
            "method": "GET",
            "path": "/api/v1/questions",
            "description": "Retrieve all questions"
          },
          {
            "method": "GET",
            "path": "/api/v1/questions/:id",
            "description": "Retrieve a question by ID"
          },
          {
            "method": "PUT",
            "path": "/api/v1/questions/:id",
            "description": "Update a question by ID"
          },
          {
            "method": "DELETE",
            "path": "/api/v1/questions/:id",
            "description": "Delete a question by ID"
          }
        ]
      },
      {
        "name": "Question Options",
        "endpoints": [
          {
            "method": "POST",
            "path": "/api/v1/question-options",
            "description": "Create a new question option"
          },
          {
            "method": "GET",
            "path": "/api/v1/question-options",
            "description": "Retrieve all question options"
          },
          {
            "method": "GET",
            "path": "/api/v1/question-options/:id",
            "description": "Retrieve a question option by ID"
          },
          {
            "method": "PUT",
            "path": "/api/v1/question-options/:id",
            "description": "Update a question option by ID"
          },
          {
            "method": "DELETE",
            "path": "/api/v1/question-options/:id",
            "description": "Delete a question option by ID"
          }
        ]
      },
      {
        "name": "System Users",
        "endpoints": [
          {
            "method": "POST",
            "path": "/api/v1/system-users/signup",
            "description": "Sign up a new system user"
          },
          {
            "method": "POST",
            "path": "/api/v1/system-users/signin",
            "description": "Sign in an existing system user"
          },
          {
            "method": "POST",
            "path": "/api/v1/system-users",
            "description": "Create a new system user"
          },
          {
            "method": "GET",
            "path": "/api/v1/system-users",
            "description": "Retrieve all system users"
          },
          {
            "method": "GET",
            "path": "/api/v1/system-users/:id",
            "description": "Retrieve a system user by ID"
          },
          {
            "method": "PUT",
            "path": "/api/v1/system-users/:id",
            "description": "Update a system user by ID"
          },
          {
            "method": "DELETE",
            "path": "/api/v1/system-users/:id",
            "description": "Delete a system user by ID"
          }
        ]
      },
      {
        "name": "Roles",
        "endpoints": [
          {
            "method": "POST",
            "path": "/api/v1/roles",
            "description": "Create a new role"
          },
          {
            "method": "GET",
            "path": "/api/v1/roles",
            "description": "Retrieve all roles"
          },
          {
            "method": "GET",
            "path": "/api/v1/roles/:id",
            "description": "Retrieve a role by ID"
          },
          {
            "method": "PUT",
            "path": "/api/v1/roles/:id",
            "description": "Update a role by ID"
          },
          {
            "method": "DELETE",
            "path": "/api/v1/roles/:id",
            "description": "Delete a role by ID"
          }
        ]
      },
      {
        "name": "System User Roles",
        "endpoints": [
          {
            "method": "POST",
            "path": "/api/v1/system-user-roles",
            "description": "Create a new system user role"
          },
          {
            "method": "GET",
            "path": "/api/v1/system-user-roles",
            "description": "Retrieve all system user roles"
          },
          {
            "method": "GET",
            "path": "/api/v1/system-user-roles/:id",
            "description": "Retrieve a system user role by ID"
          },
          {
            "method": "PUT",
            "path": "/api/v1/system-user-roles/:id",
            "description": "Update a system user role by ID"
          },
          {
            "method": "DELETE",
            "path": "/api/v1/system-user-roles/:id",
            "description": "Delete a system user role by ID"
          }
        ]
      },
      {
        "name": "Responses",
        "endpoints": [
          {
            "method": "POST",
            "path": "/api/v1/responses",
            "description": "Create a new response"
          },
          {
            "method": "GET",
            "path": "/api/v1/responses",
            "description": "Retrieve all responses"
          },
          {
            "method": "GET",
            "path": "/api/v1/responses/:id",
            "description": "Retrieve a response by ID"
          },
          {
            "method": "PUT",
            "path": "/api/v1/responses/:id",
            "description": "Update a response by ID"
          },
          {
            "method": "DELETE",
            "path": "/api/v1/responses/:id",
            "description": "Delete a response by ID"
          }
        ]
      },
      {
        "name": "Answers",
        "endpoints": [
          {
            "method": "POST",
            "path": "/api/v1/answers",
            "description": "Create a new answer"
          },
          {
            "method": "GET",
            "path": "/api/v1/answers",
            "description": "Retrieve all answers"
          },
          {
            "method": "GET",
            "path": "/api/v1/answers/:id",
            "description": "Retrieve an answer by ID"
          },
          {
            "method": "PUT",
            "path": "/api/v1/answers/:id",
            "description": "Update an answer by ID"
          },
          {
            "method": "DELETE",
            "path": "/api/v1/answers/:id",
            "description": "Delete an answer by ID"
          }
        ]
      },
      {
        "name": "Answer Options",
        "endpoints": [
          {
            "method": "POST",
            "path": "/api/v1/answer-options",
            "description": "Create a new answer option"
          },
          {
            "method": "GET",
            "path": "/api/v1/answer-options",
            "description": "Retrieve all answer options"
          },
          {
            "method": "GET",
            "path": "/api/v1/answer-options/:id",
            "description": "Retrieve an answer option by ID"
          },
          {
            "method": "PUT",
            "path": "/api/v1/answer-options/:id",
            "description": "Update an answer option by ID"
          },
          {
            "method": "DELETE",
            "path": "/api/v1/answer-options/:id",
            "description": "Delete an answer option by ID"
          }
        ]
      }
    ],
    authenticationEnabled: true,
    authenticationDocsLink: '/docs/authentication',
    authorizationEnabled: true,
    authorizationDocsLink: '/docs/authorization',
    roles,
    showExample: true,
    exampleRequest: 'curl -X GET "http://localhost:8080/api/v1/surveys?status=Open" -H "Authorization: Bearer {your_token}"',
    documentationLink: '/docs',
    supportEmail: 'support@surveyhub.com',
    companyName: 'SurveyHub, S. L.',
    privacyLink: '/privacy',
    termsLink: '/terms'
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
