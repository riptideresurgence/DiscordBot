const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ],
});

const guildId = '1173630297657585725';
const coolInterval = 60000; //43200000

let intervalHandler: NodeJS.Timeout | undefined = undefined;

const possibleIcons = [
    "https://media.discordapp.net/attachments/1176997797485101057/1202371817390604369/256px-S3_Weapon_Main_Slosher.png", // sloshermapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202375961769676800/9k-2.png" // zombiemapped
];
const possibleNames = [
    "sloshermapped.",
    "zombiemapped."
];

function changeGuildIcon() {
    const guild = client.guilds.fetch(guildId);

    const coolNumber = Math.floor(Math.random() * possibleIcons.length)

    if (!guild) { 
       return
    }

    guild.setIcon(possibleIcons[coolNumber]);
    guild.setName(possibleNames[coolNumber]);
}

function run() {
    changeGuildIcon()
    if (intervalHandler) {
        clearInterval(intervalHandler);
    }
    intervalHandler = setInterval(() => {
        if (!client) {
            return;
        }
        changeGuildIcon()
    }, coolInterval);


}

export { run }