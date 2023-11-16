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
    "cyriss is such a cyriss",
    "https://www.youtube.com/watch?v=h1HM57j-ShE",
    "Hello everybody my name is Markiplier",
    "vuhzl is a girl, kill em",
    "codex_promo",
    "boost server for tester",
    "brenkar clock",
    "repost to scare crazyblox",
    "rizz",
    "https://media.discordapp.net/attachments/1116091340216868867/1148391790521618482/caption.gif",
    "https://tenor.com/view/rr-riptide-resurgence-fe2-resurgence-riptide-gif-3199897355922511130",
    ""
];
const CHANNEL_ID = "1174491501967982663";
const INTERVAL = 60 * 10 * 1000; // 10 Minutes

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