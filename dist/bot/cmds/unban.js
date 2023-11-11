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
        .setName("unban")
        .setDescription("Unban a player.")
        .addIntegerOption((option) => option.setName("user_id").setDescription("User ID of a player.").setRequired(true)),
    async execute(interaction, args) {
        const newLayer = new client_1.botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
        if (interaction instanceof discord_js_1.ChatInputCommandInteraction)
            if (args.length == 0)
                args = [interaction.options.getInteger("user_id")];
        const userId = args[0] ? parseInt(args[0]) : undefined;
        if (!userId)
            return newLayer.reply("User ID must be a number.");
        // 2 database requests.........
        const isBanned = await core.player.isPlayerBanned(userId);
        const banData = await core.database.findBannedDocumentFromUserId(userId);
        if (banData == null || !isBanned) {
            return newLayer.reply(`${userId} is not banned.`);
        }
        core.roblox.getUserInfo(banData.userId)
            .then((info) => {
            const playerName = core.roblox.getNameRepresentationFromInfo(info);
            core.player.unbanPlayer(banData.userId)
                .then(() => {
                newLayer.reply(`${playerName} (${userId}) has been unbanned.`);
            })
                .catch((err) => {
                newLayer.reply(`Cannot unban ${playerName} (${userId}) due to an error: ${err}`);
            });
        })
            .catch((err) => {
            newLayer.reply(`Cannot fetch user info: ${err}`);
        });
    },
};
