// so true
import { TextChannel } from "discord.js";
import { botClient } from "../client";

const QUOTES = [
    "hey all, scott here",
    "riptide resurgence",
    "https://media.tenor.com/y07NOAwa7RkAAAAd/scott-scott-the-woz.gif",
    "bluefyx",
    "i have a pen, i have an apple\nAW, apple pen",
    "clog",
    "🌊 Riptide Resurgence is a fan-made remake of Flood Escape 2 with tons of new game-modes, features, mechanics and events to keep the game fresh! Escape a rising tide in various different maps using whatever you can to do so or head into an all-out war for victory in 4v4 player vs player battles!",
    "https://www.youtube.com/watch?v=YZ86Awv8Fzk",
    "sussy baka",
    "Hello! I am a girl, and I need Nitro! DM me if you want to give me nitro. I am a girl btw.",
    "cyriss is such a cyriss"
];
const CHANNEL_ID = "1088196021982609420";

let currentClient: botClient | undefined = undefined;
let intervalHandler: NodeJS.Timeout | undefined = undefined;
const INTERVAL = 60 * 15 * 1000; // 15 Minutes

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