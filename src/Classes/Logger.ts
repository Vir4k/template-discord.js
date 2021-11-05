import chalk from "chalk";
import consola from "consola";

export class Logger {
  protected mainColor: string = "#9677d4";
  protected successColor: string = "#41f45e";
  protected errorColor: string = "#ba1e1e";

  /**
   * general logging functions
   * all these functions have the same structure
   * @param strs strings to log (joined with one space)
   */
  public write = (item: any) => console.log(item);
  public log = (str: string) => consola.info(chalk.hex(this.mainColor).bold(str));
  public error = (str: string) => consola.error(chalk.hex(this.errorColor).bold(str));
  public success = (str: string) => consola.success(chalk.hex(this.successColor).bold(str));
  public connected = (tag: string, id: string) => this.success(`Successfully logged in as ${chalk.underline(tag)} ${chalk.grey.italic(`(id: ${id})`)}`);

  /**
   * clears the console
   * newLine the console
   */
  public starting = () => {
    this.clear();
    this.write(` ${chalk.hex("#9677d4").bold`Tudo12`} ${chalk.rgb(200, 220, 210).italic`v2.1`} 🟣 ${chalk.rgb(200, 220, 210)(`by Tudo12`)}`);
    this.newLine(2);
    this.log(`Starting...`);
  };
  public newLine = (number: number = 1) => this.write(`\n`.repeat(number - 1));
  public clear = () => console.clear();

  console: any;
}
