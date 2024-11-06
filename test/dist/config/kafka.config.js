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
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
class KafkaConfig {
    constructor(brokers) {
        this.kafka = new kafkajs_1.Kafka({
            clientId: 'my-app',
            brokers: brokers
        });
        this.consumer = this.kafka.consumer({
            groupId: 'my-group'
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.consumer.connect();
            }
            catch (error) {
                throw new Error(`Error connecting to Kafka: ${error.message}`);
            }
        });
    }
    subscribe(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.consumer.subscribe({ topic, fromBeginning: true });
            }
            catch (error) {
                throw new Error(`Error subscribing to topic: ${error.message}`);
            }
        });
    }
    consume(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.consumer.run({
                    eachMessage: ({ topic, partition, message }) => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        callback(JSON.parse((_a = message === null || message === void 0 ? void 0 : message.value) === null || _a === void 0 ? void 0 : _a.toString()));
                    })
                });
            }
            catch (error) {
                throw new Error(`Error consuming messages: ${error.message}`);
            }
        });
    }
    createTopic(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const topicExists = yield this.admin.listTopics();
                if (!topicExists.includes(topic)) {
                    yield this.admin.createTopics({
                        topics: [{ topic }]
                    });
                }
                console.log(`Topic ${topic} created successfully`);
            }
            catch (error) {
                throw new Error(`Error creating topic: ${error.message}`);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consumer.disconnect();
            yield this.admin.disconnect();
        });
    }
}
exports.default = new KafkaConfig(['localhost:9092']);
//# sourceMappingURL=kafka.config.js.map