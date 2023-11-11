"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCommand = exports.parseCommands = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const commands = new discord_js_1.Collection();
const slashCommandsData = [];
let parsedCommands = false;
function parseCommands() {
    if (parsedCommands) {
        return;
    }
    const commandsPath = path_1.default.join(__dirname, "cmds");
    const commandFiles = fs_1.default.readdirSync(commandsPath).filter(file => (file.endsWith('.js') || file.endsWith('.ts')) && !file.endsWith('.d.ts'));
    for (const file of commandFiles) {
        const filePath = path_1.default.join(commandsPath, file);
        let command = require(filePath);
        if (command.isTemplate)
            continue;
        if (command.execute) {
            const commandName = command.slashData ? command.slashData.name : path_1.default.parse(file).name;
            commands.set(commandName, command);
            if (command.slashData)
                slashCommandsData.push(command.slashData);
            //Log(`DiscordBot: Loaded command file ${file} with name: ${commandName}`)
        }
        else {
            //Log(`DiscordBot: Cannot load command file ${file} as it's missing data.`)
        }
        command = null;
    }
    parsedCommands = true;
}
exports.parseCommands = parseCommands;
function fetchCommand(commandName) {
    return commands.get(commandName);
}
exports.fetchCommand = fetchCommand;
