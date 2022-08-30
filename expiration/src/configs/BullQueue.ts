const Queue = require('bull');

const queues: { [key: string]: any } = {}

export const getQueue = (queueName: string) => {
    if (!queues[queueName]) {
        queues[queueName] = new Queue(queueName, process.env.REDIS_URL);
    }

    return queues[queueName]
}

