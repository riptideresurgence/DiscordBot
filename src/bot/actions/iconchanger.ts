// const { Client, Intents } = require('discord.js');

// so true
import { Guild } from "discord.js";
import { botClient } from "../client";

//const client = new Client({
//    intents: [
//        Intents.FLAGS.GUILDS
//    ],
//});

const guildId = '1173630297657585725';
const INTERVAL = 43200000

const possibleIcons = [
    "https://media.discordapp.net/attachments/1176997797485101057/1202371817390604369/256px-S3_Weapon_Main_Slosher.png",
];
const possibleNames = [
    "sloshermapped."
];

let currentClient: botClient | undefined = undefined;
let intervalHandler: NodeJS.Timeout | undefined = undefined;


//client.once('ready', () => {
//    changeGuildIcon();
//    setInterval(changeGuildIcon, 12 * 60 * 60 * 1000);
//});

//async function changeGuildIcon() {
//  try {
//      const guild = await client.guilds.fetch(guildId);

//      const coolNumber = Math.floor(Math.random() * possibleIcons.length)

//      if (!guild) {
//          throw new Error('Guild not found.');
//      }
//
//      guild.setIcon(possibleIcons[coolNumber]);
//      guild.setName(possibleNames[coolNumber]);
//  } catch (error) {
//       
//  }
//}

function setClient(client: botClient) {
    currentClient = client;
}

function setInfo() {
    if (!currentClient) {
        return;
    }
    
    const guild = currentClient.guilds.fetch(guildId);

 
    const coolNumber = Math.floor(Math.random() * possibleIcons.length)

  
    if (!guild) {
        return;
    }

    Guild.setIcon(possibleIcons[coolNumber]);
    Guild.setName(possibleNames[coolNumber]);
}

function run() {
    setInfo()
    if (intervalHandler) {
        clearInterval(intervalHandler);
    }
    intervalHandler = setInterval(() => {
        setInfo()
    }, INTERVAL);
}

export { setClient, run }