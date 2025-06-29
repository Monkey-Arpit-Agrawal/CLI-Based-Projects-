// Importing Modules

const fs = require('fs') ;

const { Command } = require('commander') ;
const program = new Command() ;

// Program Info 

program
    .name('Todo')
    .description('It is a CLI Based ToDo List')
    .version('1.0.0')

// Parse JSON Array Function

function parseTodo (result) {
    try {
        let todoArray = JSON.parse(result) ;
        if (Array.isArray(todoArray)) {
            return todoArray ;
        } else {
            let newArray = [] ;
            return newArray ;
        }
    } catch (error) {
       console.log('Generating a fresh todo list') ;
       let newArray = [] ;
       return newArray ; 
    }
}

// Command to Add a New ToDo

program
    .command('Add')
    .description('It is used to add a todo to the ToDo List')
    .argument('<todo>','It is the todo to be added')
    .option('-p , --priority <level>' , 'It is the priority level of the todo (High , Medium , Low)' , 'Medium')
    .option('-g , --group <group>' , 'It is the group of the todo' , 'General')
    .action((todo , options) => {
        fs.readFile('./todos.json' , 'utf-8' , (err , result) => {
            if (err) {
                console.log(`Error Occurred During Reading . \n Error : ${err}`) ;
            } else {
                let todoArray = parseTodo(result) ;

                let todoId = 0 ;

                if (todoArray.length != 0) {
                    todoId = todoArray[todoArray.length - 1].Id ;
                }

                let newTodo = {
                    Id : todoId + 1 ,
                    Todo : todo ,
                    Priority : option.priority ,
                    Group : option.group ,
                    Status : 'Incomplete'
                }

                todoArray.push(newTodo) ;

                fs.writeFile('./todos.json' , JSON.stringify(todoArray,null,2) , (err) => {
                    if (err) {
                        console.log('Error Occurred ') ;
                    } else {
                        console.log('ToDo Added Successfully') ;
                    }
                })

            }
        })
    }) ;

// Command to Update a Todo

program
    .command('Update')
    .description('It is used to update a todo to the ToDo List')
    .argument('<id>','ID of the todo to be updated')
    .option('-t , --todo <todo>','It is the todo to be updated')
    .option('-p , --priority <level>' , 'It is the updated priority level of the todo (High , Medium , Low)' )
    .option('-g , --group <group>' , 'It is the updated group of the todo')
    .action((id , option) => {
        fs.readFile('./todos.json' , 'utf-8' , (err , result) => {
            if (err) {
                console.log(`Error Occurred During Reading . \n Error : ${err}`) ;
            } else {
                let todoArray = parseTodo(result) ;

                if (todoArray.length == 0) {
                    console.log('Todo List is empty . Please add a new todo') ;
                } else {
                    let updateTodoIndex =  todoArray.findIndex((t) => (t.Id == id)) ;

                    if (updateTodoIndex == -1) {
                        console.log('Todo does not exist') ;
                    } else {
                        todoArray[updateTodoIndex].Todo = option.todo ?? todoArray[updateTodoIndex].Todo ;
                        todoArray[updateTodoIndex].Priority = option.priority ?? todoArray[updateTodoIndex].Priority ;
                        todoArray[updateTodoIndex].Group = option.group ?? todoArray[updateTodoIndex].Group ;

                        fs.writeFile('./todos.json' , JSON.stringify(todoArray,null,2) , (err) => {
                            if (err) {
                                console.log('Error Occurred ') ;
                            } else {
                                console.log('ToDo Updated Successfully') ;
                            }
                        })
                    }
                }
            }
        })
    }) ;


// Command to mark a Todo as complete

