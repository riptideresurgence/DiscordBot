// so true
import { TextChannel } from "discord.js";
import { botClient } from "../client";

const QUOTES = [
    "https://www.youtube.com/watch?v=hncs8JIN1cA&pp=ygUTZG91Z2RvdWcgZmF0IGFsYmVydA%3D%3D",
    "⚠️ Community Notice ⚠️\n**We do NOT tolerate abuse from others against the community, its creators and their creations.**\nFollow the rules: https://discord.com/channels/1173630297657585725/1173630412396953610\nReport members breaking rules: https://discord.com/channels/1173630297657585725/1179748474955243572",
    "Thank you! That trunk sure is useful, huh?",
    "That Goomba looks so serene.",
    "https://media.discordapp.net/attachments/889588841793618003/1169647579714302032/lv_0_20231102104112.gif?ex=65bbadb2&is=65a938b2&hm=90625879b84f9cc147d1f4fe2fc0bb7e05486fb5b39a5e4d498230de6b6aed47&=",
    "geonow is getting blacked... you'll never guess by what",
    "A BRACKEN!!",
    "https://media.discordapp.net/attachments/1190776756987236502/1198967622411231273/attachment.gif?ex=65c0d49c&is=65ae5f9c&hm=55ec4260406d9d598cb3bafb6fa58b71b1dd9fefbc7a6d9aaae7956349c8b653&=",
    "https://www.youtube.com/watch?v=Y45DvFuO7e0",
    "https://media.discordapp.net/attachments/1113082228927381518/1117499279880241312/attachment.gif?ex=65bfc34e&is=65ad4e4e&hm=9f433221f1ebb024354e6355dd6afea83be858cb4703040430adb64c1c4bd732&=",
    "lalala",
    "doing your mom? that's just... insulting!",
    "<@876953124546420830> fuck you",
    "rocraftmineblox0",
    "g",
    "this is a funny quote",
    "You can suggest quotes for what I can say in https://discord.com/channels/1173630297657585725/1196091574363377705!",
    "GeoNow stinks"
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