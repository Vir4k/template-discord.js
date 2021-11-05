import { BotClient } from "../Lib/Client/DiscordClient";

const isConstructorProxyHandler = {
  construct() {
    return Object.prototype;
  },
};

export function isConstructor(func: any, _class: any) {
  try {
    new new Proxy(func, isConstructorProxyHandler)();
    if (!_class) return true;
    return func.prototype instanceof _class;
  } catch (err) {
    return false;
  }
}

/**
 * Checks user is a developer or not.
 * @param client Discord client
 * @param userId Discord id of the user
 */
export function isUserDeveloper(client: BotClient, userId: string) {
  return client.config.developers.includes(userId);
}
