import { botClient } from "./bot/client";
import { IntentsBitField } from "discord.js";

export function createClient(prefix: string, clientId: string, token: string) {
    const intents = new IntentsBitField();
    intents.add(
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildInvites,
        IntentsBitField.Flags.GuildEmojisAndStickers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildModeration,
    );

    const client = new botClient(prefix, clientId, token, {
        intents: intents,
    });

    client.login();
}