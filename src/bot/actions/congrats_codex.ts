// so true
import { TextChannel } from "discord.js";
import { botClient } from "../client";

const QUOTES = [
    "daily reminder to congratulate codex_promo https://media.discordapp.net/attachments/1212193048214118443/1212219344956956692/GGyRhq9WUAAuMAL.png"
];
const CHANNEL_ID = "1212193048214118443";
const INTERVAL = 86400000; // 10 Minutes

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