# Contributing to SurveyHub Backend (Server)

Thank you for your interest in contributing to the **SurveyHub Backend (Server)** project! We value your input and expertise, and we are committed to fostering an open, inclusive, and collaborative environment. This document provides guidelines to ensure contributions are efficient, professional, and aligned with our project's goals.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
   - [Reporting Issues](#reporting-issues)
   - [Feature Requests](#feature-requests)
   - [Submitting Code Changes](#submitting-code-changes)
3. [Development Workflow](#development-workflow)
4. [Style Guidelines](#style-guidelines)
5. [Pull Request Process](#pull-request-process)
6. [Resources](#resources)
7. [Support](#support)

---

## Code of Conduct

All contributors are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand the standards of behavior expected when contributing to this project.

---

## How to Contribute

### Reporting Issues

If you encounter a bug or an issue, please:

1. Check the [existing issues](https://github.com/manuelalejandrojimeneztorres/surveyhub-server/issues) to avoid duplicates.
2. If the issue is new, create a detailed report including:
   - Steps to reproduce the issue.
   - Expected behavior.
   - Actual behavior.
   - Screenshots or logs, if applicable.

### Feature Requests

We welcome suggestions to improve the project! To propose a new feature:

1. Open a [feature request issue](https://github.com/manuelalejandrojimeneztorres/surveyhub-server/issues/new).
2. Include a detailed description of the feature and its benefits.

### Submitting Code Changes

We accept contributions in the form of:

- Bug fixes
- New features
- Documentation improvements

Before submitting changes, ensure you:

1. Discuss the proposed change via an issue.
2. Follow the [Style Guidelines](#style-guidelines).
3. Test your changes thoroughly.

---

## Development Workflow

### Prerequisites

Ensure you have the following installed:

- **Backend**: Node.js, npm, Sequelize CLI, and MySQL.
- **Mobile**: Ionic CLI, Angular CLI, and Capacitor CLI.
- **Desktop**: JDK 21, Apache Maven, Hibernate, and MySQL Connector/J.

### Setup

1. Fork the repository.
2. Clone your fork:

   ```bash
   git clone https://github.com/your-username/surveyhub-server.git
   ```

3. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. Install dependencies:
   - For backend: `npm install`
   - For mobile: `npm install`
   - For desktop: `mvn clean install`

### Running the Applications

- **Backend**: Run `node app.js`.
- **Mobile**: Run `ionic serve`.
- **Desktop**: Execute the JAR file with `java -jar` (e.g., `java -jar target/surveyhub-desktop-1.0-SNAPSHOT.jar`).

---

## Style Guidelines

### Code Formatting

- **Backend**: Use Prettier for consistent formatting.
- **Mobile**: Use Prettier for consistent formatting, and follow Angular and Ionic coding standards.
- **Desktop**: Adhere to [Java Code Conventions](https://www.oracle.com/java/technologies/javase/codeconventions-contents.html).

### Naming Conventions

- Use `camelCase` for variables and functions.
- Use `PascalCase` for classes.
- Use descriptive names that reflect purpose.

### Commit Messages

- Begin with a verb (e.g., "Add," "Fix," "Update").
- Keep messages concise but informative.

Example:

```bash
Add: User authentication feature
```

---

## Pull Request Process

1. Ensure your branch is up to date with the `main` branch:

   ```bash
   git pull origin main
   ```

2. Push your branch to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

3. Open a pull request:
   - Provide a clear description of your changes.
   - Link any related issues.

4. Address any requested changes promptly.

---

## Resources

- [SurveyHub Backend Documentation](https://github.com/manuelalejandrojimeneztorres/surveyhub-server/wiki)
- [SurveyHub Mobile Documentation](https://github.com/manuelalejandrojimeneztorres/surveyhub-mobile/wiki)
- [SurveyHub Desktop Documentation](https://github.com/manuelalejandrojimeneztorres/surveyhub-desktop/wiki)

---

## Support

For questions or assistance, please reach out via:

- **Email**: support@surveyhub.com
- **GitHub Issues**: [SurveyHub Backend Issues](https://github.com/manuelalejandrojimeneztorres/surveyhub-server/issues)

We appreciate your contributions and look forward to collaborating with you!
