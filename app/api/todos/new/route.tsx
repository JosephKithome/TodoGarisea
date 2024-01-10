import connectToDb  from "../../../../utils/database";
import Todo from "../../../../models/Todo";

export const POST = async (req: Request, res: Response) =>{

   const {userId,name, description, status,createdAt } =await req.json(); 

   try{
    await connectToDb();

    const newTodo = new Todo({
        creator: userId,
        name: name,
        description: description,
        status: status,
        creationDate: createdAt
    })

    // save the  data to the database
    await  newTodo.save();
    return new Response(JSON.stringify(newTodo), { status: 201});

   }catch(err){
    console.log(err);

    return new Response("Failed to create new response", { status: 500});
   }

}