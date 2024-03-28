import { ChatInputCommandInteraction, EmbedBuilder, Message, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { botCompatibilityLayer } from "../client"

import * as core from "@riptide/core";

const XP_CAP = 25000;

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
};

function getMaxXP(level: number) {
    const xpMath = 200 + (level - 1) * 400;
    return clamp(xpMath, 1, XP_CAP);
}

module.exports = {
	slashData: new SlashCommandBuilder()
		.setName("shop_rotation")
		.setDescription("Get the specified Riptide Resurgence shop rotation.")
        .addStringOption((option: SlashCommandStringOption) => 
        option.setName("shop")
            .setDescription("Select the shop rotation to display.") 
            .setRequired(true)
            .addChoices(
                {name: "Auras", value: "auras"},
                {name: "Emotes", value: "emotes"},
                {name: "Skins", value: "skins"},
                {name: "Weapons", value: "weapons"},
            )
    ),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);
        if (interaction instanceof Message) {
            return newLayer.reply("This command can only be used as a slash command.");
        }

        const leaderboardSection = interaction.options.getString("shop");
        if (!leaderboardSection) {
            return newLayer.reply("No shop selected, cannot display.");
        }
        core.roblox.getEntryFromDataStore(5113672776, "ShopStoreLol", `LastShopUpdate`)
                    .then((entry) => {
                        const shopData = entry.data;
                        if (!shopData) {
                            return newLayer.reply("Failed to fetch shop data!");
                        }

                        const AURAS_QUOTES = [ 
                            "*MOON MISS: Of course they make me do the prize section on our website, idiots..*",
                            "*MOON MISS: Too lazy to come to the arcade? Whatever, when are you never lazy?*",
                            "*MOON MISS: Uhhh.. yep, these are the prizes. I don't blame you for being bored either.*",
                        ]

                        const EMOTES_QUOTES = [ 
                            "*DJ INEXPERIENCED: That.. cutesy thing.. it gives me nightmares by just thinking about it...*",
                            "*DJ INEXPERIENCED: As much as it sucks that you aren't here physically, one person being absent isn't letting the party stop!*",
                            "*DJ INEXPERIENCED: I was told to tone down the neon lights, these guys know nothing about dance floors.. for shame!*",
                        ]

                        const SKINS_QUOTES = [ 
                            "*NOOBEST: Why am I being forced to give information about my experiments?*",
                            "*NOOBEST: So why is this called an underwater base again? Unless the city is underwater, which I doubt..*",
                            "*NOOBEST: Could go for coffee right now.. Oh, is someone listening?*",
                        ]

                        const WEAPONS_QUOTES = [ 
                            "*BRICKBATTLER: A website for my shop? Gotta say, it's pretty nifty..*",
                            "*BRICKBATTLER: Got some pretty nice tools for you to use to your advantage, take a look!*",
                            "*BRICKBATTLER: If it isn't my favorite customer, look at what I have for today!*",
                        ]

                        let leaderboardName = "Balls"
                        let leaderboardStore = "Balls 2"

                        if (leaderboardSection == "auras") {
                            leaderboardStore = `Auras`
                            leaderboardName = `Galactic Arcade - Aura Shop Rotation`;
                        } else if (leaderboardSection == "emotes") {
                            leaderboardStore = `Emotes`;
                            leaderboardName = `this shop is meant to blind you - Emote Shop Rotation`;
                        } else if (leaderboardSection == "skins") {
                            leaderboardStore = `Skins`;
                            leaderboardName = `Not So Secret Underwater Base - Skin Shop Rotation`;
                        } else if (leaderboardSection == "weapons") {
                            leaderboardStore = `Weapons`;
                            leaderboardName = `please buy my weapons without informing the police ok thanks 😁 - Weapon Shop Rotation`;
                        }

                        if (leaderboardSection == "auras") {
                            const embed = new EmbedBuilder()                           
                            .setTitle(leaderboardName)
                            .setDescription(`${AURAS_QUOTES[Math.floor(Math.random() * AURAS_QUOTES.length)]}\n- ${shopData.Auras[0]}\n- ${shopData.Auras[1]}\n- ${shopData.Auras[2]}\n- ${shopData.Auras[3]}\n- ${shopData.Auras[4]}\n- ${shopData.Auras[5]}\n- ${shopData.Auras[6]}`)
                            .setColor("#adb4d3")
                            .setTimestamp();
                            newLayer.reply({ embeds: [embed] });
                        } else if (leaderboardSection == "emotes") {
                            const embed = new EmbedBuilder()                           
                            .setTitle(leaderboardName)
                            .setDescription(`${EMOTES_QUOTES[Math.floor(Math.random() * EMOTES_QUOTES.length)]}\n- ${shopData.Emotes[0]}\n- ${shopData.Emotes[1]}\n- ${shopData.Emotes[2]}\n- ${shopData.Emotes[3]}\n- ${shopData.Emotes[4]}\n- ${shopData.Emotes[5]}`)
                            .setColor("#adb4d3")
                            .setTimestamp();
                            newLayer.reply({ embeds: [embed] });
                        } else if (leaderboardSection == "skins") {
                            const embed = new EmbedBuilder()                           
                            .setTitle(leaderboardName)
                            .setDescription(`${SKINS_QUOTES[Math.floor(Math.random() * SKINS_QUOTES.length)]}\n- ${shopData.Skins[0]}\n- ${shopData.Skins[1]}\n- ${shopData.Skins[2]}\n- ${shopData.Skins[3]}\n- ${shopData.Skins[4]}\n- ${shopData.Skins[5]}`)
                            .setColor("#adb4d3")
                            .setTimestamp();
                            newLayer.reply({ embeds: [embed] });
                        } else if (leaderboardSection == "weapons") {
                            const embed = new EmbedBuilder()                           
                            .setTitle(leaderboardName)
                            .setDescription(`${WEAPONS_QUOTES[Math.floor(Math.random() * WEAPONS_QUOTES.length)]}\n- ${shopData.Weapons[0]}\n- ${shopData.Weapons[1]}\n- ${shopData.Weapons[2]}\n- ${shopData.Weapons[3]}\n- ${shopData.Weapons[4]}\n- ${shopData.Weapons[5]}\n- ${shopData.Weapons[6]}\n- ${shopData.Weapons[7]}`)
                            .setColor("#adb4d3")
                            .setTimestamp();
                            newLayer.reply({ embeds: [embed] });
                        }
                    })
                    .catch((err) => {
                        newLayer.reply(`Cannot fetch stats: ${err}`);
                    })
	},
};
