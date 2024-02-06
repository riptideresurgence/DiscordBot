import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import { botClient, botCompatibilityLayer } from "../client"

let currentClient: botClient | undefined = undefined;

function setClient(client: botClient) {
    currentClient = client;
}

module.exports = {
	slashData: new SlashCommandBuilder()
		.setName("mippy_stinks")
		.setDescription("Pings mippy 10 times."),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);

		let foundChannel = currentClient.channels.cache.get(`1173630298936856708`);
        if (foundChannel) {
            (foundChannel as TextChannel).send(`<@876953124546420830>`);
        }
	},
};

export { setClient }