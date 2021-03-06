import { Message } from "discord.js";
import Command from "../../Lib/Structures/Command";
import { BotClient } from "../../Lib/Client/DiscordClient";
import { EmbedBuilder } from "../../Lib/Structures/EmbedBuilder";

export default class PingCommand extends Command {
  constructor(client: BotClient) {
    super(client, {
      name: "test",
      group: "General",
      description: "Test command for developers",
      cooldown: 10,
      require: {
        developer: true,
      },
    });
  }

  async run(message: Message, args: string[]) {
    await message.reply({ embeds: [new EmbedBuilder().setDescription("Test command worked")] });
  }
}
