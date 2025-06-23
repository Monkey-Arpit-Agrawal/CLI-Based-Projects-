# Todo CLI

Todo CLI is a Command Line Interface (CLI) application that helps you organize, manage, prioritize, and track tasks using a todo list. It provides a simple and efficient way to manage your tasks directly from the command line.

## Features

- Add new todos with priority and group
- Update existing todos
- Mark todos as complete
- Delete todos
- Display todos with various filtering options

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/todo-cli.git
   ```

2. Navigate to the project directory:
   ```
   cd todo-cli
   ```

3. Install the required dependencies:
   ```
   npm install
   ```

## Usage

The Todo CLI provides several commands to manage your todo list. Here are the available commands and their usage:

### Add a Todo

```
node todo.js Add <todo> [options]
```

Options:
- `-p, --priority <level>`: Set priority level (High, Medium, Low). Default is Medium.
- `-g, --group <group>`: Define the group of the todo. Default is General.

Example:
```
node todo.js Add "Buy groceries" -p High -g Shopping
```

### Update a Todo

```
node todo.js Update <todoID> <updateTodo> [options]
```

Options:
- `-p, --priority <level>`: Update the priority level.
- `-g, --group <group>`: Update the group of the todo.

Example:
```
node todo.js Update 1 "Buy organic groceries" -p Medium
```

### Display Todos

```
node todo.js Display [options]
```

Options:
- `-i, --id <ID>`: Display a specific todo by ID.
- `-p, --priority <level>`: Display todos with a specific priority.
- `-g, --group <group>`: Display todos from a specific group.

Example:
```
node todo.js Display -p High
```

### Mark a Todo as Complete

```
node todo.js Complete <todoID>
```

Example:
```
node todo.js Complete 1
```

### Delete a Todo

```
node todo.js Delete <todoID>
```

Example:
```
node todo.js Delete 1
```

## Data Storage

All todo data is stored in a `todos.json` file in the same directory as the script. This file is automatically created and updated as you manage your todos.

## Error Handling

The Todo CLI includes robust error handling to ensure smooth operation and provide helpful feedback to users. Here are some common scenarios and how the application handles them:

1. **File I/O Errors**: If there's an error reading from or writing to the `todos.json` file, the application will log an error message with details about the error.

2. **Invalid Todo ID**: When updating, completing, or deleting a todo, if the provided ID doesn't exist, the application will inform the user that the todo doesn't exist for the given ID.

3. **Empty Todo List**: If the user tries to perform operations on an empty todo list, the application will inform them that the list is empty and prompt them to add a todo.

4. **Invalid JSON**: If the `todos.json` file contains invalid JSON, the application will log a message saying the todo list is empty and generate a new list.

5. **Invalid Command Arguments**: The application uses Commander.js for parsing command-line arguments. If invalid arguments are provided, it will display an error message and show the correct usage.

6. **Invalid Priority or Group**: When adding or updating a todo, if an invalid priority or group is provided, the application will use default values (Medium priority and General group) instead of throwing an error.

In all error cases, the application aims to provide clear and helpful error messages to guide the user in resolving the issue or understanding what went wrong.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).