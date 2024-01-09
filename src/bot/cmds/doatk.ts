import { ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { botCompatibilityLayer } from "../client"

const QUOTES = [
	"Your new DOATK main is **Toby Fox**! https://diary-of-a-tourney-kid.fandom.com/wiki/Toby_%22Radiation%22_Fox",
	"Your new DOATK main is **Adam Conover**! https://diary-of-a-tourney-kid.fandom.com/wiki/Adam_Conover",
	"Your new DOATK main is **Jake**! https://diary-of-a-tourney-kid.fandom.com/wiki/Jake",
	"Your new DOATK main is **Guptill89**! https://diary-of-a-tourney-kid.fandom.com/wiki/Guptill89",
	"Your new DOATK main is **Edmund McMillen**! https://diary-of-a-tourney-kid.fandom.com/wiki/Edmund_McMillen",
	"Your new DOATK main is **Dubious Duo**! https://diary-of-a-tourney-kid.fandom.com/wiki/Dubious_Duo",
	"Your new DOATK main is **Wolfgang Amadeus Mozart**! https://diary-of-a-tourney-kid.fandom.com/wiki/Wolfgang_Amadeus_Mozart",
	"Your new DOATK main is **DemonicKraken**! https://diary-of-a-tourney-kid.fandom.com/wiki/DemonicKraken",
	"Your new DOATK main is **Hamood Habibi**! https://diary-of-a-tourney-kid.fandom.com/wiki/Hamood_Habibi",
	"Your new DOATK main is **Donald J. Trump**! https://diary-of-a-tourney-kid.fandom.com/wiki/Donald_J._Trump",
	"Your new DOATK main is **Kebbin**! https://diary-of-a-tourney-kid.fandom.com/wiki/Kebbin",
	"Your new DOATK main is **AlphaGenos**! https://diary-of-a-tourney-kid.fandom.com/wiki/AlphaGenos",
	"Your new DOATK main is **The Eiffel Tower**! https://diary-of-a-tourney-kid.fandom.com/wiki/The_Eiffel_Tower",
	"Your new DOATK main is **Inugami Korone**! https://diary-of-a-tourney-kid.fandom.com/wiki/Inugami_Korone",
	"Your new DOATK main is **Evil Morty**! https://diary-of-a-tourney-kid.fandom.com/wiki/Evil_Morty",
	"Your new DOATK main is.. **You**..? https://diary-of-a-tourney-kid.fandom.com/wiki/You",
];

module.exports = {
	slashData: new SlashCommandBuilder()
		.setName("doatk")
		.setDescription("Gives you a random Diary of a Tourney Kid contestant."),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
		return newLayer.reply(QUOTES[Math.floor(Math.random() * QUOTES.length)])
	},
};