<p align="center">
<h1 align="center"> GPT3 Powered CLI </h1>

<p align="center">
 <a href="https://oclif.io"><img src="https://img.shields.io/badge/cli-oclif-brightgreen.svg" alt="Oclif"></a>
 <a href="https://npmjs.org/package/@abhagsain/ai-cli"><img src="https://img.shields.io/npm/v/@abhagsain/ai-cli.svg" alt="npm"></a>
 <a href="https://npmjs.org/package/@abhagsain/ai-cli"><img src="https://img.shields.io/npm/dw/@abhagsain/ai-cli.svg" alt="npm"></a>
 <a href="https://news.ycombinator.com/item?id=33651326"><img src="https://img.shields.io/badge/%233-Hacker%20News%20%7C%20159-FF6600" alt="Hacker News"></a>

</p>
 



<!-- <img src="https://user-images.githubusercontent.com/36589645/202102237-6666f461-1aa8-496a-9438-de15cee1696e.gif" width="900" height="600"/> -->
![image](https://user-images.githubusercontent.com/36589645/202654014-c1884be3-76d5-4b64-81d1-e3f1169fcb46.png)




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

The current prompt length is `~800` tokens and average response length is `~40` tokens. The pricing for [`gpt-3.5-turbo`](https://openai.com/api/pricing/) is `$0.001` per `1K` input tokens and `$0.002` per `1K` output tokens which is ~`$0.0009/command`. We'll see if we can improve the response as well as reduce the per-command-cost with fine-tuning.

___

Add autocomplete by running `ai autocomplete` and follow the instructions. It's super easy.
<img src="https://user-images.githubusercontent.com/36589645/206248317-8568ffcb-bebc-43df-aa1e-acc394a86c23.gif" width="800">

__

### Liked this project? Checkout my other side project. [SlidesAI.io - AI Presentation Maker](https://slidesai.io/?ref=ai-cli)
__

Auto generated documentation

<!-- toc -->
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
@abhagsain/ai-cli/1.3.0 darwin-arm64 node-v18.0.0
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
* [`ai autocomplete [SHELL]`](#ai-autocomplete-shell)
* [`ai help [COMMAND]`](#ai-help-command)
* [`ai model`](#ai-model)
* [`ai update [CHANNEL]`](#ai-update-channel)

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

_See code: [dist/commands/ask.ts](https://github.com/abhagsain/ai-cli/blob/v1.3.0/dist/commands/ask.ts)_

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

_See code: [dist/commands/auth.ts](https://github.com/abhagsain/ai-cli/blob/v1.3.0/dist/commands/auth.ts)_

## `ai autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ ai autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ ai autocomplete

  $ ai autocomplete bash

  $ ai autocomplete zsh

  $ ai autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.3.6/src/commands/autocomplete/index.ts)_

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

## `ai model`

Change model preference (default: gpt-3.5-turbo)

```
USAGE
  $ ai model

DESCRIPTION
  Change model preference (default: gpt-3.5-turbo)

EXAMPLES
  $ ai model (Follow the prompt)
```

_See code: [dist/commands/model.ts](https://github.com/abhagsain/ai-cli/blob/v1.3.0/dist/commands/model.ts)_

## `ai update [CHANNEL]`

update the ai CLI

```
USAGE
  $ ai update [CHANNEL] [-a] [-v <value> | -i] [--force]

FLAGS
  -a, --available        Install a specific version.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
  --force                Force a re-download of the requested version.

DESCRIPTION
  update the ai CLI

EXAMPLES
  Update to the stable channel:

    $ ai update stable

  Update to a specific version:

    $ ai update --version 1.0.0

  Interactively select version:

    $ ai update --interactive

  See available versions:

    $ ai update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v3.0.7/src/commands/update.ts)_
<!-- commandsstop -->
