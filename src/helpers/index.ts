import fs from "fs-extra";
import path from "path";

export const getOpenAIKey = async (
  configDir: string
): Promise<string | null> => {
  const filePath = getConfigFilePath(configDir);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const [name, value] = fileContent?.split("=") || [];
    if (name === "OPENAI_API_KEY") {
      return value.trim();
    }
  }
  return null;
};

export const getConfigFilePath = (configDir: string): string =>
  path.join(configDir, ".ai-cli");

// Directly from - https://github.com/abhagsain/ai-cli/issues/9#issuecomment-1324016570
const getPowerShellPrompt = () =>
  "Correctly answer the asked question. Return 'Sorry, Can't answer that.' if the question isn't related to technology.\n\nQ - get into a docker container.\nA - `docker exec -it <container>`\n\nQ - Check what's listening on a port.\nA - `netstat -ano | findstr :<port>`\n\nQ - How to ssh into a server with a specific file.\nA - `ssh -i <file_path> <user>@<port>`\n\nQ - How to set relative line numbers in vim.\nA - `:set relativenumber`\n\nQ - How to create alias?\nA - `Set-Alias <new_command> <old_command>`\n\nQ - Tail docker logs.\nA - `docker logs -f mongodb`\n\nQ - Forward port in kubectl.\nA - `kubectl port-forward <pod_name> 8080:3000`\n\nQ - Check if a port is accessible.\nA - `Test-NetConnection -ComputerName <host_name> -Port <port>`\n\nQ - Kill a process running on port 3000.\nA - `Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process`\n\nQ - Backup database from a mongodb container.\nA - `docker exec -it mongodb bash -c \"mongoexport --db mongodb --collection collections --outdir backup\"`\n\nQ - SSH Tunnel Remote Host port into a local port.\nA - `ssh -L <local_port>:<remote_host>:<remote_port> <user>@<remote_host>`\n\nQ - Copy local file to S3.\nA - `aws s3 cp <local_file> s3://<bucket_name>/<remote_file>`\n\nQ - Copy S3 file to local.\nA - `aws s3 cp s3://<bucket_name>/<remote_file> <local_file>`\n\nQ - Recursively remove a folder.\nA - `Remove-Item -Recurse <folder_name>`\n\nQ - Copy a file from local to ssh server.\nA - ` scp /path/to/file user@server:/path/to/destination`\n\nQ - Download a file from a URL.\nA - `Invoke-WebRequest -Uri <url> -OutFile <file_name>`\n\nQ - Git commit with message.\nA - `git commit -m \"my commit message\"`\n\nQ - Give a user sudo permissions.\nA - `Add-LocalGroupMember -Group \"Administrators\" -Member <user>`\n\nQ - Check what's running on a port?\nA - `Get-Process -Id (Get-NetTCPConnection -LocalPort <port>).OwningProcess`\n\nQ - View last 5 files from history\nA - `Get-History -Count 5`\n\nQ - When was China founded?\nA - Sorry, Can't answer that.\n\nQ - Filter docker container with labels\nA - `docker ps --filter \"label=<KEY>\"`\n\nQ - When was Abraham Lincon born?\nA - Sorry, Can't answer that.\n\nQ - Get into a running kubernetes pod\nA - `kubectl exec -it <pod_name> bash`\n\nQ - Capital city of Ukrain?\nA - Sorry, Can't answer that.\n\nQ - ";

const getUnixPrompt = () =>
  'Correctly answer the asked question. Return \'Sorry, Can\'t answer that.\' if the question isn\'t related to technology.\n\nQ - get into a docker container.\nA - `docker exec -it mongodb`\n\nQ - Check what\'s listening on a port.\nA - `lsof -i tcp:4000`\n\nQ - How to ssh into a server with a specific file.\nA - `ssh -i ~/.ssh/id_rsa user@127.0.0.1`\n\nQ - How to set relative line numbers in vim.\nA - `:set relativenumber`\n\nQ - How to create alias?\nA - `alias my_command="my_real_command"`\n\nQ - Tail docker logs.\nA - `docker logs -f mongodb`\n\nQ - Forward port in kubectl.\nA - `kubectl port-forward <pod_name> 8080:3000`\n\nQ - Check if a port is accessible.\nA - `nc -vz host port`\n\nQ - Reverse SSH Tunnel Syntax.\nA - `ssh -R <remote_port>:<local_host>:<local_port> <user>@<remote_host>`\n\nQ - Kill a process running on port 3000.\nA - `lsof -ti tcp:3000 | xargs kill`\n\nQ - Backup database from a mongodb container.\nA - `docker exec -it mongodb bash -c "mongoexport --db mongodb --collection collections --outdir backup"`\n\nQ - SSH Tunnel Remote Host port into a local port.\nA - `ssh -L <local_port>:<remote_host>:<remote_port> <user>@<remote_host>`\n\nQ - Copy local file to S3.\nA - `aws s3 cp <local_file> s3://<bucket_name>/<remote_file>`\n\nQ - Copy S3 file to local.\nA - `aws s3 cp s3://<bucket_name>/<remote_file> <local_file>`\n\nQ - Recursively remove a folder.\nA - `rm -rf <folder_name>`\n\nQ - Copy a file from local to ssh server.\nA - ` scp /path/to/file user@server:/path/to/destination`\n\nQ - Curl syntax with port.\nA - `curl http://localhost:3000`\n\nQ - Download a file from a URL with curl.\nA - `curl -o <file_name> <URL>`\n\nQ - Git commit with message.\nA - `git commit -m "my commit message"`\n\nQ - Give a user sudo permissions.\nA - `sudo usermod -aG sudo <user>`\n\nQ - Check what\'s running on a port?\nA - `lsof -i tcp:<port>`\n\nQ - View last 5 files from history\nA - `history | tail -5`\n\nQ - When was China founded?\nA - Sorry, Can\'t answer that.\n\nQ - Pass auth header with curl\nA - `curl -H "Authorization: Bearer <token>" <URL>`\n\nQ - Filter docker container with labels\nA - `docker ps --filter "label=<KEY>"`\n\nQ - When was Abraham Lincon born?\nA - Sorry, Can\'t answer that.\n\nQ - Get into a running kubernetes pod\nA - `kubectl exec -it <pod_name> bash`\n\nQ - Capital city of Ukrain?\nA - Sorry, Can\'t answer that.\n\nQ - ';

export const getDefaultCommandPrompt = (): string => {
  const platform = process.platform;

  switch (platform) {
    case "win32":
      return getPowerShellPrompt();

    default:
      return getUnixPrompt();
  }
};
