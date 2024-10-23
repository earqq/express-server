import { Request, Response } from "express";


const todos = [
    {
        id: 1,
        title: 'Learn TypeScript',
        completed: false
    },
    {
        id: 2,
        title: 'Learn Node.js',
        completed: false
    },
    {
        id: 3,
        title: 'Learn Express.js',
        completed: false
    }
];



export class TodosController  {

    constructor() {}

    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        const todo = todos.find(todo => todo.id === id);
        if(todo){
            res.json(todo);
        }else{
            res.status(404).json({message: 'Todo not found'});
        }
    }

    public createTodo = (req: Request, res: Response) => {
        const { title } = req.body;
        const todo = {
            id: todos.length + 1,
            title,
            completed: false
        }
        todos.push(todo);
        res.status(201).json(todo);
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        const { title, completed } = req.body;
        const todo = todos.find(todo => todo.id === id);
        if(todo){
            todo.title = title;
            todo.completed = completed;
            res.json(todo);
        }else{
            res.status(404).json({message: 'Todo not found'});
        }
    }
    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        const index = todos.findIndex(todo => todo.id === id);
        if(index !== -1){
            todos.splice(index, 1);
            res.json({message: 'Todo deleted'});
        }else{
            res.status(404).json({message: 'Todo not found'});
        }
    }
}