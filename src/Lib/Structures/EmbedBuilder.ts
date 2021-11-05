import { ColorResolvable, MessageEmbed } from "discord.js";

export class EmbedBuilder extends MessageEmbed {
  constructor() {
    super();
    this.setColor("RED" as ColorResolvable);
    this.setFooter("Thanks For Using Ray");
  }
}
