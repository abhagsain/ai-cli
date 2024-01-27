import fs from "fs-extra";
import path from "path";
import { IModel } from "../types";
import OpenAI from "openai";

export const defaultModel = {
  name: "gpt-3.5-turbo",
};

export const models: IModel[] = [defaultModel, { name: "gpt-4" }];

export const getOpenAIKey = async (
  configDir: string
): Promise<string | null> => {
  const filePath = getAPIConfigFilePath(configDir);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const [name, value] = fileContent?.split("=") || [];
    if (name === "OPENAI_API_KEY") {
      return value.trim();
    }
  }
  return null;
};

export const getAPIConfigFilePath = (configDir: string): string =>
  path.join(configDir, ".ai-cli");

const getDataConfigFilePath = (dataDir: string): string =>
  path.join(dataDir, "config.json");

export const getCurrentModel = (dataDir: string): typeof models[number] => {
  const config = getDataConfigFilePath(dataDir);
  const exists = fs.existsSync(config);
  if (!exists) {
    saveModelPreference(dataDir, defaultModel);
  }
  const { model: savedModel } = fs.readJsonSync(config);

  // To check if the saved model is in our defined list of models
  const isModelValid = models.find((model) => model.name === savedModel.name);

  if (!isModelValid) {
    saveModelPreference(dataDir, defaultModel);
    return defaultModel;
  }

  return savedModel;
};

export const saveModelPreference = (dataDir: string, model: IModel): void => {
  const config = getDataConfigFilePath(dataDir);
  fs.writeJsonSync(config, { model });
};

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

// From - https://github.com/abhagsain/ai-cli/issues/9#issuecomment-1324016570
// Modified to new messages syntax
const getPowerShellMessages = (): ChatMessage[] => [
  {
    role: "system",
    content:
      "Correctly answer the asked question. Return 'Sorry, Can't answer that.' if the question isn't related to technology.",
  },
  { role: "user", content: "get into a docker container." },
  { role: "assistant", content: "`docker exec -it <container>`" },
  { role: "user", content: "Check what's listening on a port." },
  { role: "assistant", content: "`netstat -ano | findstr :<port>`" },
  { role: "user", content: "How to ssh into a server with a specific file." },
  { role: "assistant", content: "`ssh -i <file_path> <user>@<port>`" },
  { role: "user", content: "How to set relative line numbers in vim." },
  { role: "assistant", content: "`:set relativenumber`" },
  { role: "user", content: "How to create alias?" },
  { role: "assistant", content: "`Set-Alias <new_command> <old_command>`" },
  { role: "user", content: "Tail docker logs." },
  { role: "assistant", content: "`docker logs -f mongodb`" },
  { role: "user", content: "Forward port in kubectl." },
  {
    role: "assistant",
    content: "`kubectl port-forward <pod_name> 8080:3000`",
  },
  { role: "user", content: "Check if a port is accessible." },
  {
    role: "assistant",
    content: "`Test-NetConnection -ComputerName <host_name> -Port <port>`",
  },
  { role: "user", content: "Kill a process running on port 3000." },
  {
    role: "assistant",
    content:
      "`Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process`",
  },
  { role: "user", content: "Backup database from a mongodb container." },
  {
    role: "assistant",
    content:
      '`docker exec -it mongodb bash -c "mongoexport --db mongodb --collection collections --outdir backup"`',
  },
  { role: "user", content: "SSH Tunnel Remote Host port into a local port." },
  {
    role: "assistant",
    content:
      "`ssh -L <local_port>:<remote_host>:<remote_port> <user>@<remote_host>`",
  },
  { role: "user", content: "Copy local file to S3." },
  {
    role: "assistant",
    content: "`aws s3 cp <local_file> s3://<bucket_name>/<remote_file>`",
  },
  { role: "user", content: "Copy S3 file to local." },
  {
    role: "assistant",
    content: "`aws s3 cp s3://<bucket_name>/<remote_file> <local_file>`",
  },
  { role: "user", content: "Recursively remove a folder." },
  { role: "assistant", content: "`Remove-Item -Recurse <folder_name>`" },
  { role: "user", content: "Copy a file from local to ssh server." },
  {
    role: "assistant",
    content: "`scp /path/to/file user@server:/path/to/destination`",
  },
  { role: "user", content: "Download a file from a URL." },
  {
    role: "assistant",
    content: "`Invoke-WebRequest -Uri <url> -OutFile <file_name>`",
  },
  { role: "user", content: "Git commit with message." },
  { role: "assistant", content: '`git commit -m "my commit message"`' },
  { role: "user", content: "Give a user sudo permissions." },
  {
    role: "assistant",
    content: '`Add-LocalGroupMember -Group "Administrators" -Member <user>`',
  },
  { role: "user", content: "Check what's running on a port?" },
  {
    role: "assistant",
    content:
      "`Get-Process -Id (Get-NetTCPConnection -LocalPort <port>).OwningProcess`",
  },
  { role: "user", content: "View last 5 files from history" },
  { role: "assistant", content: "`Get-History -Count 5`" },
  { role: "user", content: "When was China founded?" },
  { role: "assistant", content: "Sorry, Can't answer that." },
  { role: "user", content: "Filter docker container with labels" },
  { role: "assistant", content: '`docker ps --filter "label=<KEY>"`' },
  { role: "user", content: "When was Abraham Lincon born?" },
  { role: "assistant", content: "Sorry, Can't answer that." },
  { role: "user", content: "Get into a running kubernetes pod" },
  { role: "assistant", content: "`kubectl exec -it <pod_name> bash`" },
  { role: "user", content: "Capital city of Ukrain?" },
  { role: "assistant", content: "Sorry, Can't answer that." },
];

