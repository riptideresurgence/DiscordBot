import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import { botClient, botCompatibilityLayer } from "../client"

module.exports = {
	slashData: new SlashCommandBuilder()
		.setName("mippy_stinks")
		.setDescription("Pings mippy 10 times."),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);

		botClient.guilds.get(`1173630297657585725`).channels.get(`1173630298936856708`).send("<@876953124546420830>")
	},
};