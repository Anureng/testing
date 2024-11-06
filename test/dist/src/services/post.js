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
exports.init = void 0;
const kafka_config_1 = __importDefault(require("../../config/kafka.config"));
const database_1 = require("../../database/database");
const postConsumer_1 = require("./postConsumer");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoUri = 'mongodb+srv://nrgsidhu:test123@cluster0.gtad7.mongodb.net/';
        console.log("Connecting to Kafka...");
        yield kafka_config_1.default.connect();
        console.log("Connected to Kafka successfully.");
        console.log("Connecting to MongoDB...");
        yield (0, database_1.connectDb)(mongoUri);
        console.log("Connected to MongoDB successfully.");
        console.log("Starting Kafka consumer...");
        yield (0, postConsumer_1.postConsumer)();
        console.log("Kafka consumer started successfully.");
    }
    catch (error) {
        console.log(error);
    }
});
exports.init = init;
//# sourceMappingURL=post.js.map