import { ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { botCompatibilityLayer } from "../client"

import * as core from "@riptide/core";

module.exports = {
    permissions: ["MODERATOR"],
	slashData: new SlashCommandBuilder()
		.setName("unban_using_username")
		.setDescription("Unban a player, using their username instead of user ID.")
        .addStringOption((option: SlashCommandStringOption) => option.setName("user_id").setDescription("User ID of a player.").setRequired(true)),
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
                const isBanned = await core.player.isPlayerBanned(info.id);
                const banData = await core.database.findBannedDocumentFromUserId(info.id);
                if (banData == null || !isBanned) {
                    return newLayer.reply(`${info.id} is not banned.`);
                }

                const playerName = core.roblox.getNameRepresentationFromInfo(info);
                core.player.unbanPlayer(info.id)
                    .then(() => {
                        newLayer.reply(`${playerName} (${info.id}) has been unbanned.`);
                    })
                    .catch((err: any) => {
                        newLayer.reply(`Cannot unban ${playerName} (${info.id}) due to an error: ${err}`);
                    });
            })
            .catch((err: any) => {
                newLayer.reply(`Cannot fetch user info: ${err}`);
            });
	},
};