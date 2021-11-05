import { Message } from "discord.js";

import CommandHandler from "../Classes/CommandHandler";
import { BotClient } from "../Lib/Client/DiscordClient";
import Event from "../Lib/Structures/Event";

export default class MessageEvent extends Event {
  constructor(client: BotClient) {
    super(client, "messageCreate");
  }

  async run(message: Message) {
    if (message.author.bot || message.channel.type === "DM") return;
    await CommandHandler.handleCommand(this.client, message);
  }
}
