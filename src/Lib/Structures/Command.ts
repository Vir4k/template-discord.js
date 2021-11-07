import { GuildMember, Message, TextChannel, MessageEmbed, MessagePayload, MessageOptions } from "discord.js";
import { isUserDeveloper } from "../../Utils/Function";
import { ICommandInfo } from "../../Types/InterfaceCommand";
import { BotClient } from "../Client/DiscordClient";

export default abstract class Command {
  /**
   * Discord client.
   */
  readonly client: BotClient;

  /**
   * Information of the command.
   */
  readonly info: ICommandInfo;

  constructor(client: BotClient, info: ICommandInfo) {
    this.client = client;
    this.info = info;
  }

  /**
   * Executes when command throws an error.
   * @param message Message object
   * @param error Error message
   */
  async onError(message: Message, error: any) {
    this.client.logger.error(`Error Command ${this.info.name}\n ${error}`);
    await message.channel.send({
      embeds: [
        {
          color: "RED",
          title: "💥 Oops...",
          description: `${message.author}, an error occurred while running this command. Please try again later.`,
        },
      ],
    });
  }

  /**
   * Returns usability of the command
   * @param message Message object
   * @param checkNsfw Checking nsfw channel
   */
  isUsable(message: Message, checkNsfw: boolean = false): boolean {
    if (this.info.enabled === false) return false;
    if (checkNsfw && this.info.onlyNsfw === true && !(message.channel as TextChannel).nsfw && !isUserDeveloper(this.client, message.author.id)) return false;
    if (this.info.require) {
      if (this.info.require.developer && !isUserDeveloper(this.client, message.author.id)) return false;
      if (this.info.require.permissions && !isUserDeveloper(this.client, message.author.id)) {
        const perms: string[] = [];
        this.info.require.permissions.forEach((permission: any) => {
          if ((message.member as GuildMember).permissions.has(permission)) return;
          else return perms.push(permission);
        });
        if (perms.length) return false;
      }
    }

    return true;
  }

  /**
   * Runs the command.
   * @param message Message object
   * @param args Arguments
   * @param prefix Cancels cooldown when function called
   * @param cancelCooldown Cancels cooldown when function called
   */
  abstract run(message: Message, args: string[], cancelCooldown?: () => void): Promise<any>;
}
