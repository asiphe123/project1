const fetch = require('node-fetch');

async function numbersum(){
    let num = process.argv.slice(2).map(Number);
    let sum = num.reduce((a,b)=> a+b, 0);
    const ToDo = `https://jsonplaceholder.typicode.com/todos/1`;  // Always fetch todo #1 as per test
    
    try {
        const response = await fetch(ToDo);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const output = `sum:${sum}, Title: ${data.title}`;
        console.log(output);
        return output;
    } catch (error) {
        const errorMessage = `error: ${error.message}`;
        console.error(errorMessage);
        return errorMessage;
    }
}

if (require.main === module){
    numbersum();
}

module.exports = {numbersum};
 