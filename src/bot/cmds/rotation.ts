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
		.setName("rotation")
		.setDescription("Get the current Octoon stage rotation.")
        .addStringOption((option: SlashCommandStringOption) => 
        option.setName("section")
            .setDescription("Select the rotation to display.")
            .setRequired(true)
            .addChoices(
                {name: "Casual Battle", value: "regbattle"},
                {name: "Ranked Battle", value: "rankbattle"},
            )
    ),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
        if (interaction instanceof Message) {
            return newLayer.reply("This command can only be used as a slash command.");
        }

        const leaderboardSection = interaction.options.getString("section");
        if (!leaderboardSection) {
            return newLayer.reply("No rotation selected, cannot display.");
        }
        

        return newLayer.reply("The game isn't in a state where the current stage rotation can be obtained, please wait until the game releases or a playtest occurs.");
	},
};
