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
    permissions: ["MODERATOR"],
    slashData: new discord_js_1.SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a player.")
        .addIntegerOption((option) => option.setName("user_id").setDescription("User ID of a player.").setRequired(true))
        .addIntegerOption((option) => option.setName("ban_duration").setDescription("Ban duration (in minutes). Set to -1 will ban for indefinitely.").setRequired(true))
        .addStringOption((option) => option.setName("reason").setDescription("Ban reason").setRequired(true)),
    async execute(interaction, args) {
        const newLayer = new client_1.botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
        if (interaction instanceof discord_js_1.ChatInputCommandInteraction)
            if (args.length == 0)
                args = [interaction.options.getInteger("user_id"), interaction.options.getInteger("ban_duration"), interaction.options.getString("reason")];
        const userId = args[0] ? parseInt(args[0]) : undefined;
        if (!userId)
            return newLayer.reply("User ID must be a number.");
        const banDuration = args[1] ? parseInt(args[1]) : undefined;
        if (!banDuration)
            return newLayer.reply("Ban duration must be a number.");
        if (banDuration != -1 && banDuration < 0) {
            return newLayer.reply("Ban duration cannot be negative. (Set to -1 if you want to ban for indefinite duration.)");
        }
        const banReason = args[2] || "None specified.";
        core.roblox.getUserInfo(userId)
            .then((info) => {
            const playerName = core.roblox.getNameRepresentationFromInfo(info);
            core.player.banPlayer("Discord", userId, banDuration, newLayer.author ? `@${newLayer.author.tag}` : "unknown", banReason)
                .then(() => {
                const currentDate = new Date();
                const currentTime = Math.floor(currentDate.getTime() / 1000);
                newLayer.reply(`${playerName} (${userId}) has been banned until ${banDuration != -1 ? `<t:${currentTime + banDuration * 60}:F>` : "indefinitely"}.`);
            })
                .catch((err) => {
                newLayer.reply(`Cannot ban ${playerName} (${userId}) due to an error: ${err}`);
            });
        })
            .catch((err) => {
            newLayer.reply(`Cannot fetch user info: ${err}`);
        });
    },
};
