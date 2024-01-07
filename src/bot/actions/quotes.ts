// so true
import { TextChannel } from "discord.js";
import { botClient } from "../client";

const QUOTES = [
    "https://media.discordapp.net/attachments/1187777649351856320/1193350957174628372/maxresdefault.png?ex=65ac65af&is=6599f0af&hm=38ae93d9c8274fc8246886210ad4c7668ca2da5aece3c949bfe8caf3f6f0ad6e&=&format=webp&quality=lossless&width=1246&height=701",
    ""
];
const CHANNEL_ID = "1173630298936856708";
const INTERVAL = 3600000; // 10 Minutes

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