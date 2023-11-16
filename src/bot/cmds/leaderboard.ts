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
        let leaderboardStore = "ATLeaderStore";
        let leaderboardName = "All Time Leaderboard"
        if (leaderboardSection == "cur_month") {
            leaderboardStore = `stupidFart!!!CMLeaderStore${currentMonth}${currentYear}`;
            leaderboardName = `Current Month's Leaderboard - ${currentMonth} ${currentYear}`;
        } else if (leaderboardSection == "prev_month") {
            leaderboardStore = `stupidFart!!!CMLeaderStore${lastMonth}${lastYear}`;
            leaderboardName = `Current Month's Leaderboard - ${lastMonth} ${lastYear}`;
        }

        core.roblox.getEntriesFromOrderedDataStore(5113672776, leaderboardStore, 20, true)
            .then(async (entries) => {
                let userIds = entries.map(x => parseInt(x.id));
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
	},
};