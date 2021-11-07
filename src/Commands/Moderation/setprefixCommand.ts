import { Message } from "discord.js";
import Command from "../../Lib/Structures/Command";
import { BotClient } from "../../Lib/Client/DiscordClient";
import { EmbedBuilder } from "../../Lib/Structures/EmbedBuilder";

export default class PingCommand extends Command {
  constructor(client: BotClient) {
    super(client, {
      name: "setprefix",
      group: "Moderation",
      description: "Setting Prefix Of the bot",
      cooldown: 10,
      require: {
        permissions: ["MANAGE_GUILD"],
      },
    });
  }

  async run(message: Message, args: string[]) {
    const prefix = args.join(" ");
    if (!prefix) return message.reply("You must include the prefix");
    const guildDatabase = await this.client.databases.guilds.set(message.guildId!, "prefix", prefix);
    await message.reply({ embeds: [new EmbedBuilder().setDescription(`New Guild Prefix ${guildDatabase.prefix}`)] });
  }
}
