import { ChatInputCommandInteraction, EmbedBuilder, Message, SlashCommandBuilder, SlashCommandIntegerOption } from "discord.js";
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
		.setName("view_post")
		.setDescription("Fetch a specified Riptide Resurgence post.")
        .addIntegerOption((option: SlashCommandIntegerOption) => option.setName("post_number").setDescription("The post you want to view.").setRequired(true)),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);

        const postNumber: number | undefined = args[0] ? parseInt(args[0]) : undefined;
        if (!postNumber)
        return newLayer.reply("Post number.. well.. must be a number.");
        if (postNumber < 0) {
            return newLayer.reply("Post number cannot be negative.");
        }
        
        core.roblox.getEntryFromDataStore(5113672776, "PostDataStore", "Posts")
            .then((entry) => {
                const postTable = entry.Posts;
                if (!postTable) {
                    return newLayer.reply("Couldn't fetch post data.");
                }
                let specificPost = postTable[postNumber - 1]
                const embed = new EmbedBuilder()                           
                .setTitle(`${specificPost.PlrName}'s Post`)
                .setDescription(specificPost.Post)
                .setColor("#adb4d3")
                .setTimestamp();
                newLayer.reply({ embeds: [embed] });
            })
            .catch((err: any) => {
                newLayer.reply(`Cannot fetch post info: ${err}`);
            });
	},
};