const getUnixMessages = (): ChatMessage[] => [
  {
    role: "system",
    content:
      "Correctly answer the asked question. Return 'Sorry, Can't answer that.' if the question isn't related to technology.",
  },
  { role: "user", content: "get into a docker container." },
  { role: "assistant", content: "`docker exec -it mongodb`" },
  { role: "user", content: "Check what's listening on a port." },
  { role: "assistant", content: "`lsof -i tcp:4000`" },
  { role: "user", content: "How to ssh into a server with a specific file." },
  { role: "assistant", content: "`ssh -i ~/.ssh/id_rsa user@127.0.0.1`" },
  { role: "user", content: "How to set relative line numbers in vim." },
  { role: "assistant", content: "`:set relativenumber`" },
  { role: "user", content: "How to create alias?" },
  { role: "assistant", content: '`alias my_command="my_real_command"`' },
  { role: "user", content: "Tail docker logs." },
  { role: "assistant", content: "`docker logs -f mongodb`" },
  { role: "user", content: "Forward port in kubectl." },
  {
    role: "assistant",
    content: "`kubectl port-forward <pod_name> 8080:3000`",
  },
  { role: "user", content: "Check if a port is accessible." },
  { role: "assistant", content: "`nc -vz host port`" },
  { role: "user", content: "Reverse SSH Tunnel Syntax." },
  {
    role: "assistant",
    content:
      "`ssh -R <remote_port>:<local_host>:<local_port> <user>@<remote_host>`",
  },
  { role: "user", content: "Kill a process running on port 3000." },
  { role: "assistant", content: "`lsof -ti tcp:3000 | xargs kill`" },
  { role: "user", content: "Backup database from a mongodb container." },
  {
    role: "assistant",
    content:
      '`docker exec -it mongodb bash -c "mongoexport --db mongodb --collection collections --outdir backup"`',
  },
  { role: "user", content: "SSH Tunnel Remote Host port into a local port." },
  {
    role: "assistant",
    content:
      "`ssh -L <local_port>:<remote_host>:<remote_port> <user>@<remote_host>`",
  },
  { role: "user", content: "Copy local file to S3." },
  {
    role: "assistant",
    content: "`aws s3 cp <local_file> s3://<bucket_name>/<remote_file>`",
  },
  { role: "user", content: "Copy S3 file to local." },
  {
    role: "assistant",
    content: "`aws s3 cp s3://<bucket_name>/<remote_file> <local_file>`",
  },
  { role: "user", content: "Recursively remove a folder." },
  { role: "assistant", content: "`rm -rf <folder_name>`" },
  { role: "user", content: "Copy a file from local to ssh server." },
  {
    role: "assistant",
    content: "`scp /path/to/file user@server:/path/to/destination`",
  },
  { role: "user", content: "Curl syntax with port." },
  { role: "assistant", content: "`curl http://localhost:3000`" },
  { role: "user", content: "Download a file from a URL with curl." },
  { role: "assistant", content: "`curl -o <file_name> <URL>`" },
  { role: "user", content: "Git commit with message." },
  { role: "assistant", content: '`git commit -m "my commit message"`' },
  { role: "user", content: "Give a user sudo permissions." },
  { role: "assistant", content: "`sudo usermod -aG sudo <user>`" },
  { role: "user", content: "Check what's running on a port?" },
  { role: "assistant", content: "`lsof -i tcp:<port>`" },
  { role: "user", content: "View last 5 files from history" },
  { role: "assistant", content: "`history | tail -5`" },
  { role: "user", content: "When was China founded?" },
  { role: "assistant", content: "Sorry, Can't answer that." },
  { role: "user", content: "Pass auth header with curl" },
  {
    role: "assistant",
    content: '`curl -H "Authorization: Bearer <token>" <URL>`',
  },
  { role: "user", content: "Filter docker container with labels" },
  { role: "assistant", content: '`docker ps --filter "label=<KEY>"`' },
  { role: "user", content: "When was Abraham Lincoln born?" },
  { role: "assistant", content: "Sorry, Can't answer that." },
  { role: "user", content: "Get into a running kubernetes pod" },
  { role: "assistant", content: "`kubectl exec -it <pod_name> bash`" },
  { role: "user", content: "Capital city of Ukraine?" },
  { role: "assistant", content: "Sorry, Can't answer that." },
];

export const getDefaultMessages =
  (): OpenAI.Chat.Completions.ChatCompletionMessageParam[] => {
    const platform = process.platform;

    switch (platform) {
      case "win32":
        return getPowerShellMessages();

      default:
        return getUnixMessages();
    }
  };
