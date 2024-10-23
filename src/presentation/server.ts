

import express from 'express'
import path from 'path';

interface options {
    PORT: number,
    PUBLIC_PATH: string
}

export class Server {

    private app = express();
    private readonly PORT: number;
    private readonly PUBLIC_PATH: string;
    
    constructor(options: options){
        const { PORT, PUBLIC_PATH='public' } = options;
        this.PORT = PORT;
        this.PUBLIC_PATH = PUBLIC_PATH
    }
    async start(){

        this.app.use(express.static(this.PUBLIC_PATH));

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.PUBLIC_PATH}/index.html`);
            res.sendFile(indexPath);
        });


        this.app.listen(this.PORT, () => {
            console.log(`Server is running on port ${this.PORT}`);
        });
    }
}