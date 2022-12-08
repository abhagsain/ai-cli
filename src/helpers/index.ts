import fs from "fs-extra";
import path from "path";

export const getAPIConfigFilePath = (configDir: string): string =>
  path.join(configDir, ".ai-cli");

const getDataConfigFilePath = (dataDir: string): string =>
  path.join(dataDir, "config.json");

// Directly from - https://github.com/abhagsain/ai-cli/issues/9#issuecomment-1324016570
const getPowerShellPromptHubLink = () =>
  "https://www.llmhub.com/2/functions/3/share"

const getUnixPromptHubLink = () =>
  "https://www.llmhub.com/2/functions/4/share"

export const getDefaultCommandPromptHubLink = (): string => {
  const platform = process.platform;

  switch (platform) {
    case "win32":
      return getPowerShellPromptHubLink();

    default:
      return getUnixPromptHubLink();
  }
};
