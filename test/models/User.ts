import mongoose, { Schema, Document } from "mongoose";
interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    cart: mongoose.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: String,
    email: String,
    cart: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const user = mongoose.model<IUser>("user", userSchema)
export default user