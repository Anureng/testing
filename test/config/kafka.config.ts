import { Kafka, Consumer, Admin } from "kafkajs";

class KafkaConfig {
    private kafka: Kafka;
    private consumer: Consumer;
    private admin: Admin;

    constructor(brokers: string[]) {
        this.kafka = new Kafka({
            clientId: 'my-app',
            brokers: brokers
        });
        this.consumer = this.kafka.consumer({
            groupId: 'my-group'
        });
    }

    async connect() {
        try {
            await this.consumer.connect();
        } catch (error: any) {
            throw new Error(`Error connecting to Kafka: ${error.message}`);
        }
    }

    async subscribe(topic: string) {
        try {
            await this.consumer.subscribe({ topic, fromBeginning: true });
        } catch (error: any) {
            throw new Error(`Error subscribing to topic: ${error.message}`);
        }
    }

    async consume(callback: (message: any) => void) {
        try {
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    callback(JSON.parse(message?.value?.toString()!));
                }
            });
        } catch (error: any) {
            throw new Error(`Error consuming messages: ${error.message}`);
        }
    }

    async createTopic(topic: string) {
        try {
            const topicExists = await this.admin.listTopics();
            if (!topicExists.includes(topic)) {
                await this.admin.createTopics({
                    topics: [{ topic }]
                })
            }
            console.log(`Topic ${topic} created successfully`);
        } catch (error: any) {
            throw new Error(`Error creating topic: ${error.message}`);
        }
    }

    async disconnect() {
        await this.consumer.disconnect();
        await this.admin.disconnect();
    }
}

export default new KafkaConfig(['localhost:9092'])