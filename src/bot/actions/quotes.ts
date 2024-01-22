// so true
import { TextChannel } from "discord.js";
import { botClient } from "../client";

const QUOTES = [
    "https://www.youtube.com/watch?v=hncs8JIN1cA&pp=ygUTZG91Z2RvdWcgZmF0IGFsYmVydA%3D%3D",
    "⚠️ Community Notice ⚠️\n**We do NOT tolerate abuse from others against the community, its creators and their creations.**\nFollow the rules: https://discord.com/channels/1173630297657585725/1173630412396953610\nReport members breaking rules: https://discord.com/channels/1173630297657585725/1179748474955243572",
];
const CHANNEL_ID = "1173630298936856708";
const INTERVAL = 1800000; // 10 Minutes

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