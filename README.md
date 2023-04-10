# code-parser
Library that allows you parse files to interpret functions/statements/classes/other syntax in a variety of languages

## Setup:
1. Node 18.15.0 was used for development
2. Need to install yarn
3. Run `yarn install` to install dependencies
4. Run `yarn test` to run tests



## Logic breakdown/Roadmap:

There is a few types of information that are relevant that I would like to see.

One is just general metadata information based on where you are scoped. (For now I am scoping to individual files).

So for example:
1. Information about entire project files 
2. Information about directories
3. Information about individual files
4. Information about function/class/other block related elements

The type of information that would be provided for each scope is:

1. Name of item/element/symbol
2. Type of item (function, class, etc if block related)
3. Metadata relevant to scope, like how many lines of code, how many comments, how many statements, functions, etc

The second type of information is the actual parsed information inside of that scope. So the functions which might contain classes/properties/methods, etc...

### Roadmap/Current Goals:

1. Mainly focusing on Typescript/JavaScript for now, but ideally would like to expand to other languages
2. Create a framework for a generic parser that can be used to parse files for different languages
3. Focus on providing raw content of different scopes, like file content, lines, function blocks, etc...
4. Identify different symbols and the scopes that are contained within the file, like functions, classes, etc...
5. Provide metadata about the scopes, like how many lines of code, how many functions/classes/other symbols, etc...
6. Provide a way to take the parsed information and use it to identify advanced information