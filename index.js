const fs = require('fs');
const path = require('path');
const readline = require('readline');

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'employees.json');

let employees = [];

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
  }
}

function saveEmployees() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(employees, null, 2), 'utf8');
}

function loadEmployees() {
  ensureDataFile();

  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8').trim();
    const parsed = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(parsed)) {
      throw new Error('Data file must contain an array.');
    }

    employees = parsed.map((employee) => ({
      id: Number.isInteger(employee.id) ? employee.id : Date.now(),
      name: typeof employee.name === 'string' ? employee.name : '',
      position: typeof employee.position === 'string' ? employee.position : (employee.role || employee.department || ''),
      salary: Number.isFinite(Number(employee.salary)) ? Number(employee.salary) : 0,
    }));
  } catch (error) {
    console.log('\nError reading employee data. Resetting storage.\n');
    employees = [];
    saveEmployees();
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(questionText) {
  return new Promise((resolve) => {
    rl.question(questionText, (answer) => resolve(answer.trim()));
  });
}

function validateText(value) {
  return value.length > 0;
}

function validateSalary(value) {
  const salary = Number(value);
  return Number.isFinite(salary) && salary >= 0;
}

function validateId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0;
}

async function askNonEmpty(prompt) {
  while (true) {
    const value = await ask(prompt);
    if (validateText(value)) {
      return value;
    }
    console.log('Invalid input. Please enter a non-empty value.');
  }
}

async function askSalary(prompt) {
  while (true) {
    const value = await ask(prompt);
    if (validateSalary(value)) {
      return Number(value);
    }
    console.log('Invalid salary. Enter a non-negative number.');
  }
}

async function askEmployeeId(prompt) {
  while (true) {
    const value = await ask(prompt);
    if (validateId(value)) {
      return Number(value);
    }
    console.log('Invalid ID. Enter a positive integer.');
  }
}

function printMenu() {
  console.log('\nEmployee Management System');
  console.log('1. Add Employee');
  console.log('2. List Employees');
  console.log('3. Update Employee');
  console.log('4. Delete Employee');
  console.log('5. Exit');
}

async function addEmployee() {
  const name = await askNonEmpty('Employee Name: ');
  const position = await askNonEmpty('Position: ');
  const salary = await askSalary('Salary: ');

  const employee = {
    id: Date.now(),
    name,
    position,
    salary,
  };

  employees.push(employee);
  saveEmployees();
  console.log('Employee added successfully!');
}

function listEmployees() {
  console.log('\nEmployee List:\n');

  if (employees.length === 0) {
    console.log('No employees found.');
    console.log('Total employees: 0');
    return;
  }

  for (const employee of employees) {
    console.log(
      `ID: ${employee.id}, Name: ${employee.name}, Position: ${employee.position}, Salary: $${employee.salary}`
    );
  }

  console.log(`Total employees: ${employees.length}`);
}

async function updateEmployee() {
  const id = await askEmployeeId('Enter Employee ID to update: ');
  const index = employees.findIndex((employee) => employee.id === id);

  if (index === -1) {
    console.log('Employee not found.');
    return;
  }

  const name = await askNonEmpty('New Employee Name: ');
  const position = await askNonEmpty('New Position: ');
  const salary = await askSalary('New Salary: ');

  employees[index] = {
    ...employees[index],
    name,
    position,
    salary,
  };

  saveEmployees();
  console.log('Employee updated successfully!');
}

async function deleteEmployee() {
  const id = await askEmployeeId('Enter Employee ID to delete: ');
  const index = employees.findIndex((employee) => employee.id === id);

  if (index === -1) {
    console.log('Employee not found.');
    return;
  }

  employees.splice(index, 1);
  saveEmployees();
  console.log('Employee deleted successfully!');
}

async function main() {
  loadEmployees();

  while (true) {
    printMenu();
    const choice = await ask('Select an option: ');

    switch (choice) {
      case '1':
        await addEmployee();
        break;
      case '2':
        listEmployees();
        break;
      case '3':
        await updateEmployee();
        break;
      case '4':
        await deleteEmployee();
        break;
      case '5':
        console.log('Exiting Employee Management System.');
        rl.close();
        return;
      default:
        console.log('Invalid option. Please try again.');
    }
  }
}

process.on('SIGINT', () => {
  console.log('\nExiting Employee Management System.');
  rl.close();
  process.exit(0);
});

main();
