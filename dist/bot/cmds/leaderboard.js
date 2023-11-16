"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client_1 = require("../client");
const core = __importStar(require("@riptide/core"));
module.exports = {
    slashData: new discord_js_1.SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Display the leaderboard.")
        .addStringOption((option) => option.setName("section")
        .setDescription("Select the leaderboard to display.")
        .setRequired(true)
        .addChoices({ name: "All Time", value: "all_time" }, { name: "Current Month", value: "cur_month" }, { name: "Previous Month", value: "prev_month" })),
    async execute(interaction) {
        const newLayer = new client_1.botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
        if (interaction instanceof discord_js_1.Message) {
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
        const getMonthName = (month) => {
            const date = new Date();
            date.setMonth(month);
            return date.toLocaleString([], {
                month: 'long',
            });
        };
        const currentMonthName = getMonthName(currentMonth);
        const lastMonthName = getMonthName(lastMonth);
        let leaderboardStore = "ATLeaderStore";
        let leaderboardName = "All Time Leaderboard";
        if (leaderboardSection == "cur_month") {
            leaderboardStore = `stupidFart!!!CMLeaderStore${currentMonthName}${currentYear}`;
            leaderboardName = `Current Month's Leaderboard - ${currentMonthName} ${currentYear}`;
        }
        else if (leaderboardSection == "prev_month") {
            leaderboardStore = `stupidFart!!!CMLeaderStore${lastMonthName}${lastYear}`;
            leaderboardName = `Current Month's Leaderboard - ${lastMonthName} ${lastYear}`;
        }
        core.roblox.getEntriesFromOrderedDataStore(5113672776, leaderboardStore, 20, true)
            .then(async (entries) => {
            let userIds = entries.map(x => parseInt(x.id));
            if (userIds.length == 0) {
                return newLayer.reply("Leaderboard is empty.");
            }
            core.roblox.getBatchUserInfo(userIds)
                .then((batchInfo) => {
                const constructedLeaderboardData = [];
                batchInfo.forEach((info) => {
                    const xpValue = parseInt(entries.filter(x => parseInt(x.id) == info.userId)[0].value);
                    constructedLeaderboardData.push({
                        name: core.roblox.getNameRepresentationFromInfo(info),
                        xp: xpValue
                    });
                });
                const sortedLeaderboardData = constructedLeaderboardData.sort((a, b) => b.xp - a.xp);
                const leaderboardListForSend = [];
                const emojis = {
                    0: ":first_place:",
                    1: ":second_place:",
                    2: ":third_place:"
                };
                for (let i = 0; i < sortedLeaderboardData.length; i++) {
                    if (i <= 2) {
                        leaderboardListForSend.push(`${emojis[i]} **${sortedLeaderboardData[i].name}** : *${sortedLeaderboardData[i].xp} EXP*`);
                    }
                    else {
                        leaderboardListForSend.push(`**${i + 1}th - ${sortedLeaderboardData[i].name}** : *${sortedLeaderboardData[i].xp} EXP*`);
                    }
                }
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle(leaderboardName)
                    .setDescription(leaderboardListForSend.join("\n"))
                    .setColor("#00b0f4")
                    .setTimestamp();
                newLayer.reply({ embeds: [embed] });
            })
                .catch((err) => {
                newLayer.reply(`Cannot fetch players' info: ${err}`);
            });
        })
            .catch((err) => {
            newLayer.reply(`Cannot fetch leaderboard: ${err}`);
        });
    },
};
