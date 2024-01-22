import { ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { botCompatibilityLayer } from "../client"
 
const QUOTES = [
	"It is certain :white_check_mark:",
	"It is decidedly so :white_check_mark:",
	"Without a doubt :white_check_mark:",
	"Yes, definitely :white_check_mark:",
	"You may rely on it :white_check_mark:",
	"As I see it, yes :white_check_mark:",
	"Most likely :white_check_mark:",
	"Outlook good :white_check_mark:",
	"Yes :white_check_mark:",
	"Reply hazy, try again :question:",
	"Ask again later :question:",
	"Better not tell you now :question:",
	"Cannot predict now :question:",
	"Concentrate and ask again :question:",
	"Don't count on it :x:",
	"My reply is no :x:",
	"My sources say no :x:",
	"Outlook not so good :x:",
	"Very doubtful :x:"
];

module.exports = {
	slashData: new SlashCommandBuilder()
		.setName("8ball")
		.setDescription("Ask the magic 8-Ball a yes or no question, and you'll receive an answer.")
		.addStringOption((option: SlashCommandStringOption) => option.setName("question").setDescription("The question you are asking.").setRequired(true)),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
		return newLayer.reply(`**Question:** "${args[0]}"\n**Answer:** ${QUOTES[Math.floor(Math.random() * QUOTES.length)]}`)
	},
};