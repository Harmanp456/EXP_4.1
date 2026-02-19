# Experiment 4.1 - CLI Employee Management System

## Aim
Build a command-line employee management system using Node.js with array-based storage.



## Objectives Implemented
1. Implement CRUD operations for employees.
2. Create interactive CLI menus.
3. Validate user input.
4. Persist data between sessions.
5. Handle array operations.

## Hardware/Software Requirements
- Node.js 18+
- Terminal/Command Prompt
- No additional dependencies

## Project Files
- `index.js` - Main CLI application using `readline`
- `data/employees.json` - Persistent JSON storage
- `package.json` - Scripts and metadata

## How to Run
1. Open terminal in this folder.
2. Run:
   ```bash
   npm start
   ```

## Available Features
- Add employee
- List employees
- Update employee
- Delete employee
- Input validation for employee name, position, salary, and IDs
- Automatic save to JSON file after changes

## Sample Output Flow
```text
Employee Management System
1. Add Employee
2. List Employees
3. Update Employee
4. Delete Employee
5. Exit
Select an option:

Employee Name: Amogh
Position: trainer
Salary: 10000
Employee added successfully!

Employee List:
ID: 1749894896010, Name: Amogh, Position: trainer, Salary: $10000
Total employees: 1
```

