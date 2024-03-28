import { ChatInputCommandInteraction, Message, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { botCompatibilityLayer } from "../client"

const possibleIcons = [
    "https://media.discordapp.net/attachments/1176997797485101057/1202371817390604369/256px-S3_Weapon_Main_Slosher.png", // sloshermapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202375961769676800/9k-2.png", // zombiemapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202371274823974972/02adam-transparentwitharmfilled.webp", // lemmymapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202371406826831912/attachment.gif", // droolmapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202371470085324801/bart.png", // bartmapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202371471201140736/IMG_1102-1.png", // officermapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202371526364500019/ColaPfp.png", // sethimapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202371535881375795/000BOX.png", // boxmapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202371559382339674/peter_fazbear.jpg", // peterfazbearmapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202372368631353374/dsadsa.png", // hogeomapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202374199960666112/20240129_222029.jpg", // minimapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202377055506018354/peter.png", // guymapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202377283147677766/IMG_5981.png", // heromapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202377297567690802/VN2DOPqX_400x400.jpg", // crazymapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202377654141984868/Untitled69_20231105015327.png", // joesmapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202383653318041600/IS_BRO_DEAD.gif", // isbrodeadmapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202391884476059689/IMG_6177.png", // matmapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202394715287322715/Untitled424_20240121075400.png", // rigmapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202539025270050867/IMG_5820.png", // neighbormapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202551203637108826/Untitled36_20240129104805.png", // bravemapped
    "https://media.discordapp.net/attachments/1176997797485101057/1202621909099880478/i282319414682492955._szw1280h1280_.jpg", // bluefyxmapped
];
const possibleNames = [
    "sloshermapped.",
    "zombiemapped.",
    "lemmymapped.",
    "droolmapped.",
    "bartmapped.",
    "officermapped.",
    "sethimapped.",
    "boxmapped.",
    "peterfazbearmapped.",
    "hogeomapped.",
    "minimapped.",
    "guymapped.",
    "heromapped.",
    "crazymapped.",
    "joesmapped.",
    "isbrodeadmapped.",
    "matmapped.",
    "rigmapped.",
    "neighbormapped.",
    "bravemapped.",
    "bluefyxmapped.",
];


module.exports = {
    permissions: ["CYRISS"],
	slashData: new SlashCommandBuilder()
		.setName("setbrand")
		.setDescription("Randomize the server icon/name."),
	async execute(interaction: ChatInputCommandInteraction<any> | Message<boolean>, args: any[]) {
		const newLayer = new botCompatibilityLayer(interaction, true);
        await newLayer.init(false);

        const coolNumber = Math.floor(Math.random() * possibleIcons.length)
        
        newLayer.reply(`New branding: ${possibleNames[coolNumber]} woohoo ${possibleIcons[coolNumber]}`);
	},
};