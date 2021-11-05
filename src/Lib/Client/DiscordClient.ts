import { Client, Intents } from "discord.js";
import { IConfig } from "../../Types/InterfaceConfig";
import { Logger } from "../../Classes/Logger";
import Registry from "../../Classes/RegistryEvent";
import { Formatter } from "../../Utils/Formatter";

export class BotClient extends Client {
  readonly config: IConfig;
  readonly registry: Registry;
  public readonly logger = new Logger();
  public readonly formatter = new Formatter(this);
  constructor() {
    super({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
      ],
    });
    this.config = {
      token: process.env.BOT_TOKEN as string,
      prefix: process.env.PREFIX as string,
      developers: process.env.DEVELOPERS as string,
      unknownErrorMessage: JSON.parse(process.env.UNKNOWN_COMMAND_ERROR as string),
    };
    this.registry = new Registry(this);
    this.registry.registerAll();
  }
  public async init(token: string): Promise<void> {
    this.login(token);
  }
}
