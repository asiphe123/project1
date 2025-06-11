function numbersum(){
    let num = process.argv.slice(2).map(Number);
    let sum = num.reduce((a,b)=> a+b, 0);
    const ToDo = `https://jsonplaceholder.typicode.com/todos/${sum}`;

    
    fetch(ToDo)
        .then(response =>{
            if (! response.ok){
                throw new Error("response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log(`sum: ${sum} , Title: ${data.title}`);
        })
        .catch(error => {
            console.error("fetch Error:", error);
        });
}
 numbersum();