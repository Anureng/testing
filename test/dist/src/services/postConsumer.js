"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postConsumer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../../models/User"));
const kafka_config_1 = __importDefault(require("../../config/kafka.config"));
const postConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    const messageQueue = [];
    let processing = false;
    try {
        console.log("Subscribing to Kafka topic 'addToCart'...");
        yield kafka_config_1.default.subscribe('addToCart');
        console.log("Subscribed successfully.");
        yield kafka_config_1.default.consume((msg) => __awaiter(void 0, void 0, void 0, function* () {
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
            }
            catch (parseError) {
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
                    if (!mongoose_1.default.Types.ObjectId.isValid(item.addToCart)) {
                        console.error("Validation failed: addToCart is not a valid ObjectId:", item.addToCart);
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
                        yield User_1.default.bulkWrite(bulkOperations);
                        console.log("Bulk update successful");
                        messageQueue.length = 0; // Clear the queue after processing
                    }
                    catch (bulkError) {
                        console.error("Error during bulk update:", bulkError.message);
                    }
                }
                else {
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
        }));
    }
    catch (error) {
        console.error("Error in consumer:", error.message);
    }
});
exports.postConsumer = postConsumer;
//# sourceMappingURL=postConsumer.js.map