import { ActivityType, Client, ClientOptions, ChatInputCommandInteraction, Events, Interaction, Message, User, REST, Routes } from "discord.js";
import * as commands from "./commands";
import * as permissions from "./permissions";

class botClient extends Client<true> {
    private _token: string;
    private _clientId: string;

    public prefix: string;

    private _onMessage(message: Message) {
        if (!message || !message.content.startsWith(this.prefix) || message.author.bot)
            return;

        const parsedArgs: string[] = message.content.slice(this.prefix.length).trim().split(/ +/);
        let commandName: string | undefined = parsedArgs.shift();
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
                .then(() => {})
                .catch((err: any) => {
                    new botCompatibilityLayer(message, false).reply(`Failed to complete command, error: ${err}`);
                })
        }
    }

    private async _onInteraction(interaction: Interaction<any>): Promise<any> {
        if (!interaction.isChatInputCommand()) return;
        
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
                .then(() => {})
                .catch((err: any) => {
                    new botCompatibilityLayer(interaction, false).reply(`Failed to complete command, error: ${err}`);
                })
        }
    }

    public setPresence(presenceText: string) {
        let botUser = this.user;
        if (botUser) {
            botUser.setActivity(`${presenceText} | Made by cutymeo / shiinazzz.`, {
                type: ActivityType.Watching,
            });
        }
    }

    public override async login() {
        // Initialize commands
        commands.parseCommands();
        
        // Add slash command to REST
        const botRest = new REST().setToken(this._token);
        botRest.put(
			Routes.applicationCommands(this._clientId),
			{ body: commands.slashCommandsData },
		);
        
        // Register events
        this.on(Events.ClientReady, () => {
            //Log("DiscordBot: Ready for command");
            this.setPresence("hi all, scott here");
        });
        this.on(Events.MessageCreate, this._onMessage);
        this.on(Events.InteractionCreate, this._onInteraction);

        // Login
        return super.login(this._token);
    }

    constructor(prefix: string, clientId: string, botToken: string, options: ClientOptions) {
        super(options);

        this.prefix = prefix;
        this._clientId = clientId;
        this._token = botToken;
    }
}

class botCompatibilityLayer {
    private _object: Message<boolean> | ChatInputCommandInteraction<any>;
    private _defer: boolean;

    public author?: User;
    public guild?: any;

    public async send() {
        return;
    }

    public async reply(options: any) {
        if (this._object instanceof Message)
            return await this._object.reply(options);
        else if (this._object instanceof ChatInputCommandInteraction) {
            if (this._object.deferred)
                if (this._object.replied)
                    return await this._object.followUp(options);
                else
                    return await this._object.editReply(options);
            else
                return await this._object.reply(options);
        }
    }

    public async delete() {
        if (this._object instanceof Message)
            return await this._object.delete();
        return;
    }

    public async init(ephemeral?: boolean) {
        if (this._defer && this._object instanceof ChatInputCommandInteraction)
            await this._object.deferReply({ ephemeral: ephemeral != undefined ? ephemeral : true });
    }

    constructor(InteractionObject: Message<boolean> | ChatInputCommandInteraction<any>, doDefer: boolean) {
        this._object = InteractionObject;
        this._defer = doDefer;

        if (this._object instanceof Message) {
            this.author = this._object.author;
            this.guild = this._object.guild;
        }
        else if (this._object instanceof ChatInputCommandInteraction) {
            this.author = this._object.user;
            this.guild = this._object.guild;
        }
    }
}

export {botClient, botCompatibilityLayer};