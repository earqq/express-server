


export class CreateTodoDto{

    constructor(
        public readonly title: string
    ){
    }

    static create ( props: { [key:string]: any } ): [string?, CreateTodoDto?]{ 
        
        const { title } = props;
        if(!title){
            return ['title is required', undefined];
        }

        return [undefined, new CreateTodoDto(title)];
    }
}