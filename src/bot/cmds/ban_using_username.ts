import { ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandIntegerOption, SlashCommandStringOption } from "discord.js";
import { botCompatibilityLayer } from "../client"

import * as core from "@riptide/core";

module.exports = {
    permissions: ["MODERATOR"],
	slashData: new SlashCommandBuilder()
		.setName("ban_using_username")
		.setDescription("Ban a player, using their username instead of user ID.")
        .addStringOption((option: SlashCommandStringOption) => option.setName("user_name").setDescription("User name of a player.").setRequired(true))
        .addIntegerOption((option: SlashCommandIntegerOption) => option.setName("ban_duration").setDescription("Ban duration (in minutes). Set to -1 will ban for indefinitely.").setRequired(true))
        .addStringOption((option: SlashCommandStringOption) => option.setName("reason").setDescription("Ban reason").setRequired(true)),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
        if (interaction instanceof ChatInputCommandInteraction)
            if (args.length == 0)
                args = [interaction.options.getString("user_name"), interaction.options.getInteger("ban_duration"), interaction.options.getString("reason")]

        const username: string | undefined = args[0];
            if (!username)
                return newLayer.reply("User name must be a string.");
        const banDuration: number | undefined = args[1] ? parseInt(args[1]) : undefined;
        if (!banDuration)
            return newLayer.reply("Ban duration must be a number.");
        if (banDuration != -1 && banDuration < 0) {
            return newLayer.reply("Ban duration cannot be negative. (Set to -1 if you want to ban for indefinite duration.)");
        }
        const banReason: string = args[2] || "None specified.";

        core.roblox.getUserInfo(username)
            .then((info) => {
                const playerName = core.roblox.getNameRepresentationFromInfo(info);
                core.player.banPlayer("Discord", info.id, banDuration, newLayer.author ? `@${newLayer.author.tag}` : "unknown", banReason)
                    .then(() => {
                        const currentDate = new Date();
                        const currentTime = Math.floor(currentDate.getTime() / 1000);
                        newLayer.reply(`${playerName} (${info.id}) has been banned until ${banDuration != -1 ? `<t:${currentTime + banDuration * 60}:F>` : "indefinitely"}.`);
                    })
                    .catch((err: any) => {
                        newLayer.reply(`Cannot ban ${playerName} (${info.id}) due to an error: ${err}`);
                    })
            })
            .catch((err: any) => {
                newLayer.reply(`Cannot fetch user info: ${err}`);
            });
	},
};