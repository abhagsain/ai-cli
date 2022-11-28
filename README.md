# GPT3 Powered CLI

Get answers for CLI commands from GPT3 right from your terminal

<!-- <img src="https://user-images.githubusercontent.com/36589645/202102237-6666f461-1aa8-496a-9438-de15cee1696e.gif" width="900" height="600"/> -->
![image](https://user-images.githubusercontent.com/36589645/202654014-c1884be3-76d5-4b64-81d1-e3f1169fcb46.png)


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@abhagsain/ai-cli.svg)](https://npmjs.org/package/@abhagsain/ai-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@abhagsain/ai-cli.svg)](https://npmjs.org/package/@abhagsain/ai-cli)

👋 Hey, If you're someone who spends most of their time on CLI, please spare 1 minute to fill out this form. We'd really appreciate it. [https://tally.so/r/wLDXYl](https://tally.so/r/wLDXYl)


### Installation

You'd need to install it globally

```
npm i @abhagsain/ai-cli -g
```

Usage

```
$ ai ask "Check process running on port"
```

You'd need to enter your own OpenAI API key
Here's how you can get one

1. Go to https://openai.com/api/login
2. Create an account or log into your existing account
3. Go to https://beta.openai.com/account/api-keys or
   <img width="1904" alt="image" src="https://user-images.githubusercontent.com/36589645/202097820-dc6905e6-4514-413b-980f-169c35ffef9a.png">
4. Run `ai auth`, enter your API KEY and you're good to go!

Pricing

The current prompt length is `~840` tokens and the pricing for [`text-davinci-002`](https://openai.com/api/pricing/) is `$0.02` for `1K` tokens which is ~`$0.017/command`. We'll see if we can improve the response as well as reduce the per-command-cost with fine-tuning.


Auto generated documentation

<!-- toc -->
* [GPT3 Powered CLI](#gpt3-powered-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @abhagsain/ai-cli
$ ai COMMAND
running command...
$ ai (--version)
@abhagsain/ai-cli/1.1.2 darwin-x64 node-v14.18.3
$ ai --help [COMMAND]
USAGE
  $ ai COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`ai ask [question]`](#ai-ask-question)
* [`ai auth`](#ai-auth)
* [`ai help [COMMAND]`](#ai-help-command)

## `ai ask [question]`

Ask question to GPT3 from your terminal

```
USAGE
  $ ai ask [question]

ARGUMENTS
  QUESTION  Your question

DESCRIPTION
  Ask question to GPT3 from your terminal

EXAMPLES
  $ ai ask "Check running process on port 3000"
```

_See code: [dist/commands/ask.ts](https://github.com/abhagsain/ai-cli/blob/v1.1.2/dist/commands/ask.ts)_

## `ai auth`

Update existing or add new OpenAI API Key

```
USAGE
  $ ai auth

DESCRIPTION
  Update existing or add new OpenAI API Key

EXAMPLES
  $ ai auth (Follow the prompt)
```

_See code: [dist/commands/auth.ts](https://github.com/abhagsain/ai-cli/blob/v1.1.2/dist/commands/auth.ts)_

## `ai help [COMMAND]`

Display help for ai.

```
USAGE
  $ ai help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ai.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.17/src/commands/help.ts)_
<!-- commandsstop -->
