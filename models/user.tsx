import { Schema, model, models } from 'mongoose';

const UserSchema  = new Schema({
    enmail: {
        type: 'string',
        unique: [true, "Email already registered"],
        required: [true, "Email is required"]
    },
    username: {
            type: 'string',
            required: [true, "Username is required"]
    },
    password: {
        type: 'string',
        required: [true, "Password is required"]
    },
    image: {
        type: 'string',
    }
});

const  User = models.User || model("User", UserSchema);

export default User;