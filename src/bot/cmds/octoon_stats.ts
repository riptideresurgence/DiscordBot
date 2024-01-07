import { ChatInputCommandInteraction, EmbedBuilder, Message, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { botCompatibilityLayer } from "../client"

import * as core from "@riptide/core";

const XP_CAP = 25000;

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
};

function getMaxXP(level: number) {
    const xpMath = 200 + (level - 1) * 400;
    return clamp(xpMath, 1, XP_CAP);
}

module.exports = {
	slashData: new SlashCommandBuilder()
		.setName("octoon_stats")
		.setDescription("Fetch a player's Octoon stats.")
        .addStringOption((option: SlashCommandStringOption) => option.setName("user_name").setDescription("User name of a player.").setRequired(true)),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
        if (interaction instanceof ChatInputCommandInteraction)
            if (args.length == 0)
            args = [interaction.options.getString("user_name")]

        const username: string | undefined = args[0];
        if (!username)
            return newLayer.reply("User name must be a string.");
        

        return newLayer.reply("The game isn't in a state where stats can be obtained, please wait until the game releases or a playtest occurs.");
	},
};
