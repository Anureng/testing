import mongoose from "mongoose";

export const connectDb = (uri: string) => {
    mongoose.connect(uri, { dbName: "frame" })
        .then(() => {
            console.log('Connected to database');
        })
        .catch(() => {
            console.log("getting error connecting with database");
        })
}