# File Reader CLI

This Node.js script provides a command-line interface (CLI) for performing various file operations.

## Features

- Count the number of words in a file
- Count the number of sentences in a file
- Search for a word in a file

## Installation

1. Install Node.js on the system .
2. Copy or Download the `index.js` file.
3. Install the External Library `Commander` using :

   ```
   npm install commander 
   ```

## Usage

Run the script using Node.js :

### Available Commands

1. Count Words in a file:
   ```
   node index.js readWords <file>
   ```

2. Count Sentences in a file:
   ```
   node index.js readSentences <file>
   ```

3. Search for a WordsearchFile in a file:
   ```
   node index.js searchFile <file> <word>
   ```

## Examples

1. Count words in a file:
   ```
   node index.js readWords a.txt
   ```
   Output: `Number of Words : 28`

2. Count lines in a file:
   ```
   node index.js readSentences a.txt
   ```
   Output: `Number of Sentences : 4`

3. Search for a term in a file:
   ```
   node index.js searchFile 'a.txt' 'Monkey'
   ```
   Output: `Word Found In The File`

## Note

- Make sure the file you're operating on exists in the same directory as the script or provide the full path to the file.
- The search function is `Case Sensitive` .

## Error Handling

- If there is an error in reading the file, it will log the error .
- If the file is not found , it will log the error .

