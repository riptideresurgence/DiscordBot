import { Collection } from "discord.js";
import fs from "fs";
import path from "path";

const commands: Collection<string, any> = new Collection();
const slashCommandsData: any[] = [];
let parsedCommands = false;

function parseCommands() {
    if (parsedCommands) {
        return;
    }

    const commandsPath = path.join(__dirname, "cmds");
    const commandFiles = fs.readdirSync(commandsPath).filter(
        file => (file.endsWith('.js') || file.endsWith('.ts')) && !file.endsWith('.d.ts')
    );

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        let command = require(filePath);
        if (command.isTemplate)
            continue;
        if (command.execute) {
            const commandName: string = command.slashData ? command.slashData.name : path.parse(file).name;
            commands.set(commandName, command);
            if (command.slashData)
                slashCommandsData.push(command.slashData);

            //Log(`DiscordBot: Loaded command file ${file} with name: ${commandName}`)
        } else {
            //Log(`DiscordBot: Cannot load command file ${file} as it's missing data.`)
        }
        command = null;
    }

    parsedCommands = true;
}

function fetchCommand(commandName: string) {
    return commands.get(commandName);
}

export { parseCommands, fetchCommand, slashCommandsData }