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
		.setName("riptide_stats")
		.setDescription("Fetch a player's Riptide Resurgence stats.")
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
                const userId = await core.roblox.getUserIdFromUsername(username);
                const playerName = core.roblox.getNameRepresentationFromInfo(info);
                const playerThumbnail: string = await new Promise((resolve, _) => {
                    core.roblox.getPlayerThumbnailUsingUserId(userId, "150x150", false, "headshot")
                        .then((thumbnailData) => {
                            resolve(thumbnailData[0].imageUrl || "");
                        })
                        .catch(() => {
                            resolve("");
                        })
                });

                core.roblox.getEntryFromDataStore(5113672776, "PlayerDataStore", `${userId}_Data`)
                    .then((entry) => {
                        const playerData = entry.data;
                        if (!playerData) {
                            return newLayer.reply("Player do not have data!");
                        }

                        const playerStats = playerData.stats;
                        if (!playerStats) {
                            return newLayer.reply("Player do not have stats data!");
                        }

                        if (playerData.savedOptions.HideStats) { 
                            if (playerData.savedOptions.HideStats.Value == true) {
                                return newLayer.reply("This player has disabled others from viewing their stats.");
                            }
                        }


                        if (playerStats.battlerank == "X") {
                        if (playerStats.Xrankdata.CalculationPeriod == 10) {
                            const levelText = `:sparkles: **Level:** ${playerStats.level}`;
                            const xpText = `:bar_chart: **EXP:** ${playerStats.exp}/${getMaxXP(playerStats.level)}`;                        
                            const titleText = `:name_badge: **Title:** ${playerStats.rank}`; 
                            const battleText = `:crossed_swords: **Battle Rank:** ${playerStats.battlerank} *(X Power: ${playerStats.Xrankdata.Power})*`
                            const tokensText = `:moneybag: **Tokens:** ${playerStats.coins}`;                     
                            const shardsText = `:gem: **Shards:** ${playerStats.gems}`; 
                            const ticketsText = `:tickets: **Tickets:** ${playerStats.tickets}`;
                            const deathsText = `:headstone: **Deaths:** ${playerStats.deaths}`;
                            const winstreakText = `:checkered_flag: **Current Winstreak:** ${playerStats.winstreak}`;
                            const recentwinText = `:map: **Most Recent Survival:** ${playerData.replayData.MapName}`;

                            const auraText = `:sparkles: **Equipped Aura:** ${playerData.equipped.Auras[0]}`;
                            const tankText = `:school_satchel: **Equipped Tank:** ${playerData.equipped.Tanks[0]}`;
                            const skinText = `::bust_in_silhouette: **Equipped Skin:** ${playerData.equipped.Skins[0]}`;
                            const emoteText = `:man_dancing: **Equipped Emote:** ${playerData.equipped.Emotes[0]}`;

                            const embed = new EmbedBuilder()                           
                            .setTitle(`Current Stats - ${playerName}`)
                            .setURL(`https://www.roblox.com/users/${userId}/profile`)
                            .setDescription(`**General Stats**\n> ${levelText}\n> ${xpText}\n> ${titleText}\n> ${battleText}\n**Currencies**\n> ${tokensText}\n> ${shardsText}\n> ${ticketsText}\n**Ingame Stats**\n> ${deathsText}\n> ${winstreakText}\n> ${recentwinText}\n**Inventory**\n> ${auraText}\n> ${tankText}\n> ${emoteText}\n> ${skinText}`)
                            .setThumbnail(playerThumbnail)
                            .setColor("#adb4d3")
                            .setTimestamp();
                            newLayer.reply({ embeds: [embed] });
                        } 
                        if (playerStats.Xrankdata.CalculationPeriod < 10) {
                            const levelText = `:sparkles: **Level:** ${playerStats.level}`;
                            const xpText = `:bar_chart: **EXP:** ${playerStats.exp}/${getMaxXP(playerStats.level)}`;                        
                            const titleText = `:name_badge: **Title:** ${playerStats.rank}`; 
                            const battleText = `:crossed_swords: **Battle Rank:** ${playerStats.battlerank} *(Calculating: ${playerStats.Xrankdata.CalculationPeriod}/10)*`
                            const tokensText = `:moneybag: **Tokens:** ${playerStats.coins}`;                     
                            const shardsText = `:gem: **Shards:** ${playerStats.gems}`; 
                            const ticketsText = `:tickets: **Tickets:** ${playerStats.tickets}`; 
                            const deathsText = `:headstone: **Deaths:** ${playerStats.deaths}`;
                            const winstreakText = `:checkered_flag: **Current Winstreak:** ${playerStats.winstreak}`;
                            const recentwinText = `:map: **Most Recent Survival:** ${playerData.replayData.MapName}`;

                            const auraText = `:sparkles: **Equipped Aura:** ${playerData.equipped.Auras[0]}`;
                            const tankText = `:school_satchel: **Equipped Tank:** ${playerData.equipped.Tanks[0]}`;
                            const skinText = `::bust_in_silhouette: **Equipped Skin:** ${playerData.equipped.Skins[0]}`;
                            const emoteText = `:man_dancing: **Equipped Emote:** ${playerData.equipped.Emotes[0]}`;

                            const embed = new EmbedBuilder()                           
                            .setTitle(`Current Stats - ${playerName}`)
                            .setURL(`https://www.roblox.com/users/${userId}/profile`)
                            .setDescription(`**General Stats**\n> ${levelText}\n> ${xpText}\n> ${titleText}\n> ${battleText}\n**Currencies**\n> ${tokensText}\n> ${shardsText}\n> ${ticketsText}\n**Ingame Stats**\n> ${deathsText}\n> ${winstreakText}\n> ${recentwinText}\n**Inventory**\n> ${auraText}\n> ${tankText}\n> ${emoteText}\n> ${skinText}`)
                            .setThumbnail(playerThumbnail)
                            .setColor("#adb4d3")
                            .setTimestamp();
                            newLayer.reply({ embeds: [embed] });
                        }
                    } else {
                        const levelText = `:sparkles: **Level:** ${playerStats.level}`;
                        const xpText = `:bar_chart: **EXP:** ${playerStats.exp}/${getMaxXP(playerStats.level)}`;                        
                        const titleText = `:name_badge: **Title:** ${playerStats.rank}`; 
                        const battleText = `:crossed_swords: **Battle Rank:** ${playerStats.battlerank} *(${playerStats.battlepoints}/100)*`
                        const tokensText = `:moneybag: **Tokens:** ${playerStats.coins}`;                     
                        const shardsText = `:gem: **Shards:** ${playerStats.gems}`; 
                        const ticketsText = `:tickets: **Tickets:** ${playerStats.tickets}`;
                        const deathsText = `:headstone: **Deaths:** ${playerStats.deaths}`;
                        const winstreakText = `:checkered_flag: **Current Winstreak:** ${playerStats.winstreak}`;
                        const recentwinText = `:map: **Most Recent Survival:** ${playerData.replayData.MapName}`;

                        const auraText = `:sparkles: **Equipped Aura:** ${playerData.equipped.Auras[0]}`;
                        const tankText = `:school_satchel: **Equipped Tank:** ${playerData.equipped.Tanks[0]}`;
                        const skinText = `::bust_in_silhouette: **Equipped Skin:** ${playerData.equipped.Skins[0]}`;
                        const emoteText = `:man_dancing: **Equipped Emote:** ${playerData.equipped.Emotes[0]}`;

                        const embed = new EmbedBuilder()                           
                        .setTitle(`Current Stats - ${playerName}`)
                        .setURL(`https://www.roblox.com/users/${userId}/profile`)
                        .setDescription(`**General Stats**\n> ${levelText}\n> ${xpText}\n> ${titleText}\n> ${battleText}\n**Currencies**\n> ${tokensText}\n> ${shardsText}\n> ${ticketsText}\n**Ingame Stats**\n> ${deathsText}\n> ${winstreakText}\n> ${recentwinText}\n**Inventory**\n> ${auraText}\n> ${tankText}\n> ${emoteText}\n> ${skinText}`)
                        .setThumbnail(playerThumbnail)
                        .setColor("#adb4d3")
                        .setTimestamp();
                        newLayer.reply({ embeds: [embed] });
                    }
                
                    })
                    .catch((err) => {
                        newLayer.reply(`Cannot fetch stats: ${err}`);
                    })
            })
            .catch((err: any) => {
                newLayer.reply(`Cannot fetch user info: ${err}`);
            });
	},
};
