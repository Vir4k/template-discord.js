import dotenv from "dotenv";

import EnvError from "../Erros/EnvError";

export default class EnvLoader {
  /**
   * Loads and validates .env file.
   */
  static load() {
    dotenv.config();
    this.validate(process.env);
  }

  /**
   * Validates the .env file.
   * @param env Env object
   */
  private static validate(env: any) {
    if (env.TOKEN === "") throw new EnvError("Discord Config token missing.");
    if (env.PREFIX === "") throw new EnvError("Prefix Config missing.");
    if (env.DEVELOPERS === "") throw new EnvError("Developers Config missing.");
    if (env.UNKNOWN_COMMAND_ERROR === "") throw new EnvError("Unknown command error missing");
    if (env.MONGOURL === "") throw new EnvError("Unknown command error missing");
  }
}
