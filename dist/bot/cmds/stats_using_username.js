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
const XP_CAP = 10000;
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
;
function getMaxXP(level) {
    const xpMath = 200 + (level - 1) * 400;
    return clamp(xpMath, 1, XP_CAP);
}
module.exports = {
    slashData: new discord_js_1.SlashCommandBuilder()
        .setName("stats_using_username")
        .setDescription("Fetch a player's stats, using their username instead of user ID.")
        .addStringOption((option) => option.setName("user_name").setDescription("User name of a player.").setRequired(true)),
    async execute(interaction, args) {
        const newLayer = new client_1.botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
        if (interaction instanceof discord_js_1.ChatInputCommandInteraction)
            if (args.length == 0)
                args = [interaction.options.getString("user_name")];
        const username = args[0];
        if (!username)
            return newLayer.reply("User name must be a string.");
        core.roblox.getUserInfo(username)
            .then(async (info) => {
            const userId = await core.roblox.getUserIdFromUsername(username);
            const playerName = core.roblox.getNameRepresentationFromInfo(info);
            const playerThumbnail = await new Promise((resolve, _) => {
                core.roblox.getPlayerThumbnailUsingUserId(userId, "150x150", false, "headshot")
                    .then((thumbnailData) => {
                    resolve(thumbnailData[0].imageUrl || "");
                })
                    .catch(() => {
                    resolve("");
                });
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
                const levelText = `:sparkles: **Level:** ${playerStats.level}`;
                const xpText = `:bar_chart: **EXP:** ${playerStats.exp}/${getMaxXP(playerStats.level)}`;
                const titleText = `:name_badge: **Title:** ${playerStats.rank}`;
                const battleText = `:crossed_swords: **Battle Rank:** ${playerStats.battlerank} *(${playerStats.battlepoints}/100)*`;
                const tokensText = `:moneybag: **Tokens:** ${playerStats.coins}`;
                const shardsText = `:gem: **Shards:** ${playerStats.gems}`;
                const ticketsText = `:tickets: **Tickets:** ${playerStats.tickets}`;
                const deathsText = `:headstone: **Deaths:** ${playerStats.deaths}`;
                const winstreakText = `:checkered_flag: **Current Winstreak:** ${playerStats.winstreak}`;
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle(`Current Stats - ${playerName}`)
                    .setURL(`https://www.roblox.com/users/${userId}/profile`)
                    .setDescription(`**General Stats**\n> ${levelText}\n> ${xpText}\n> ${titleText}\n> ${battleText}\n**Currencies**\n> ${tokensText}\n> ${shardsText}\n> ${ticketsText}\n**Ingame Stats**\n> ${deathsText}\n> ${winstreakText}`)
                    .setThumbnail(playerThumbnail)
                    .setColor("#adb4d3")
                    .setTimestamp();
                newLayer.reply({ embeds: [embed] });
            })
                .catch((err) => {
                newLayer.reply(`Cannot fetch stats: ${err}`);
            });
        })
            .catch((err) => {
            newLayer.reply(`Cannot fetch user info: ${err}`);
        });
    },
};
