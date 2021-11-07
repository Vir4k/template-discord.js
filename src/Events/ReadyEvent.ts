import { InitDatabase } from "../Lib/Client/DatabaseConnection";
import { BotClient } from "../Lib/Client/DiscordClient";
import Event from "../Lib/Structures/Event";

export default class ReadyEvent extends Event {
  constructor(client: BotClient) {
    super(client, "ready");
  }

  async run() {
    InitDatabase.Init(this.client);
    this.client.logger.connected(this.client.user?.tag!, this.client.user?.id!);
  }
}
