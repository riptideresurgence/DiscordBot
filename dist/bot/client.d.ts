import { Client, ClientOptions, ChatInputCommandInteraction, Message, User } from "discord.js";
declare class botClient extends Client<true> {
    private _token;
    private _clientId;
    prefix: string;
    private _onMessage;
    private _onInteraction;
    setPresence(presenceText: string): void;
    login(): Promise<string>;
    constructor(prefix: string, clientId: string, botToken: string, options: ClientOptions);
}
declare class botCompatibilityLayer {
    private _object;
    private _defer;
    author?: User;
    guild?: any;
    send(): Promise<void>;
    reply(options: any): Promise<Message<boolean> | undefined>;
    delete(): Promise<Message<boolean> | undefined>;
    init(ephemeral?: boolean): Promise<void>;
    constructor(InteractionObject: Message<boolean> | ChatInputCommandInteraction<any>, doDefer: boolean);
}
export { botClient, botCompatibilityLayer };
