## [template-discord.js](https://github.com/Xfwm4/template-discord.js)

**This Bot is beta version and In development**

## Requirements

- Nodejs Version 16
- Code Editor

# Config

```environment

## Goto Dev Portal
BOT_TOKEN=

## Default ?
PREFIX=?

## Your Discord User ID
DEVELOPERS=776458781239410698

## Optional Boolean
UNKNOWN_COMMAND_ERROR=true
```

- Create .env file and write it

## Setup

- Recomended Using Yarn

```sh
npm -g yarn
```

- Installing Dependencie Package Bot

```sh
yarn install
```

- Running Bot Production/Development

```sh
yarn start
```

- Dev production

```sh
yarn start:dev
```

## Example Commands

```typescript
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
      require: {
        developer: true,
      },
    });
  }

  async run(message: Message, args: string[], cancelCooldown: () => void) {
    await message.reply({ embeds: [new EmbedBuilder().setDescription(`Hello ${message.author.name}`)] });
  }
}
```

## Example Events

```typescript
import { BotClient } from "../Lib/Client/DiscordClient";
import Event from "../Lib/Structures/Event";

export default class ReadyEvent extends Event {
  constructor(client: BotClient) {
    super(client, "ready");
  }

  async run() {
    this.client.logger.connected(this.client.user?.tag!, this.client.user?.id!);
  }
}
```

- Coming Soon to next update Thanks you
- Have error Dm l|l|12|1#1909
