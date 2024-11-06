import kafkaConfig from "../../config/kafka.config"
import { connectDb } from "../../database/database"
import { postConsumer } from "./postConsumer"


export const init = async () => {
    try {
        const mongoUri = 'mongodb+srv://nrgsidhu:test123@cluster0.gtad7.mongodb.net/'
        console.log("Connecting to Kafka...");
        await kafkaConfig.connect();
        console.log("Connected to Kafka successfully.");

        console.log("Connecting to MongoDB...");
        await connectDb(mongoUri);
        console.log("Connected to MongoDB successfully.");

        console.log("Starting Kafka consumer...");
        await postConsumer();
        console.log("Kafka consumer started successfully.");
    } catch (error) {
        console.log(error);
    }
}