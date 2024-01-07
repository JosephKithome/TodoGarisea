import { Schema, model, models } from 'mongoose';

const TodoSchema = new Schema({
    creator: {
        // type: Schema.Types.ObjectId,
        type: String
        //ref: "User", // this is how we define relationships in Mongoose
    },
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a  description!'],
    },

    status: {
        type: Boolean,
        required: [false],
    },
    creationDate: {
        type: Date,
    }
});

const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;