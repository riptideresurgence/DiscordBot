import { ChatInputCommandInteraction, EmbedBuilder, Message, SlashCommandBuilder, SlashCommandIntegerOption, SlashCommandStringOption } from "discord.js";
import { botCompatibilityLayer } from "../client"

import * as core from "@riptide/core";

module.exports = {
	slashData: new SlashCommandBuilder()
		.setName("class_info")
		.setDescription("Display the ability info of a class.")
        .addStringOption((option: SlashCommandStringOption) => 
            option.setName("section")
                .setDescription("Select the class to display.")
                .setRequired(true)
                .addChoices(
                    {name: "Phantom", value: "phantom"},
                    {name: "Your Mother", value: "yourmom"},
                )
        ),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
        if (interaction instanceof Message) {
            return newLayer.reply("This command can only be used as a slash command.");
        }

        const leaderboardSection = interaction.options.getString("section");
        if (!leaderboardSection) {
            return newLayer.reply("No class selected, cannot display.");
        }

        let leaderboardName = "All Time Leaderboard"
        if (leaderboardSection == "phantom") {
            leaderboardName = `Class Info - Phantom`;
        } else if (leaderboardSection == "yourmom") {
            leaderboardName = `Class Info - Your Mother`;
        }

        if (leaderboardSection == "phantom") {
            const embed = new EmbedBuilder()                           
                .setTitle(leaderboardName)
                .setDescription(`**Passive Trait - Pursue**\n- Upon getting a kill or assist, Phantom will gain 10AP of Run Speed Up for 3 seconds\n**LMB:** uses a sword in an aoe hitbox infront of itself\n- 70 dmg, 1.5 cooldown\n**RMB:** fires a shadow ball (no trajectory falloff) which deals 65 damage - 1.2 firerate\n- similar to an s blast long range shot but with a slightly larger explosion radius\n- if it hits a wall early it will have the same aoe hitbox if it exploded in the aoe\n- 1.4s cooldown\n**E:** Phantom flashes and turns invisible for 6 seconds. it can still be hit\n- upon getting hit, Phantom's current hp will be cut in half and will be immobile for 1 second\n- the initial blast of turning invisible deals 45 damage\n- once in this state, Phantom will obtain 10AP of Run Speed Up and Special Charge Up\n- Phantom can press E to end the state early\n- 12 second cooldown after the state ends\n**Q:** zipcaster`)
                .setColor("#adb4d3")
                .setTimestamp();
                newLayer.reply({ embeds: [embed] });
        } else if (leaderboardSection == "yourmom") {
            const embed = new EmbedBuilder()      
            .setTitle(leaderboardName)
            .setDescription(`**Passive Trait - That's Just Insulting**\n- https://www.youtube.com/watch?v=WfYyBp4Ln2s`)
            .setColor("#adb4d3")
            .setTimestamp();
            newLayer.reply({ embeds: [embed] });
        }
},
}