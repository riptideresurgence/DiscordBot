import { ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandIntegerOption } from "discord.js";
import { botCompatibilityLayer } from "../client"

import * as core from "@riptide/core";

module.exports = {
    permissions: ["INGAMEMOD"],
	slashData: new SlashCommandBuilder()
		.setName("unban")
		.setDescription("Unban a player.")
        .addIntegerOption((option: SlashCommandIntegerOption) => option.setName("user_id").setDescription("User ID of a player.").setRequired(true)),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
        if (interaction instanceof ChatInputCommandInteraction)
            if (args.length == 0)
            args = [interaction.options.getInteger("user_id")]

        const userId: number | undefined = args[0] ? parseInt(args[0]) : undefined;
        if (!userId)
            return newLayer.reply("User ID must be a number.");
        
        // 2 database requests.........
        const isBanned = await core.player.isPlayerBanned(userId);
        const banData = await core.database.findBannedDocumentFromUserId(userId);
        if (banData == null || !isBanned) {
            return newLayer.reply(`${userId} is not banned.`);
        }

        core.roblox.getUserInfo(banData.userId!)
            .then((info) => {
                const playerName = core.roblox.getNameRepresentationFromInfo(info);
                core.player.unbanPlayer(banData.userId!)
                    .then(() => {
                        newLayer.reply(`${playerName} (${userId}) has been unbanned.`);
                    })
                    .catch((err: any) => {
                        newLayer.reply(`Cannot unban ${playerName} (${userId}) due to an error: ${err}`);
                    });
            })
            .catch((err: any) => {
                newLayer.reply(`Cannot fetch user info: ${err}`);
            });
	},
};