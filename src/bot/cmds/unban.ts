import { ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { botCompatibilityLayer } from "../client"

import * as core from "@riptide/core";

module.exports = {
    permissions: ["INGAMEMOD"],
	slashData: new SlashCommandBuilder()
		.setName("unban")
		.setDescription("Unban a player, using their username instead of user ID.")
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

        core.roblox.getUserInfo(username)
            .then(async (info) => {
                // 2 database requests.........
                const userId = await core.roblox.getUserIdFromUsername(username);
                const isBanned = await core.player.isPlayerBanned(userId);
                const banData = await core.database.findBannedDocumentFromUserId(userId);
                if (banData == null || !isBanned) {
                    return newLayer.reply(`${info.username} is not banned.`);
                }

                const playerName = core.roblox.getNameRepresentationFromInfo(info);
                core.player.unbanPlayer(userId)
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