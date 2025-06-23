// Create a command line interface that lets the user specify a file path and the nodejs process counts the number of words , sentences inside it and also tells whether a given word is present in it or not .
// Input - node index.js /Users/arpit/file.txt
// Output - You have 10 words in this file

const fs = require('fs') ;

const { Command } = require('commander');
const program = new Command();

program
  .name('FileReader')
  .description('CLI to do File based operations')
  .version('1.0.1');

program
  .command('readWords')
  .description('Reads the file and tells the number words in it')
  .argument('<file>','Path of the file')
  .action((file) => {
    fs.readFile(file,'utf-8',(err,result) => {
        if (err) {
            console.log(`Error : ${err}`) ;
        } else {
            let words = result.trim().split(/\s+/).length ;
            console.log(`Number of Words : ${words}`);
        }
    }) ;
});

program
  .command('readSentences')
  .description('Reads the file and tells the number Sentences in it')
  .argument('<file>','Path of the file')
  .action((file) => {
    fs.readFile(file,'utf-8',(err,result) => {
        if (err) {
            console.log(`Error : ${err}`) ;
        } else {
            let sentences = result.trim().split("\n").length ;
            console.log(`Number of Sentences : ${sentences}`);
        }
    }) ;
});

program
    .command('searchFile')
    .description('Reads the file and tells the whether the given word is present in it or not')
    .argument('<file>','Path of the file')
    .argument('<word>','word to be searched in the file')
    .action((file,word) => {
        fs.readFile(file,'utf-8',(err,result) => {
            if (err) {
                console.log(`Error : ${err}`) ;
            } else {
                let truthValue = result.includes(word) ;
                if (truthValue) {
                    console.log("Word Found In The File") ;
                } else {
                    console.log("Word Not Found") ;
                }
            }
    })
})

program.parse();