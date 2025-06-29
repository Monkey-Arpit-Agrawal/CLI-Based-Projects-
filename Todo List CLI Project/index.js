// Importing Required Modules

const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

// Program Information

program
    .name('Todo')
    .description('CLI-based ToDo List Application')
    .version('1.0.0');

// Function to Parse JSON and Return Array

function parseTodo (result) {
    try {
        let todoArray = JSON.parse(result);
        if (Array.isArray(todoArray)) {
            return todoArray;
        } else {
            let newArray = [];
            return newArray;
        }
    } catch (error) {
       console.log('Generating a fresh todo list');
       let newArray = [];
       return newArray; 
    }
}

// Command : Add a New ToDo

program
    .command('add')
    .description('It is used to add a new ToDo item')
    .argument('<todo>','It is the todo to be added')
    .option('-p, --priority <level>', 'It is the priority level of the ToDo (High, Medium, Low)', 'Medium')
    .option('-g, --group <group>', 'It is the group of the ToDo', 'General')
    .action((todo, options) => {

        fs.readFile('./todos.json', 'utf-8', (err, result) => {
            if (err) {
                console.log(`Error Occurred During Reading JSON File.\nError : ${err.message}`);
            } else {
                let todoArray = parseTodo(result);

                let todoId = 0;

                if (todoArray.length != 0) {
                    todoId = todoArray[todoArray.length - 1].Id;
                }

                let newTodo = {
                    Id : todoId + 1,
                    Todo : todo,
                    Priority : options.priority,
                    Group : options.group,
                    Status : 'Incomplete'
                };

                todoArray.push(newTodo);

                fs.writeFile('./todos.json', JSON.stringify(todoArray, null, 2), (err) => {
                    if (err) {
                        console.log('Error Occurred During Addition of the New ToDo');
                    } else {
                        console.log('ToDo Added Successfully');
                    }
                });

            }
        });
    });

// Command : Update an existing Todo

program
    .command('update')
    .description('It is used to update an existing ToDo ')
    .argument('<id>','ID of the todo to be updated')
    .option('-t, --todo <todo>','Updated ToDo Task')
    .option('-p, --priority <level>', 'Updated priority level')
    .option('-g, --group <group>', 'Updated ToDo Group')
    .action((id, options) => {
        fs.readFile('./todos.json', 'utf-8', (err, result) => {
            if (err) {
                console.log(`Error Occurred During Reading JSON File.\nError : ${err.message}`);
            } else {
                let todoArray = parseTodo(result);

                if (todoArray.length == 0) {
                    console.log('Todo List is empty. Please add a new todo');
                } else {
                    let updateTodoIndex = todoArray.findIndex((t) => (t.Id == id));

                    if (updateTodoIndex == -1) {
                        console.log('Todo does not exist');
                    } else {
                        todoArray[updateTodoIndex].Todo = options.todo ?? todoArray[updateTodoIndex].Todo;
                        todoArray[updateTodoIndex].Priority = options.priority ?? todoArray[updateTodoIndex].Priority;
                        todoArray[updateTodoIndex].Group = options.group ?? todoArray[updateTodoIndex].Group;

                        fs.writeFile('./todos.json', JSON.stringify(todoArray, null, 2), (err) => {
                            if (err) {
                                console.log('Error Occurred During Updation of the New ToDo');
                            } else {
                                console.log('ToDo Updated Successfully');
                            }
                        });
                    }
                }
            }
        });
    });


// Command : Mark A ToDo Status as Complete

program
    .command('mark')
    .description('It is used to mark a ToDo as complete')
    .argument('<id>','ID of the ToDo to be marked complete')
    .action((id) => {
        fs.readFile('./todos.json', 'utf-8', (err, result) => {
            if (err) {
                console.log(`Error Occurred During Reading JSON File.\nError : ${err.message}`);
            } else {
                let todoArray = parseTodo(result);

                if (todoArray.length == 0) {
                    console.log('Todo List is empty. Please add a new todo');
                } else {
                    let updateTodoIndex = todoArray.findIndex((t) => (t.Id == id));

                    if (updateTodoIndex == -1) {
                        console.log('Todo does not exist');
                    } else {
                        todoArray[updateTodoIndex].Status = "Complete";

                        fs.writeFile('./todos.json', JSON.stringify(todoArray, null, 2), (err) => {
                            if (err) {
                                console.log('Error Occurred During Marking a ToDo');
                            } else {
                                console.log('ToDo Marked Successfully');
                            }
                        });
                    }
                }
            }
        });
    });

// Command to Delete a Todo 

program
    .command('delete')
    .description('It is used to delete a todo ')
    .argument('<id>','ID of the todo to be deleted')
    .action((id) => {
        fs.readFile('./todos.json', 'utf-8', (err, result) => {
            if (err) {
                console.log(`Error Occurred During Reading JSON File.\nError : ${err.message}`);
            } else {
                let todoArray = parseTodo(result);

                if (todoArray.length == 0) {
                    console.log('Todo List is empty. Please add a new todo');
                } else {
                    let updateTodoIndex = todoArray.findIndex((t) => (t.Id == id));

                    if (updateTodoIndex == -1) {
                        console.log('Todo does not exist');
                    } else {
                        
                        todoArray.splice(updateTodoIndex, 1);

                        fs.writeFile('./todos.json', JSON.stringify(todoArray, null, 2), (err) => {
                            if (err) {
                                console.log('Error Occurred During Deletion of ToDo');
                            } else {
                                console.log('ToDo Deleted Successfully');
                            }
                        });
                    }
                }
            }
        });
    });

// Command : Display ToDo According To Requirements

program
    .command('display')
    .description('It is used to display a todo ')
    .option('-i, --id <ID>','ID of the Todo to be Displayed ')
    .option('-p, --priority <level>',' Priority Level of Todos to be Displayed ')
    .option('-g, --group <group>', 'Group of the Todos to be Displayed')
    .action((options) => {
        fs.readFile('./todos.json', 'utf-8', (err, result) => {
            if (err) {
                console.log(`Error Occurred During Reading JSON File.\nError : ${err.message}`);
            } else {
                let todoArray = parseTodo(result);

                if (todoArray.length == 0) {
                    console.log('Todo List is empty. Please add a new todo');
                } else {
                    let displayArray = [];

                    if (options.priority) {
                        displayArray = todoArray.filter((todoObj) => (todoObj.Priority == options.priority));
                        if (displayArray.length == 0) {
                            console.log('No ToDo Belonging To The Specified Priority');
                        } else {
                            console.table(displayArray);
                        }
                    }

                    if (options.group) {
                        displayArray = todoArray.filter((todoObj) => (todoObj.Group == options.group));
                        if (displayArray.length == 0) {
                            console.log('No ToDo Belonging To The Specified Group');
                        } else {
                            console.table(displayArray);
                        }        
                    }

                    if (options.id) {
                        displayArray = todoArray.filter((todoObj) => (todoObj.Id == options.id));
                        if (displayArray.length == 0) {
                            console.log('No ToDo Belonging To The Specified ID');
                        } else {
                            console.table(displayArray);
                        }  
                    }

                    if (Object.keys(options).length == 0) {
                        console.table(todoArray);
                    }
                }
            }
        });
    });

program.parse();