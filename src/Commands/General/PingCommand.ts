import { Message } from "discord.js";
import Command from "../../Lib/Structures/Command";
import { BotClient } from "../../Lib/Client/DiscordClient";
import { EmbedBuilder } from "../../Lib/Structures/EmbedBuilder";

export default class PingCommand extends Command {
  constructor(client: BotClient) {
    super(client, {
      name: "ping",
      group: "General",
      description: "Test command for developers",
      cooldown: 10,
    });
  }

  async run(message: Message, args: string[], cancelCooldown: () => void) {
    await message.reply({ embeds: [new EmbedBuilder().setDescription(`Pong ${this.client.ws.ping}`)] });
  }
}
