import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";



export class TodosController  {

    constructor() {}

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        res.json(todos);
    }

    public getTodoById =  async (req: Request, res: Response) => {
        const id = +req.params.id;
        const todo = await prisma.todo.findUnique({
            where: {
                id
            }
        });
        if(todo){
            res.json(todo);
        }else{
            res.status(404).json({message: 'Todo not found'});
        }
    }

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = await CreateTodoDto.create(req.body);
        if(error){
            res.status(400).json({message: error});
        }
        const { title } = req.body;

        const newTodo = await prisma.todo.create({
            data: {
                title
            }
        }).then(todo => {
            res.status(201).json(todo);
        }).catch(error => {
            res.status(500).json({message: 'Error creating todo'});
        });

        res.status(201).json(newTodo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const { title, completed } = req.body;
        const todo = await prisma.todo.update({
            where: {
                id
            },
            data: {
                title,
            }
        });
        if(todo){
            todo.title = title;
            res.json(todo);
        }else{
            res.status(404).json({message: 'Todo not found'});
        }
    }
    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const todo = await prisma.todo.delete({
            where: {
                id
            }
        });
        if(todo){
            res.json(todo);
        }
        else{
            res.status(404).json({message: 'Todo not found'});
        }
    }
}