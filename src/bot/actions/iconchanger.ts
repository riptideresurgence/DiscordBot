const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ],
});

const channelId = '1176997797485101057';
const guildId = '1173630297657585725';

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
        
        if (!guild) {
            throw new Error('Guild not found.');
        }

        const channel = guild.channels.cache.get(channelId);

        if (!channel) {
            throw new Error('Channel not found.');
        }

        const messages = await channel.messages.fetch();
        const imageMessages = messages.filter((msg: any) => msg.attachments.size > 0 || findLinksWithExtension(msg.content, ".gif").length > 0);

        if (imageMessages.size === 0) {
            throw new Error('No image messages found in the channel.');
        }

        const randomMessage = imageMessages.random();

        let imageUrl = undefined;
        if (randomMessage.attachments.size > 0) {
            imageUrl = randomMessage.attachments.first().url;
        } else {
            imageUrl = findLinksWithExtension(randomMessage.content, ".gif")[0];
        }

        try {
            await guild.setIcon(imageUrl);
        } catch (error) {
            
        }
    } catch (error) {
       
    }
}