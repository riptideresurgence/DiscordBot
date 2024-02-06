import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import { botCompatibilityLayer } from "../client"

module.exports = {
	slashData: new SlashCommandBuilder()
		.setName("mippy_stinks")
		.setDescription("Pings mippy 10 times."),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
		newLayer.reply(`<@876953124546420830>`)
		newLayer.reply(`<@876953124546420830>`)
		newLayer.reply(`<@876953124546420830>`)
		newLayer.reply(`<@876953124546420830>`)
		newLayer.reply(`<@876953124546420830>`)
		newLayer.reply(`<@876953124546420830>`)
		newLayer.reply(`<@876953124546420830>`)
		newLayer.reply(`<@876953124546420830>`)
		newLayer.reply(`<@876953124546420830>`)
		newLayer.reply(`<@876953124546420830>`)
	},
};