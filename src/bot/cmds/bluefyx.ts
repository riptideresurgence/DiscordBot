import { ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { botCompatibilityLayer } from "../client"

module.exports = {
	slashData: new SlashCommandBuilder()
		.setName("bluefyx")
		.setDescription("bluefyx")
        .addStringOption((option: SlashCommandStringOption) => option.setName("bluefyx").setDescription("bluefyx").setRequired(true)),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
        return newLayer.reply(`https://media.discordapp.net/attachments/1088196021982609420/1168722340419489844/caption.gif`)
	},
};