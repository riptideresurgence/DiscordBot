"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
const client_1 = require("./bot/client");
const discord_js_1 = require("discord.js");
function createClient(prefix, token) {
    const intents = new discord_js_1.IntentsBitField();
    intents.add(discord_js_1.IntentsBitField.Flags.Guilds, discord_js_1.IntentsBitField.Flags.GuildMembers, discord_js_1.IntentsBitField.Flags.GuildVoiceStates, discord_js_1.IntentsBitField.Flags.GuildInvites, discord_js_1.IntentsBitField.Flags.GuildEmojisAndStickers, discord_js_1.IntentsBitField.Flags.GuildMessages, discord_js_1.IntentsBitField.Flags.GuildMessageReactions, discord_js_1.IntentsBitField.Flags.GuildPresences, discord_js_1.IntentsBitField.Flags.GuildModeration);
    const client = new client_1.botClient(prefix, token, {
        intents: intents,
    });
    client.login();
}
exports.createClient = createClient;
