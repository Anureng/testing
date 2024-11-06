import mongoose from "mongoose";
import user from "../../models/User";
import kafkaConfig from "../../config/kafka.config";

export const postConsumer = async () => {
    const messageQueue = [];
    let processing = false;

    try {
        console.log("Subscribing to Kafka topic 'addToCart'...");
        await kafkaConfig.subscribe('addToCart');
        console.log("Subscribed successfully.");

        await kafkaConfig.consume(async (msg) => {
            console.log("Received a new message from Kafka:", msg);
            console.log("Received a new message from Kafka in value format:", msg.addToCart);

            // Check if msg.value is defined
            if (msg === undefined) {
                console.error("Received message value is undefined."); // Log the issue
                return; // Exit early if message value is undefined
            }

            let messageData;
            try {
                console.log("Parsing message...");
                messageData = msg; // Convert to string before parsing
                console.log("Message parsed successfully:", messageData);
            } catch (parseError) {
                console.error("Error parsing message value:", parseError.message);
                return; // Exit if parsing fails
            }

            const { id, addToCart } = messageData;

            // Validation checks
            if (!id || !addToCart) {
                console.error("Validation failed: Missing id or addToCart in message");
                return; // Exit if either id or addToCart is missing
            }

            console.log(`Adding message to queue: id=${id}, addToCart=${addToCart}`);
            messageQueue.push({ id, addToCart });
            console.log("Current messageQueue length:", messageQueue.length);

            // Process messages in bulk if the queue reaches a certain size
            if (messageQueue.length >= 1) {
                console.log("Message queue reached 50 or more, preparing bulk operations...");

                const bulkOperations = messageQueue.map((item) => {
                    if (!mongoose.Types.ObjectId.isValid(item.addToCart)) {
                        console.error("Validation failed: adAVAdToCart is not a valid ObjectId:", item.addToCart);
                        return null; // Return null if validation fails
                    }

                    console.log(`Preparing bulk operation for user id=${item.id} with addToCart=${item.addToCart}`);
                    return {
                        updateOne: {
                            filter: { _id: item.id },
                            update: { $push: { cart: item.addToCart } },
                            upsert: false,
                        },
                    };
                }).filter(Boolean); // Remove any null operations

                console.log("Bulk operations prepared:", bulkOperations);

                if (bulkOperations.length > 0) {
                    try {
                        console.log("Executing bulkWrite...");
                        await user.bulkWrite(bulkOperations);
                        console.log("Bulk update successful");
                        messageQueue.length = 0; // Clear the queue after processing
                    } catch (bulkError) {
                        console.error("Error during bulk update:", bulkError.message);
                    }
                } else {
                    console.warn("No valid bulk operations to execute.");
                }
            }

            // Handle processing batch timeout
            if (!processing) {
                console.log("Starting batch processing timeout...");
                processing = true;
                setTimeout(() => {
                    console.log("Batch processing complete, clearing queue if not already cleared");
                    messageQueue.length = 0; // Clear the queue if not already cleared
                    processing = false;
                }, 1000);
            }
        });
    } catch (error) {
        console.error("Error in consumer:", error.message);
    }
};
