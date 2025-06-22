import fetch from 'node-fetch';

interface Todo{
    userid :number;
    id : number
    title : string;
    completed : boolean;
}
export class DataProcessor {
   public calculateSumFromArgs (args:string[]):number{
    const num: number[] =args.map(Number);
    return  num.reduce((a,b) => a + b, 0);
   }
   public async fetchTodo(): Promise <Todo> {
    const url = `https://jsonplaceholder.typicode.com/todos/1`;
    const response = await fetch(url);

    if (!response.ok){
        throw new Error('network response was not ok');
    }
    const data:unknown = await response.json();

    if(
        typeof data === 'object' &&
        data !== null &&
        'title' in data &&
        typeof (data as {title:unknown}).title ==='string')
        {
            return data as Todo;
        }
        throw new Error ('unexpected API response structure');
   }

    public async run(args:string[]): Promise<string>{
    try{
        const sum:number = this.calculateSumFromArgs(args);
        const todo:Todo = await this.fetchTodo();
        const output:string = `sum:${sum},Title:${todo.title}`;
        console.log(output);
        return output;
    }
    catch (error:unknown) {
        const message:string = error instanceof Error? error.message:'unknown error';
        const errorMessage:string = `error: ${message}`;
        console.error(errorMessage);
        return errorMessage;
    }
}
}
if (require.main === module){
    const args: string[] = process.argv.slice(2);
    const processor =new DataProcessor();
    processor.run(args);
}


 