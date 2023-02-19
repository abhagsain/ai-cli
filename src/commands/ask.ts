import { CliUx, Command } from "@oclif/core";
import chalk from "chalk";
import * as inquirer from "inquirer";
import {
  getCurrentModel,
  getDefaultCommandPrompt,
  getOpenAIKey,
} from "../helpers/index";
const { Configuration, OpenAIApi } = require("openai");
import { exec } from 'child_process';

function runShellCommand(command: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

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
    const configuration = new Configuration({
      apiKey: API_KEY || process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const prompt = `${getDefaultCommandPrompt() + question.trim() + "\nA - "}`;
    const { name: model } = getCurrentModel(this.config.configDir);
    try {
      const response = await openai.createCompletion({
        model: model,
        prompt,
        temperature: 0.8,
        max_tokens: 64,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
        stop: ['"""'],
      });
      const code = /`(.*?)`/;
      const value = response.data.choices[0].text.trim();
      const match =
        value.match(code)?.length > 1 ? value.match(code)[1] : value;
      return match;
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data.error));
    }
  }

  async showOptions(answer: string): Promise<void> {
    const choices = ["Run the answer","Copy to clipboard", "Exit"];

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
      case "Run the answer": {
	runShellCommand(answer)
	  .then((output) => {
	    console.log(`Command output:\n${output}`);
	  })
	  .catch((error) => {
	    console.error(`Command failed with error:\n${error}`);
	  });
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
  }
}
