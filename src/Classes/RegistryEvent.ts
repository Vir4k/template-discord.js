import { Collection } from "discord.js";
import path from "path";
import requireAll from "require-all";
import RegistryError from "../Erros/RegistryError";
import { BotClient } from "../Lib/Client/DiscordClient";
import Event from "../Lib/Structures/Event";
import { isConstructor } from "../Utils/Function";

export default class Registry {
  /**
   * Discord client.
   */
  private client: BotClient;

  /**
   * Collection for event registration.
   */
  private events: Collection<string, Event>;

  /**
   * Event paths
   */
  private eventPaths: string[] = [];

  /**
   * Creates instance for all collections.
   */
  private newCollections() {
    this.events = new Collection<string, Event>();
  }

  constructor(client: BotClient) {
    this.client = client;
    this.newCollections();
  }

  /**
   * Registers single event.
   * @param event Event object
   */
  private registerEvent(event: Event) {
    if (this.events.some((e) => e.name === event.name)) throw new RegistryError(`A event with the name "${event.name}" is already registered.`);

    this.events.set(event.name, event);
    this.client.on(event.name, event.run.bind(event));
    this.client.logger.success(`${event.name} Loaded`);
  }

  /**
   * Registers all events.
   */
  private registerAllEvents() {
    const events: any[] = [];

    if (this.eventPaths.length)
      this.eventPaths.forEach((p) => {
        delete require.cache[p];
      });

    requireAll({
      dirname: path.join(__dirname, "../Events"),
      recursive: true,
      filter: /\w*.[tj]s/g,
      resolve: (x: any) => events.push(x),
      map: (name: any, filePath: string) => {
        if (filePath.endsWith(".ts") || filePath.endsWith(".js")) this.eventPaths.push(path.resolve(filePath));
        return name;
      },
    });

    for (let event of events) {
      const valid = isConstructor(event, Event) || isConstructor(event.default, Event) || event instanceof Event || event.default instanceof Event;
      if (!valid) continue;

      if (isConstructor(event, Event)) event = new event(this.client);
      else if (isConstructor(event.default, Event)) event = new event.default(this.client);
      if (!(event instanceof Event)) throw new RegistryError(`Invalid event object to register: ${event}`);

      this.registerEvent(event);
    }
  }

  /**
   * Registers events and commands.
   */
  registerAll() {
    this.registerAllEvents();
  }

  /**
   * Removes all events from client then reregisters events & commands. Resets groups and cooldowns.
   *
   * Call this function while client is offline.
   */
  reregisterAll() {
    const allEvents = [...this.events.keys()];
    allEvents.forEach((event) => this.client.removeAllListeners(event));
    this.newCollections();
    this.registerAll();
  }
}
