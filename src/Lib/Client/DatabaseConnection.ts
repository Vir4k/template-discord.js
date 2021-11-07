import { createConnection } from "typeorm";
import { BotClient } from "./DiscordClient";
import { resolve } from "path";

export class InitDatabase {
  static async Init(client: BotClient) {
    await createConnection({
      database: "Data",
      entities: ["src/Database/Entities/*.ts", "../dist/src/Database/Entities/*.js"],
      migrations: ["src/migration/**/*.ts"],
      cli: {
        entitiesDir: "src/Database/Entities",
        migrationsDir: "src/Migration",
      },
      type: "mongodb",
      logging: true,
      synchronize: true,
      url: client.config.mongoUrl,
      useUnifiedTopology: true,
    })
      .catch((e: Error) => {
        client.logger.error(`caught database error: ${e.message}`);
        client.logger.error(`could not connect to database, exiting`);
        return process.exit(1);
      })
      .then(() => {
        for (const database of Object.values(client.databases)) {
          database._init();
        }
        client.logger.success(`initialized ${Object.values(client.databases).length} databases`);
      });
  }
}
