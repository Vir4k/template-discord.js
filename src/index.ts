import "reflect-metadata";
import EnvLoader from "./Classes/EnvLoader";
EnvLoader.load();
import { BotClient } from "./Lib/Client/DiscordClient";
const client = new BotClient();
client.init(client.config.token).then(client.logger.starting()!);
import moment from "moment-timezone";
moment.locale("en");
moment.tz.setDefault("Asia/Jakarta");
