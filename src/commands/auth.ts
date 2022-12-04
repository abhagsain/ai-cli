import { Command } from "@oclif/core";
import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import { getAPIConfigFilePath, getOpenAIKey } from "../helpers/index";

export default class Auth extends Command {
  static description = "Update existing or add new OpenAI API Key";

  static examples = ["<%= config.bin %> <%= command.id %> (Follow the prompt)"];

  public async run(): Promise<void> {
    const existingAPIKey = await getOpenAIKey(this.config.configDir);
    const filePath = getAPIConfigFilePath(this.config.configDir);

    const message = existingAPIKey
      ? "Please enter your OpenAI API Key (This would overwrite the existing key)"
      : "Please enter your OpenAI API Key";
    const prompt = await inquirer.prompt([
      {
        name: "userAPIKey",
        message,
        type: "password",
        validate: (value: string) => {
          if (!value.trim()) {
            return "Please enter a valid API key";
          }
          return true;
        },
      },
    ]);

    const { userAPIKey } = prompt;
    fs.ensureFileSync(filePath);
    if (userAPIKey) {
      fs.writeFileSync(filePath, `OPENAI_API_KEY=${userAPIKey}`);
    }
    this.log(`API Key is saved at ${chalk.bold.yellowBright(filePath)}`);
  }
}
