import { ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandIntegerOption, SlashCommandStringOption } from "discord.js";
import { botCompatibilityLayer } from "../client"
const CHANNEL_ID = "1173630298936856708";

import { TextChannel } from "discord.js";
import { botClient } from "../client";

let currentClient: botClient | undefined = undefined;

module.exports = {
    permissions: ["SERVERMOD"],
	slashData: new SlashCommandBuilder()
		.setName("send_message")
		.setDescription("Sends a message in the #general channel with the bot.")
        .addStringOption((option: SlashCommandStringOption) => option.setName("msg").setDescription("The message the bot will send.").setRequired(true)),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
        if (interaction instanceof ChatInputCommandInteraction)
            if (args.length == 0)
                args = [interaction.options.getString("msg")]

        const username: string | undefined = args[0];
            if (!username)
                return newLayer.reply("Message must be a string.");
            
        if (!currentClient) {
            return;
        }

        let foundChannel = currentClient.channels.cache.get(CHANNEL_ID);
        if (foundChannel) {
            (foundChannel as TextChannel).send(username);
            return newLayer.reply(`Message sent.`)
        }
	},
};