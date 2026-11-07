# CLI Employee Management System

Experiment 4.1 is a small Node.js command-line application for managing employee records. It demonstrates interactive input, CRUD operations, validation, and JSON-backed persistence without requiring a database.

## Features

- Add, list, update, and remove employees
- Validate interactive input
- Persist records in `data/employees.json`
- Keep the implementation simple enough to study and extend

## Project layout

```text
index.js              CLI entry point
data/employees.json   Local employee data
package.json          Scripts and metadata
```

## Requirements

- Node.js 18 or newer
- A terminal with interactive standard input

## Run it

```bash
npm install
npm start
```

Check the entry point without running the application:

```bash
npm run check
```

## Design notes

The project intentionally uses a local JSON file instead of a database. This keeps the experiment focused on command-line flow and data manipulation; it is not intended for concurrent or production use.

## Extending the experiment

Add input validation before persistence, keep file writes atomic where possible, and add tests for malformed records and duplicate employee identifiers before introducing new features.
