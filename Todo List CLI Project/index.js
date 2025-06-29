const fs = require('fs') ;

const { Command } = require('commander') ;
const { ifError } = require('assert');
const program = new Command() ;

program
    .name('CLI Todo List')
    .description('It is a CLI that allows filesystem based todolist')
    .version('1.0.0') 

function parseTodo (result) {
    try {
        let data = JSON.parse(result) ;
        if (Array.isArray(data)) {
            return data ;
        } else {
            let initArray = [] ;
            return initArray ;
        }
    } catch (error) {
        console.log('Todo List is empty . Generating a New Todo List....')
        let newArray = [] ;
        return newArray ;
    }
}

program
    .command('add')
    .description('It is used to add a todo')
    .argument('<todo>','Todo to be added to the todo list')
    .option('-p , --priority <level>', 'It defines the priority level of the todo (High , Medium , Low )','Medium')
    .option('-g , --group <group>' , 'It defines the group of the todo ' , 'General')
    .action((todo, option) => {
        fs.readFile('./todos.json' , 'utf-8' , (err , result) => {
            if (err) {
                console.log(`Error Occurred . Error : ${err}`) ;
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
                    Status : "Incomplete"
                }

                todoArray.push(newTodo) ;

                fs.writeFile('./todos.json',JSON.stringify(todoArray,null,2) , (err) => {
                    if (err) {
                        console.log(`Error Occurred . Error : ${err}`) ;
                    } else {
                        console.log('Todo Added Successfully') ;
                    }
                })
            }
        })
    }) ;

program
    .command('update')
    .description('It is used to update the todo ')
    .argument('<Id>' , 'Todo Id that is to be updated')
    .option('-t , --todo <todo>' , 'Todo to be updated')
    .option('-p , --priority <level>' , 'Todo New Priority' )
    .option('-g , --group <group> ' , 'Todo New Group')
    .action((Id , option) => {
        fs.readFile('./todos.json' , 'utf-8' , (err , result) => {
            if (err) {
                console.log(`Error Occurred . Error : ${err}`) ;
            } else {
                let todoArray = parseTodo(result) ;

                if (todoArray.length == 0) {
                    console.log('Todo Array is empty') ;
                } else {
                    
                }
            }
        })
    })