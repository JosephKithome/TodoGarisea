import connectToDb  from "../../../utils/database";
import Todo from "../../../models/Todo";
export const GET = async (req: Request, res: Response) =>{

   try{
    await connectToDb();

    const  todos = await Todo.find();

    console.log(todos);
    return new Response(JSON.stringify(todos),{status: 200});
   }catch(err){
    return new Response("Failed to fetch todos",{status: 500});
   }

}