program
    .command('mark')
    .description('It is used to mark a todo as complete')
    .argument('<id>','ID of the todo to be updated')
    .action((id) => {
        fs.readFile('./todos.json' , 'utf-8' , (err , result) => {
            if (err) {
                console.log(`Error Occurred During Reading . \n Error : ${err}`) ;
            } else {
                let todoArray = parseTodo(result) ;

                if (todoArray.length == 0) {
                    console.log('Todo List is empty . Please add a new todo') ;
                } else {
                    let updateTodoIndex =  todoArray.findIndex((t) => (t.Id == id)) ;

                    if (updateTodoIndex == -1) {
                        console.log('Todo does not exist') ;
                    } else {
                        todoArray[updateTodoIndex].Status = "Complete" ;

                        fs.writeFile('./todos.json' , JSON.stringify(todoArray,null,2) , (err) => {
                            if (err) {
                                console.log('Error Occurred ') ;
                            } else {
                                console.log('ToDo Marked Successfully') ;
                            }
                        })
                    }
                }
            }
        })
    }) ;

// Command to Delete a Todo 

program
    .command('delete')
    .description('It is used to delete a todo ')
    .argument('<id>','ID of the todo to be deleted')
    .action((id) => {
        fs.readFile('./todos.json' , 'utf-8' , (err , result) => {
            if (err) {
                console.log(`Error Occurred During Reading . \n Error : ${err}`) ;
            } else {
                let todoArray = parseTodo(result) ;

                if (todoArray.length == 0) {
                    console.log('Todo List is empty . Please add a new todo') ;
                } else {
                    let updateTodoIndex =  todoArray.findIndex((t) => (t.Id == id)) ;

                    if (updateTodoIndex == -1) {
                        console.log('Todo does not exist') ;
                    } else {
                        
                        todoArray.splice(updateTodoIndex,1) ;

                        fs.writeFile('./todos.json' , JSON.stringify(todoArray,null,2) , (err) => {
                            if (err) {
                                console.log('Error Occurred ') ;
                            } else {
                                console.log('ToDo Marked Successfully') ;
                            }
                        })
                    }
                }
            }
        })
    }) ;

// Command to Display Todo with different options 

program
    .command('display')
    .description('It is used to display a todo ')
    .option('-i , --id <ID>','ID of the Todo to be Displayed Alone')
    .option('-p , --priority <level>',' Priority Level of Todo to be Displayed ')
    .option('-g , --group <group> ' , 'Group of the Todo to be Displayed')
    .action((option) => {
        fs.readFile('./todos.json' , 'utf-8' , (err , result) => {
            if (err) {
                console.log(`Error Occurred During Reading . \n Error : ${err}`) ;
            } else {
                let todoArray = parseTodo(result) ;

                if (todoArray.length == 0) {
                    console.log('Todo List is empty . Please add a new todo') ;
                } else {

                    let todoArray = parseTodo(result)

                    if (todoArray.length === 0) {
                        console.log('ToDo List is Empty . Please Add a Todo to the ToDo List');
                        return 
                    }

                    if (option.priority) {
                        displayArray = todoArray.filter((todoObj) => (todoObj.Priority == option.priority))
                        if (displayArray.length == 0) {
                            console.log('No ToDo Belonging To The Specified Priority')
                        } else {
                            console.log(displayArray)
                        }
                    }

                    if (option.group) {
                        displayArray = todoArray.filter((todoObj) => (todoObj.Group == option.group))
                        if (displayArray.length == 0) {
                            console.log('No ToDo Belonging To The Specified Group')
                        } else {
                            console.log(displayArray)
                        }        
                    }

                    if (option.id) {
                        displayArray = todoArray.filter((todoObj) => (todoObj.Id == option.id))
                        if (displayArray.length == 0) {
                            console.log('No ToDo Belonging To The Specified ID')
                        } else {
                            console.log(displayArray)
                        }  
                    }

                    if (Object.keys(option).length == 0 ) {
                        todoArray.forEach((todoObj) => {
                            console.log(todoObj)
                        })
                    }
                }
            }
        })
    }) ;

program.parse() ;