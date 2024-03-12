import { ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { botCompatibilityLayer } from "../client"

module.exports = {
	slashData: new SlashCommandBuilder()
	.setName("bluefyx") 
	.setDescription("bluefyx")
	.addStringOption((option: SlashCommandStringOption) => 
		option.setName("bluefyx")
			.setDescription("Select the option to display.")
			.setRequired(true)
			.addChoices(
				{name: "bluefyx", value: "bluefyx"},
				{name: "This command doesn't exist", value: "victims"},
			)
	),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
        if (interaction instanceof Message) {
            return newLayer.reply("This command can only be used as a slash command.");
        }

        const bluefyxCommand = interaction.options.getString("bluefyx");
        if (!bluefyxCommand) {
            return newLayer.reply("No choice selected, cannot display.");
        }

		function generateRandomNumber(min: number, max: number): number {
			/**
			 * This function generates a random number between the given minimum and maximum values.
			 * 
			 * @param min - The minimum value for the random number (inclusive)
			 * @param max - The maximum value for the random number (inclusive)
			 * @returns A random number between the minimum and maximum values
			 */
			
			try {
				// Check if the minimum and maximum values are valid
				if (typeof min !== 'number' || typeof max !== 'number') {
					throw new TypeError('Both minimum and maximum values must be numbers');
				}
				
				// Check if the minimum value is greater than the maximum value
				if (min > max) {
					throw new Error('Minimum value cannot be greater than the maximum value');
				}
				
				// Generate a random number between the minimum and maximum values
				const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
				
				return randomNumber;
			} catch (error) {
				
				// Return a default value of 0
				return 295238;
			}
		}

		const victimCount = generateRandomNumber(100, 100000)

		if (bluefyxCommand == "victims") {
			return newLayer.reply(`LITERALLY STOP BEE REACTING I'VE REPEATED THIS\nIT'S LITERALLY FLOODING THE CHAT AND IT'S ALSO ANNOYING ME AND OTHERS\nDONT YOU FUCKING DARE BEE REACT TO THIS\nEITHER I'LL HAVE YOUR USER NOTED`)
		} else if (bluefyxCommand == "bluefyx") {
			return newLayer.reply(`https://media.discordapp.net/attachments/1088196021982609420/1168722340419489844/caption.gif`)
		}
	},
};