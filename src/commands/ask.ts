import { CliUx, Command } from "@oclif/core";
import chalk from "chalk";
import * as inquirer from "inquirer";
import {
  getDefaultCommandPromptHubLink,
} from "../helpers/index";
const LLMHub = require("llmhub");

export default class AI extends Command {
  static description = "Ask question to GPT3 from your terminal";
  static usage = "ask [question]";
  static help = `ai ask "Check if a remote port is open"`;

  static args = [
    {
      name: "question",
      description: "Your question",
      required: true,
    },
  ];

  static examples = [
    `$ <%= config.bin %> <%= command.id %> "Check running process on port 3000"`,
  ];

  async getAnswersFromGPT3({
    question,
  }: {
    question: string;
  }): Promise<any> {
    const llmhub = new LLMHub(getDefaultCommandPromptHubLink());
    const input = `${question.trim() + "\nA - "}`;
    const { output } = await llmhub.run({input});
    const code = /`(.*?)`/;
    const value = output.trim();
    const match = value.match(code)?.length > 1 ? value.match(code)[1] : value;
    return match;
  }

  async showOptions(answer: string): Promise<void> {
    const choices = ["Copy to clipboard", "Exit"];

    const prompt: any = await inquirer.prompt([
      {
        name: "command",
        message: "Select an option",
        type: "list",
        choices,
      },
    ]);

    const { command } = prompt;
    switch (command) {
      case "Copy to clipboard": {
        const clipboardy = (await import("clipboardy")).default;
        clipboardy.writeSync(answer);
        break;
      }

      default: {
        return;
      }
    }
  }

  async run(): Promise<void> {
    const { args } = await this.parse(AI);
    const { question } = args;
    CliUx.ux.action.start("");
    const answer = await this.getAnswersFromGPT3({
      question: question.trim(),
    });
    CliUx.ux.action.stop("");
    if (answer.toLowerCase().startsWith("sorry")) {
      this.log(answer);
      return;
    }
    this.log(
      `> ${chalk.green(`Command is`)} ${chalk.bold.yellowBright(
        `\`${answer}\``
      )}\n`
    );

    await this.showOptions((answer || "").trim());
    this.log(
      `${chalk.red(
        "Please don't run a command that you don't understand."
      )} ${chalk.underline.red("Especially destructive commands")} `
    );
  }
}
