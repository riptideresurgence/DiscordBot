import { ChatInputCommandInteraction, EmbedBuilder, Message, SlashCommandBuilder, SlashCommandIntegerOption, SlashCommandStringOption } from "discord.js";
import { botCompatibilityLayer } from "../client"

import * as core from "@riptide/core";

module.exports = {
	slashData: new SlashCommandBuilder()
		.setName("leaderboard")
		.setDescription("Display the leaderboard.")
        .addStringOption((option: SlashCommandStringOption) => 
            option.setName("section")
                .setDescription("Select the leaderboard to display.")
                .setRequired(true)
                .addChoices(
                    {name: "All Time", value: "all_time"},
                    {name: "Current Month", value: "cur_month"},
                    {name: "Previous Month", value: "prev_month"},
                    {name: "Surgefest: Candy Canes vs Gingerbread", value: "fest_xmas"},
                    {name: "Surgefest: Rig vs Bob vs Template", value: "fest_hosts"},
                )
        ),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
        if (interaction instanceof Message) {
            return newLayer.reply("This command can only be used as a slash command.");
        }

        const leaderboardSection = interaction.options.getString("section");
        if (!leaderboardSection) {
            return newLayer.reply("No leaderboard section selected, cannot display.");
        }

        const currentDate = new Date();
        const currentMonth = currentDate.getUTCMonth();
        const currentYear = currentDate.getUTCFullYear();
        const lastMonth = currentMonth == 1 ? 12 : currentMonth - 1;
        const lastYear = lastMonth == 12 ? currentYear - 1 : currentYear;

        const getMonthName = (month: number) => {
            const date = new Date();
            date.setMonth(month);
            
            return date.toLocaleString([], {
                month: 'long',
            });
        }
        const currentMonthName = getMonthName(currentMonth);
        const lastMonthName = getMonthName(lastMonth);

        let leaderboardStore = "ATLeaderStore";
        let leaderboardName = "All Time Leaderboard"
        if (leaderboardSection == "cur_month") {
            leaderboardStore = `stupidFart!!!CMLeaderStore${currentMonthName}${currentYear}`;
            leaderboardName = `Current Month's Leaderboard - ${currentMonthName} ${currentYear}`;
        } else if (leaderboardSection == "prev_month") {
            leaderboardStore = `stupidFart!!!CMLeaderStore${lastMonthName}${lastYear}`;
            leaderboardName = `Previous Month's Leaderboard - ${lastMonthName} ${lastYear}`;
            
        } else if (leaderboardSection == "fest_xmas") {
            leaderboardStore = `stupidFart!!!FestTop50_Christmas`;
            leaderboardName = `Surgefest Top 50 Leaderboard - Candy Canes vs Gingerbread`;
        } else if (leaderboardSection == "fest_hosts") {
            leaderboardStore = `stupidFart!!!FestTop50_Hosts`;
            leaderboardName = `Surgefest Top 50 Leaderboard - Rig vs Bob vs Template`;
        }

        if (leaderboardSection == "fest_xmas") {
            core.roblox.getEntriesFromOrderedDataStore(5113672776, leaderboardStore, 50, true)
            .then(async (entries) => {
                let userIds = entries.map(x => parseInt(x.id));
                if (userIds.length == 0) {
                    return newLayer.reply("Leaderboard is empty.");
                }

                core.roblox.getBatchUserInfo(userIds)
                    .then((batchInfo) => {
                        const constructedLeaderboardData: {name: string, xp: number}[] = [];

                        batchInfo.forEach((info) => {
                            const xpValue = parseInt(entries.filter(x => parseInt(x.id) == info.userId)[0].value);
                            constructedLeaderboardData.push({
                                name: core.roblox.getNameRepresentationFromInfo(info),
                                xp: xpValue
                            });
                        });

                        const sortedLeaderboardData = constructedLeaderboardData.sort((a, b) => b.xp - a.xp);
                        const leaderboardListForSend: string[] = [];
                        const emojis: {[id: number]: string} = {
                            0: ":first_place:",
                            1: ":second_place:",
                            2: ":third_place:"
                        }

                        for (let i = 0; i < sortedLeaderboardData.length; i++) {
                            if (i <= 2) {
                                leaderboardListForSend.push(`${emojis[i]} **${sortedLeaderboardData[i].name}** : *${sortedLeaderboardData[i].xp} EXP*`)
                            } else {
                                leaderboardListForSend.push(`**${i + 1}th - ${sortedLeaderboardData[i].name}** : *${sortedLeaderboardData[i].xp} EXP*`)
                            }
                        }
                        const embed = new EmbedBuilder()
                            .setTitle(leaderboardName)
                            .setDescription(leaderboardListForSend.join("\n"))
                            .setColor("#00b0f4")
                            .setTimestamp();
                      
                        newLayer.reply({ embeds: [embed] });
                    })
                    .catch((err) => {
                        newLayer.reply(`Cannot fetch players' info: ${err}`);
                    })
            })
            .catch((err) => {
                newLayer.reply(`Cannot fetch leaderboard: ${err}`);
            });
        } else if (leaderboardSection == "fest_hosts") {
            core.roblox.getEntriesFromOrderedDataStore(5113672776, leaderboardStore, 50, true)
            .then(async (entries) => {
                let userIds = entries.map(x => parseInt(x.id));
                if (userIds.length == 0) {
                    return newLayer.reply("Leaderboard is empty.");
                }

                core.roblox.getBatchUserInfo(userIds)
                    .then((batchInfo) => {
                        const constructedLeaderboardData: {name: string, xp: number}[] = [];

                        batchInfo.forEach((info) => {
                            const xpValue = parseInt(entries.filter(x => parseInt(x.id) == info.userId)[0].value);
                            constructedLeaderboardData.push({
                                name: core.roblox.getNameRepresentationFromInfo(info),
                                xp: xpValue
                            });
                        });

                        const sortedLeaderboardData = constructedLeaderboardData.sort((a, b) => b.xp - a.xp);
                        const leaderboardListForSend: string[] = [];
                        const emojis: {[id: number]: string} = {
                            0: ":first_place:",
                            1: ":second_place:",
                            2: ":third_place:"
                        }

                        for (let i = 0; i < sortedLeaderboardData.length; i++) {
                            if (i <= 2) {
                                leaderboardListForSend.push(`${emojis[i]} **${sortedLeaderboardData[i].name}** : *${sortedLeaderboardData[i].xp} EXP*`)
                            } else {
                                leaderboardListForSend.push(`**${i + 1}th - ${sortedLeaderboardData[i].name}** : *${sortedLeaderboardData[i].xp} EXP*`)
                            }
                        }
                        const embed = new EmbedBuilder()
                            .setTitle(leaderboardName)
                            .setDescription(leaderboardListForSend.join("\n"))
                            .setColor("#00b0f4")
                            .setTimestamp();
                      
                        newLayer.reply({ embeds: [embed] });
                    })
                    .catch((err) => {
                        newLayer.reply(`Cannot fetch players' info: ${err}`);
                    })
            })
            .catch((err) => {
                newLayer.reply(`Cannot fetch leaderboard: ${err}`);
            });
        } else {
            core.roblox.getEntriesFromOrderedDataStore(5113672776, leaderboardStore, 20, true)
            .then(async (entries) => {
                let userIds = entries.map(x => parseInt(x.id));
                if (userIds.length == 0) {
                    return newLayer.reply("Leaderboard is empty.");
                }

                core.roblox.getBatchUserInfo(userIds)
                    .then((batchInfo) => {
                        const constructedLeaderboardData: {name: string, xp: number}[] = [];

                        batchInfo.forEach((info) => {
                            const xpValue = parseInt(entries.filter(x => parseInt(x.id) == info.userId)[0].value);
                            constructedLeaderboardData.push({
                                name: core.roblox.getNameRepresentationFromInfo(info),
                                xp: xpValue
                            });
                        });

                        const sortedLeaderboardData = constructedLeaderboardData.sort((a, b) => b.xp - a.xp);
                        const leaderboardListForSend: string[] = [];
                        const emojis: {[id: number]: string} = {
                            0: ":first_place:",
                            1: ":second_place:",
                            2: ":third_place:"
                        }

                        for (let i = 0; i < sortedLeaderboardData.length; i++) {
                            if (i <= 2) {
                                leaderboardListForSend.push(`${emojis[i]} **${sortedLeaderboardData[i].name}** : *${sortedLeaderboardData[i].xp} EXP*`)
                            } else {
                                leaderboardListForSend.push(`**${i + 1}th - ${sortedLeaderboardData[i].name}** : *${sortedLeaderboardData[i].xp} EXP*`)
                            }
                        }
                        const embed = new EmbedBuilder()
                            .setTitle(leaderboardName)
                            .setDescription(leaderboardListForSend.join("\n"))
                            .setColor("#00b0f4")
                            .setTimestamp();
                      
                        newLayer.reply({ embeds: [embed] });
                    })
                    .catch((err) => {
                        newLayer.reply(`Cannot fetch players' info: ${err}`);
                    })
            })
            .catch((err) => {
                newLayer.reply(`Cannot fetch leaderboard: ${err}`);
            });
        }
},
}