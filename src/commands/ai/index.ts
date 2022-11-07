import { Command, CliUx } from "@oclif/core";
import * as inquirer from "inquirer";
const { Configuration, OpenAIApi } = require("openai");
// import clipboardy from "clipboardy";
import chalk from "chalk";

export default class AI extends Command {
  static description = "Say hello";

  static examples = [
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ];

  static args = [
    {
      name: "question",
      description: "Your question. Eg. Check process running on a port",
      required: true,
    },
  ];

  async getAnswers(question: string): Promise<any> {
    const configuration = new Configuration({
      apiKey:
        
        process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt:
        'Correctly answer the asked question. Return \'Sorry, Can\'t answer that.\' if the question isn\'t related to technology.\n\nQ - get into a docker container.\nA - `docker exec -it mongodb`\n\nQ - Check what\'s listening on a port.\nA - `lsof -i tcp:4000`\n\nQ - How to ssh into a server with a specific file.\nA - `ssh -i ~/.ssh/id_rsa user@127.0.0.1`\n\nQ - How to set relative line numbers in vim.\nA - `:set relativenumber`\n\nQ - How to create alias?\nA - `alias my_command="my_real_command"`\n\nQ - Tail docker logs.\nA - `docker logs -f mongodb`\n\nQ - Forward port in kubectl.\nA - `kubectl port-forward <pod_name> 8080:3000`\n\nQ - Check if a port is accessible.\nA - `nc -vz host port`\n\nQ - Reverse SSH Tunnel Syntax.\nA - `ssh -R <remote_port>:<local_host>:<local_port> <user>@<remote_host>`\n\nQ - Kill a process running on port 3000.\nA - `lsof -ti tcp:3000 | xargs kill`\n\nQ - Backup database from a mongodb container.\nA - `docker exec -it mongodb bash -c "mongoexport --db mongodb --collection collections --outdir backup"`\n\nQ - SSH Tunnel Remote Host port into a local port.\nA - `ssh -L <local_port>:<remote_host>:<remote_port> <user>@<remote_host>`\n\nQ - Copy local file to S3.\nA - `aws s3 cp <local_file> s3://<bucket_name>/<remote_file>`\n\nQ - Copy S3 file to local.\nA - `aws s3 cp s3://<bucket_name>/<remote_file> <local_file>`\n\nQ - Recursively remove a folder.\nA - `rm -rf <folder_name>`\n\nQ - Copy a file from local to ssh server.\nA - ` scp /path/to/file user@server:/path/to/destination`\n\nQ - Curl syntax with port.\nA - `curl http://localhost:3000`\n\nQ - Download a file from a URL with curl.\nA - `curl -o <file_name> <URL>`\n\nQ - Git commit with message.\nA - `git commit -m "my commit message"`\n\nQ - Give a user sudo permissions.\nA - `sudo usermod -aG sudo <user>`\n\nQ - Check what\'s running on a port?\nA - `lsof -i tcp:<port>`\n\nQ - View last 5 files from history\nA - `history | tail -5`\n\nQ - When was China founded?\nA - Sorry, Can\'t answer that.\n\nQ - Pass auth header with curl\nA - `curl -H "Authorization: Bearer <token>" <URL>`\n\nQ - Filter docker container with labels\nA - `docker ps --filter "label=<KEY>"`\n\nQ - When was Abraham Lincon born?\nA - Sorry, Can\'t answer that.\n\nQ - Get into a running kubernetes pod\nA - `kubectl exec -it <pod_name> bash`\n\nQ - Capital city of Ukrain?\nA - Sorry, Can\'t answer that.\n\nQ - ' +
        question.trim() +
        "\nA - ",
      temperature: 0.8,
      max_tokens: 64,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      stop: ['"""'],
    });
    const code = /`(.*?)`/;
    const value = response.data.choices[0].text.trim();
    const match = value.match(code)?.length > 1 ? value.match(code)[1] : value;
    return match;
  }

  async showStuff(answer: string): Promise<void> {
    const options = ["Copy to clipboard", "Exit"];
    const choices = [
      ...options,
      // ...[answer].map((value) => `Run command ${value}`),
      // "Exit",
    ];

    const r: any = await inquirer.prompt([
      {
        name: "command",
        message: "Select an option",
        type: "list",
        choices,
        // choices: ['one', 'two', 'three'],
      },
    ]);

    const command = r.command;
    switch (command) {
      case "Copy to clipboard": {
        const clipboardy = (await import("clipboardy")).default;
        clipboardy.writeSync(answer);
        break;
      }

      default: {
        return;
      }
      // default:
      //   console.log("Running command", command);
      //   const clipboardy = (await import("clipboardy")).default;
      //   exec(answer, (error: any, stdout: any, stderr: any) => {
      //     if (error) {
      //       console.log(`error: ${error.message}`);
      //       return;
      //     }
      //     if (stderr) {
      //       console.log(`stderr: ${stderr}`);
      //       return;
      //     }

      //     clipboardy.writeSync(answer);
      //   });
      //   // break;
    }
  }

  async run(): Promise<void> {
    const responses: any = await inquirer.prompt([
      {
        name: "question",
        message: "Enter the question",
        type: "input",
        validate(value) {
          if (!value.length) return "Please enter a question";
          return true;
        },
      },
    ]);

    const question = responses.question;
    CliUx.ux.action.start("⌛");
    const answer = await this.getAnswers(question);
    CliUx.ux.action.stop("");
    if (answer.toLowerCase().startsWith("sorry")) {
      this.log(answer);
      return;
    }
    this.log(
      `> ${chalk.green(`Command is`)} ${chalk.bold.yellowBright(
        `\`${answer}\``
      )}`
    );
    await this.showStuff((answer || "").trim());
    this.log(
      `${chalk.red(
        "Please don't run a command that you don't understand."
      )} ${chalk.underline.red("Especially destructive commands")} `
    );
  }
}
