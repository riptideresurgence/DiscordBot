const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ],
});

const channelId = '1176997797485101057';
const guildId = '1173630297657585725';

const possibleIcons = [
    "https://media.discordapp.net/attachments/1176997797485101057/1202371817390604369/256px-S3_Weapon_Main_Slosher.png",
];
const possibleNames = [
    "sloshermapped."
];

const linkRegexp = new RegExp("\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))");
function findLinksWithExtension(content: string, extension: string) {
    const foundLinks = linkRegexp.exec(content);
    return foundLinks ? foundLinks.filter((link) => link.indexOf(extension) != -1) : [];
}

client.once('ready', () => {
    changeGuildIcon();
    setInterval(changeGuildIcon, 12 * 60 * 60 * 1000);
});

async function changeGuildIcon() {
    try {
        const guild = await client.guilds.fetch(guildId);

        const coolNumber = Math.floor(Math.random() * possibleIcons.length)

        if (!guild) {
            throw new Error('Guild not found.');
        }

        guild.setIcon(possibleIcons[coolNumber]);
        guild.setName(possibleNames[coolNumber]);
    } catch (error) {
       
    }
}