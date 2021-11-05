import { PermissionString } from "discord.js";

/**
 * Information interface for commands.
 */
export interface ICommandInfo {
  /** Name of the command */
  name: string;

  /** Group name of the command */
  group: string;

  /** Aliases of the command */
  aliases?: string[];

  /** Example usages */
  examples?: string[];
  /** Minimum Arguments for command */

  ArgsMin?: any;

  /** Usage For Command */

  usage?: string;

  /** Description of the command */
  description?: string;
  /**
   * Time to wait for each use (seconds)
   *
   * Developers are not affected
   */
  cooldown?: number;

  /** Status of the command */
  enabled?: boolean;

  /**
   * If enabled, command only runs in nsfw channels
   *
   * Developers are not affected
   */
  onlyNsfw?: boolean;

  /** Requirements of the command */
  require?: ICommandRequire;
}

/**
 * Requirement interface for commands.
 */
export interface ICommandRequire {
  /** If enabled, command requires developer permission to run */
  developer?: boolean;

  /**
   * Command requires permission flags to run
   *
   * Developers are not affected
   */
  permissions?: PermissionString[];
}
