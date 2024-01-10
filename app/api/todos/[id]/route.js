import connectToDb from "../../../../utils/database";
import Todo from "../../../../models/Todo";

export const GET = async (req, { params }, res) => {
    try {
        console.log(params.id)
        await connectToDb();


        // Retrieve a particular todo
        const todo = await Todo.findById(params.id);

         console.log("Retrieved todo:", todo);

        if (!todo) {
            return new Response("Todo not found", { status: 404 });
        }

        return new Response(JSON.stringify(todo), { status: 200 });
    } catch (err) {
        console.error("Error fetching todo:", err);
        return new Response("Failed to fetch todo", { status: 500 });
    }
}


export const PATCH = async (req, { params }, res) => {
    // Destructure the request
    const { name, description, status } = await req.json()

    try {
        await connectToDb();

        //Retrieve the existing todo

        const existingTodo = await Todo.findById(params.id);

        // check if prompt exists
        if (!existingTodo) {
            return new Response("Prompt does not exist", { status: 404 });
        }
        //otherwise update the existing
        existingTodo.name = name;
        existingTodo.description = description;
        existingTodo.status = status;
        await existingTodo.save();

        return new Response(`Prompt updated:: ${JSON.stringify(existingTodo)}`, { status: 200 });

    } catch (error) {
        return new Response(`Failed to update existing Todo`, { status: 500 });
    }
}

export const DELETE = async (req, { params }, res) => {

    try {

        console.log("The id is " + params.id);
        await connectToDb();

        //Retrieve the existing todo
        await Todo.findByIdAndDelete(params.id);


        return new Response(`Prompt deleted successfully`, { status: 200 });

    } catch (error) {
        return new Response(`Failed to delete existing Todo`, { status: 500 });
    }
}