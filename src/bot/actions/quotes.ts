// so true
import { TextChannel } from "discord.js";
import { botClient } from "../client";

const QUOTES = [
    "<@497226382573699084> hi https://youtu.be/bq7coAa865Q",
];
const CHANNEL_ID = "1173630298936856708";
const INTERVAL = 60000 //3600000; // 10 Minutes

let currentClient: botClient | undefined = undefined;
let intervalHandler: NodeJS.Timeout | undefined = undefined;

function setClient(client: botClient) {
    currentClient = client;
}

function run() {
    if (intervalHandler) {
        clearInterval(intervalHandler);
    }
    intervalHandler = setInterval(() => {
        if (!currentClient) {
            return;
        }

        let foundChannel = currentClient.channels.cache.get(CHANNEL_ID);
        if (foundChannel) {
            (foundChannel as TextChannel).send(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
        }
    }, INTERVAL);
}

export { setClient, run }