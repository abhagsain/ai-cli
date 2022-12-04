import { Command } from "@oclif/core";
import chalk from "chalk";
import * as inquirer from "inquirer";
import {
  defaultModel,
  getCurrentModel,
  models,
  saveModelPreference,
} from "../helpers/index";

export default class Model extends Command {
  static description = `Change model preference (default: ${defaultModel})`;

  static examples = ["<%= config.bin %> <%= command.id %> (Follow the prompt)"];

  public async run(): Promise<void> {
    const currentModel = getCurrentModel(this.config.configDir);
    const prompt = await inquirer.prompt<{ modelName: string }>([
      {
        name: "modelName",
        message: "Please select a model",
        type: "list",
        choices: models.map((model) => ({
          name:
            model === currentModel
              ? model + chalk.yellowBright(" (current)")
              : model,
          value: model,
        })),
      },
    ]);
    const { modelName } = prompt;
    saveModelPreference(this.config.configDir, modelName);
    this.log(
      `\n✅ Model preference saved. You can change it anytime again with ${chalk.bold.yellow(
        "ai model"
      )}`
    );
  }
}
