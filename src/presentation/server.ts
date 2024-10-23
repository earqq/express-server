

import express, { Router } from 'express'
import path from 'path';

interface options {
    PORT: number,
    PUBLIC_PATH: string
    routes: Router
}

export class Server {

    private app = express();
    private readonly PORT: number;
    private readonly PUBLIC_PATH: string;
    private readonly routes: Router;
    
    constructor(options: options){
        const { PORT, PUBLIC_PATH='public', routes } = options;
        this.PORT = PORT;
        this.PUBLIC_PATH = PUBLIC_PATH
        this.routes = routes;

    }
    async start(){
        //*Middlewares
        this.app.use(express.json());

        //*Static files
        this.app.use(express.static(this.PUBLIC_PATH));

        //*Routes
        this.app.use(this.routes);

        //*SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.PUBLIC_PATH}/index.html`);
            res.sendFile(indexPath);
        });


        this.app.listen(this.PORT, () => {
            console.log(`Server is running on port ${this.PORT}`);
        });
    }
}