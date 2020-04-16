// const commander = require("commander")
// const program = commander.program;

const { program } = require("commander");
// reads commander as an object

// chaining example
program 
    .option("-g", "Print a greeting", false)
    .option("--count <count-number>", "Count to this number", 10)
    .parse(process.argv);

if (program.G) {
    console.log("Hi there!");
}

for (let i = 0; i < program.count, i++) {
    console.log(`Counted to ${i}`);
}