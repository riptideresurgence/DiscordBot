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
exports.botCompatibilityLayer = exports.botClient = void 0;
const discord_js_1 = require("discord.js");
const commands = __importStar(require("./commands"));
const permissions = __importStar(require("./permissions"));
class botClient extends discord_js_1.Client {
    _onMessage(message) {
        if (!message || !message.content.startsWith(this.prefix) || message.author.bot)
            return;
        const parsedArgs = message.content.slice(this.prefix.length).trim().split(/ +/);
        let commandName = parsedArgs.shift();
        if (!commandName) {
            return;
        }
        commandName = commandName.toLowerCase();
        const foundCommand = commands.fetchCommand(commandName);
        if (foundCommand) {
            if (!foundCommand.execute) {
                new botCompatibilityLayer(message, false).reply("Command cannot be executed: No execute function found.");
                return;
            }
            if (foundCommand.permissions && !permissions.userHasPermission(message.author.id, foundCommand.permissions)) {
                new botCompatibilityLayer(message, false).reply(`You do not have permission to run this command!\nCommand permission: [${foundCommand.permissions.join(", ")}]`);
                return;
            }
            foundCommand.execute(message, parsedArgs)
                .then(() => { })
                .catch((err) => {
                new botCompatibilityLayer(message, false).reply(`Failed to complete command, error: ${err}`);
            });
        }
    }
    async _onInteraction(interaction) {
        if (!interaction.isChatInputCommand())
            return;
        const foundCommand = commands.fetchCommand(interaction.commandName);
        if (foundCommand && foundCommand.slashData) {
            if (!foundCommand.execute) {
                new botCompatibilityLayer(interaction, false).reply("Command cannot be executed: No execute function found.");
                return;
            }
            if (foundCommand.permissions && !permissions.userHasPermission(interaction.user.id, foundCommand.permissions)) {
                new botCompatibilityLayer(interaction, false).reply(`You do not have permission to run this command!\nCommand permission: [${foundCommand.permissions.join(", ")}]`);
                return;
            }
            foundCommand.execute(interaction, [])
                .then(() => { })
                .catch((err) => {
                new botCompatibilityLayer(interaction, false).reply(`Failed to complete command, error: ${err}`);
            });
        }
    }
    setPresence(presenceText) {
        let botUser = this.user;
        if (botUser) {
            botUser.setActivity(`${presenceText} | Made by cutymeo / shiinazzz.`, {
                type: discord_js_1.ActivityType.Watching,
            });
        }
    }
    async login() {
        // Initialize commands
        commands.parseCommands();
        // Register events
        this.on(discord_js_1.Events.ClientReady, () => {
            //Log("DiscordBot: Ready for command");
            this.setPresence("hi all, scott here");
        });
        this.on(discord_js_1.Events.MessageCreate, this._onMessage);
        this.on(discord_js_1.Events.InteractionCreate, this._onInteraction);
        // Login
        return super.login(this._token);
    }
    constructor(prefix, botToken, options) {
        super(options);
        this.prefix = prefix;
        this._token = botToken;
    }
}
exports.botClient = botClient;
class botCompatibilityLayer {
    async send() {
        return;
    }
    async reply(options) {
        if (this._object instanceof discord_js_1.Message)
            return await this._object.reply(options);
        else if (this._object instanceof discord_js_1.ChatInputCommandInteraction) {
            if (this._object.deferred)
                if (this._object.replied)
                    return await this._object.followUp(options);
                else
                    return await this._object.editReply(options);
            else
                return await this._object.reply(options);
        }
    }
    async delete() {
        if (this._object instanceof discord_js_1.Message)
            return await this._object.delete();
        return;
    }
    async init(ephemeral) {
        if (this._defer && this._object instanceof discord_js_1.ChatInputCommandInteraction)
            await this._object.deferReply({ ephemeral: ephemeral != undefined ? ephemeral : true });
    }
    constructor(InteractionObject, doDefer) {
        this._object = InteractionObject;
        this._defer = doDefer;
        if (this._object instanceof discord_js_1.Message) {
            this.author = this._object.author;
            this.guild = this._object.guild;
        }
        else if (this._object instanceof discord_js_1.ChatInputCommandInteraction) {
            this.author = this._object.user;
            this.guild = this._object.guild;
        }
    }
}
exports.botCompatibilityLayer = botCompatibilityLayer;
