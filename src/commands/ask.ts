import { CliUx, Command } from "@oclif/core";
import chalk from "chalk";
import * as inquirer from "inquirer";
import {
  getCurrentModel,
  getDefaultMessages,
  getOpenAIKey,
} from "../helpers/index";
import OpenAI from "openai";

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
    API_KEY,
  }: {
    question: string;
    API_KEY: string;
  }): Promise<any> {
    const openai = new OpenAI({
      apiKey: API_KEY || process.env.OPENAI_API_KEY,
    });
    const messages = getDefaultMessages();
    const { name: model } = getCurrentModel(this.config.configDir);
    try {
      const response = await openai.chat.completions.create({
        model: model,
        messages: [...messages, { role: "user", content: question }],
        temperature: 0.8,
        max_tokens: 64,
        frequency_penalty: 0.5,
        presence_penalty: 0,
        stop: ['"""'],
      });
      const code = /`(.*?)`/;
      const value = response.choices[0].message.content?.trim() || "";
      const matches = value.match(code) || [];
      const match = matches.length > 1 ? matches[1] : value;
      return match;
    } catch (error: any) {
      // Error handling as suggested in openai v3->v4 migration guide
      // https://github.com/openai/openai-node/discussions/217
      if (error instanceof OpenAI.APIError) {
        throw new Error(
          JSON.stringify({
            status: error.status,
            message: error.message,
            code: error.code,
            type: error.type,
          })
        );
      } else throw new Error(error.message);
    }
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
    const API_KEY = await getOpenAIKey(this.config.configDir);
    if (!API_KEY) {
      this.log(
        "You haven't set your OpenAI API key. Please login with",
        chalk.bold.yellow("ai auth")
      );
      return;
    }

    const { args } = await this.parse(AI);
    const { question } = args;
    CliUx.ux.action.start("");
    const answer = await this.getAnswersFromGPT3({
      question: question.trim(),
      API_KEY,
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
