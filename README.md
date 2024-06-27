# Project Overview

This is the continuation of the previous project which includes features for user authentication, authorization. Role-based access control (RBAC) is added to this project. The application uses JSON Web Tokens (JWT) for secure authentication, ensuring that only users with the appropriate roles can perform certain actions

## Table of Contents

1. [Configuration](#configuration)
2. [Middleware](#middleware)
3. [Routes](#routes)
4. [Controllers](#controllers)
5. [Usage](#usage)
6. [Summary](#summary)

## Configuration

### Roles List

The `roles_list.js` file defines the different roles and their respective codes.

## Middleware

The `rolesVerification.js` file contains middleware to verify user roles.

## Routes

The `emp_routes.js` file defines the API endpoints and applies the roles verification middleware.

## Controllers

The `emp_controller.js` file contains the logic for handling requests related to employees (not shown in the provided code, but typically includes functions like `get_all_employees`, `add_employee`, `update_employee`, `delete_employee`, and `get_emp_id`).

## Usage

### Getting All Employees

- **Endpoint:** `GET /api/employees`
- **Description:** Retrieves a list of all employees.

### Adding a New Employee

- **Endpoint:** `POST /api/employees`
- **Roles Required:** User, Editor
- **Description:** Adds a new employee to the system.

### Updating an Employee

- **Endpoint:** `PUT /api/employees`
- **Roles Required:** Editor
- **Description:** Updates an existing employee's details.

### Deleting an Employee

- **Endpoint:** `DELETE /api/employees`
- **Roles Required:** Admin
- **Description:** Deletes an employee from the system.

### Getting Employee by ID

- **Endpoint:** `GET /api/employees/:id`
- **Description:** Retrieves an employee's details by their ID.

## Summary

This project implements role-based access control using Express.js and JWT for authentication. The configuration files define roles and permissions, middleware ensures secure role verification, and routes handle various employee-related operations. The system is designed to be secure and scalable, allowing only authorized users to perform specific actions based on their roles.