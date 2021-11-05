import { formatDuration, intervalToDuration } from "date-fns";
import * as locales from "date-fns/locale";

import { BotClient } from "../Lib/Client/DiscordClient";

export class Formatter {
  public constructor(public readonly client: BotClient) {}

  public async formatMS(ms: number) {
    if (isNaN(ms)) throw new Error("value is not a number.");

    const key = Object.keys(locales).find((v) => v.toLowerCase() === "en");
    const locale = key ? (locales as Record<string, globalThis.Locale>)[key] : locales.enUS;

    return formatDuration(intervalToDuration({ start: 0, end: ms }), {
      locale,
    });
  }
}
