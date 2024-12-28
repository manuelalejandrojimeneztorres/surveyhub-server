# SurveyHub Backend (Server)

![Node.js](https://img.shields.io/badge/Node.js-20.17.0-brightgreen?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.21.0-lightgrey?style=for-the-badge&logo=express)
![Sequelize](https://img.shields.io/badge/Sequelize-6.37.4-blue?style=for-the-badge&logo=sequelize)
![MySQL](https://img.shields.io/badge/MySQL-8.x-orange?style=for-the-badge&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Security-critical?style=for-the-badge&logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Build Status](https://img.shields.io/github/actions/workflow/status/manuelalejandrojimeneztorres/surveyhub-server/backend-ci.yml?style=for-the-badge)
![Coverage](https://img.shields.io/codecov/c/github/manuelalejandrojimeneztorres/surveyhub-server?style=for-the-badge)
![Dependencies](https://img.shields.io/badge/Dependencies-Up%20to%20date-brightgreen?style=for-the-badge)

## Description

The **SurveyHub Backend** is a robust, scalable, and enterprise-grade server-side application designed to support comprehensive online survey management. Built using **Node.js** and **Express.js**, this backend implements a secure, efficient, and extensible RESTful API that integrates seamlessly with the **SurveyHub Mobile Application** and **MySQL database**. It serves as the central hub for managing survey data, enforcing business logic, and ensuring secure user interactions.

---

## Table of Contents

1. [Key Features](#key-features)
2. [Architecture Overview](#architecture-overview)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
   - [Project Setup](#project-setup)
   - [Environment Configuration](#environment-configuration)
   - [Database Setup](#database-setup)
   - [Start the Server](#start-the-server)
5. [Technologies and Tools Used](#technologies-and-tools-used)
6. [Dependencies](#dependencies)
7. [Troubleshooting](#troubleshooting)
8. [Contributing Guidelines](#contributing-guidelines)
9. [Support](#support)
10. [License](#license)
11. [Acknowledgments](#acknowledgments)

---

## Key Features

- **RESTful API**: Robust endpoints for managing surveys, users, and roles.
- **Role-Based Access Control (RBAC)**: Granular permissions based on user roles (System Administrator, Survey Manager, and Respondent).
- **Authentication**: Secure user authentication using **JWT**.
- **Data Validation**: Comprehensive validation for data integrity and consistency.
- **Scalability**: Designed for horizontal and vertical scaling.
- **File Uploads**: Secure profile picture uploads using **Multer**.
- **Database Management**: Seamless integration with **MySQL**, leveraging **Sequelize ORM**.

[🔼 Back to Top](#table-of-contents)

---

## Architecture Overview

The SurveyHub Backend follows a modular architecture, ensuring maintainability and scalability. Key components include:

- **Layered Architecture**: Combines the **Model-View-Controller (MVC)** pattern with middleware to ensure modularity, maintainability, and scalability.
- **Database Integration**: Utilizes **Sequelize ORM** for robust schema definitions, efficient data operations, and relationship management.
- **API Layer**: Provides secure endpoints for CRUD operations, user authentication, and data processing.
- **Security Measures**: Implements JWT-based authentication, BCrypt for password hashing, and CORS for cross-origin requests.
- **File Management**: Handles multipart form data using Multer for secure profile picture uploads.

[🔼 Back to Top](#table-of-contents)

---

## Prerequisites

Ensure the following tools are installed:

- [Git](https://git-scm.com/downloads) - Version control system
- [Node.js (20.17.0)](https://nodejs.org/) - JavaScript runtime
- [npm (10.9.0)](https://www.npmjs.com/) - Package manager
- [MySQL (8.x)](https://dev.mysql.com/downloads/) - Relational database management system
- **Optional**:
  - [Postman](https://www.postman.com/) - API testing tool

[🔼 Back to Top](#table-of-contents)

---

## Installation

### Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/manuelalejandrojimeneztorres/surveyhub-server.git
   ```

2. Navigate to the project directory:

   ```bash
   cd surveyhub-server
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

[🔼 Back to Top](#table-of-contents)

### Environment Configuration

1. Create a `.env` file in the root directory and define the following variables:

   ```env
   JWT_SECRET=YourStrongJWTSecret
   MYSQL_DATABASE=surveyhub
   MYSQL_USER=root
   MYSQL_PASSWORD=YourStrongDatabasePassword
   MYSQL_ROOT_PASSWORD=YourStrongDatabasePassword
   DB_HOST=localhost
   NODE_ENV=development
   ```

[🔼 Back to Top](#table-of-contents)

### Database Setup

1. Start your MySQL server and create the database:

   ```sql
   CREATE DATABASE surveyhub;
   ```

2. Run Sequelize migrations to set up the database schema:

   ```bash
   npx sequelize-cli db:migrate
   ```

[🔼 Back to Top](#table-of-contents)

### Start the Server

1. Launch the server:

   ```bash
   node app.js
   ```

> [!NOTE]
> The backend will be accessible at `http://localhost:8080`.

[🔼 Back to Top](#table-of-contents)

---

## Technologies and Tools Used

- **Backend**:
  - Node.js: High-performance JavaScript runtime
  - Express.js: Minimalist web framework
  - Sequelize: Database ORM
  - MySQL: Relational database

- **Security**:
  - bcryptjs: Password hashing
  - jsonwebtoken: Authentication
  - cors: Cross-origin request handling

- **Development Tools**:
  - Postman: API testing
  - Visual Studio Code: Code editor
  - MySQL Workbench: Database management

[🔼 Back to Top](#table-of-contents)

---

## Dependencies

Key dependencies include:

- `express` (4.21.0): Web framework
- `sequelize` (6.37.4): ORM for MySQL
- `mysql2` (3.11.3): MySQL client
- `jsonwebtoken` (9.0.2): Token-based authentication
- `bcryptjs` (2.4.3): Password encryption
- `dotenv` (16.4.5): Environment variable management
- `multer` (1.4.5-lts.1): File uploads

> [!NOTE]
> For a full list, see the `package.json` file.

[🔼 Back to Top](#table-of-contents)

---

## Troubleshooting

### Common Issues

- **Database Connection Errors**:
  - Ensure MySQL is running and credentials in the `.env` file are correct.
  - Check if the database exists and migrations have been executed.

- **Missing Dependencies**:
  - Run `npm install` to ensure all required packages are installed.

- **Server Not Starting**:
  - Check the logs for detailed error messages.

### Logs

Use the following command to view logs:

```bash
npm run logs
```

[🔼 Back to Top](#table-of-contents)

---

## Contributing Guidelines

We welcome contributions to improve the SurveyHub Backend. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes with detailed messages:

   ```bash
   git commit -m "Add: Description of your feature"
   ```

4. Push your branch and open a pull request.

> [!NOTE]
> For guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

[🔼 Back to Top](#table-of-contents)

---

## Support

For support, contact:

- **Email**: support@surveyhub.com
- **Documentation**: [SurveyHub API Wiki](https://github.com/manuelalejandrojimeneztorres/surveyhub-server/wiki)

[🔼 Back to Top](#table-of-contents)

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

[🔼 Back to Top](#table-of-contents)

---

## Acknowledgments

Special thanks to:

- The [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/) communities for exceptional frameworks.
- [Sequelize](https://sequelize.org/) for simplifying database operations.
- [GitHub](https://github.com/) for enabling collaboration and version control.

[🔼 Back to Top](#table-of-contents)

---

For more information, visit [SurveyHub Mobile](https://github.com/manuelalejandrojimeneztorres/surveyhub-mobile) or [SurveyHub Desktop](https://github.com/manuelalejandrojimeneztorres/surveyhub-desktop).

Enjoy using the **SurveyHub Backend** and feel free to contribute to its development! 🚀

[🔼 Back to Top](#table-of-contents)
