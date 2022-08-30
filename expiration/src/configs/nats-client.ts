import Nat, { Stan } from "node-nats-streaming"

class NatsClient {

    private client: Stan | undefined;

    constructor() {
        this.init();
    }

    init() {
        if (!this.client) {

            this.client = Nat.connect(
                // @ts-ignore
                process.env.NATS_CLUSTER_ID, 
                'random2', 
                { url: process.env.NATS_URL }
            )
            this.client.on("connect", async () => {

                this.client?.on("connect_lost", (error) => {
                    this.client = undefined;
                    console.log("Error:", error)
                })
            })
        }
    }

    getClient() {
        if (!this.client) {
            throw new Error("Something is wrong! You don't have client connection with nats-streaming, check error logs that you have.")
        }
        return this.client;
    }
}

const natsClient = new NatsClient();

export default natsClient;