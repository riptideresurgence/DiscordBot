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
    "GeoNow stinks",
    "https://www.youtube.com/watch?v=5_mx2pfrtFs&ab_channel=2HOESLOL",
    "the fr!nch isnt real…",
    "https://cdn.discordapp.com/attachments/1196091574363377705/1204094857518391316/d4973e2ecefa4aeeab880a3d6bafd61f.mp4?ex=65d37bb9&is=65c106b9&hm=82c6dbecf006a99909050decae73494037e4a2c8cd01c20b254281a32bee1af9&",
    "FLY HIGH VOLCANIC ERUPTION PASSIVITY 🕊️",
    "anotha dub for the dub nation",
    "need\nMORE\nTRENDHOPPING",
    "You take in butt 😂",
    "That's because they are. These dumb developers do it on purpose and hope someone to find the OP shortcut way.",
    "Man Kidnaps Little Girl, You...\nTomorrow's Teachings\nexlizz",
    "https://cdn.discordapp.com/attachments/1196091574363377705/1199868798598135878/cachedVideo.mp4?ex=65d690e6&is=65c41be6&hm=2f1b6d13a007c3602436e70f9ca0a6d803d5de975056e078bfd64a8f6f44eea0&",
    "Piracy is no party. You will now be judged by the council.",
    "Stay Focused on Fortnite, man you know what I’m saying? build- get a lot of materials- get a good team. The way to get dub, is get a good team. That’s what you need. 💯",
    "does the goat really need this? let me know in the comments.",
    "https://media.discordapp.net/attachments/1173630298936856708/1191933810456133662/togif.gif?ex=65d5625d&is=65c2ed5d&hm=f213f87e2d51be6f5af0ebba59ddc8df736d92a37eb973b117865d0fd6cf67b8&=",
    "smortyes"
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