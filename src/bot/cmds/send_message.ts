import { ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { botCompatibilityLayer } from "../client"
import { TextChannel } from "discord.js";
import { botClient } from "../client";

let currentClient: botClient | undefined = undefined;

const CHANNEL_ID = "1173630298936856708";

module.exports = {
	permissions: ["SERVERMOD"],
	slashData: new SlashCommandBuilder()
		.setName("send_message")
		.setDescription("Send a message in #general with the bot.")
        .addStringOption((option: SlashCommandStringOption) => option.setName("Message").setDescription("The thing the bot will say.").setRequired(true)),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
		let foundChannel = currentClient.channels.cache.get(CHANNEL_ID);
        if (foundChannel) {
			return (foundChannel as TextChannel).send(args[0]);
        }
	},
}; 