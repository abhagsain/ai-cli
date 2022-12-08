<p align="center">
<h1 align="center"> GPT3 Powered CLI </h1>

<p align="center">
 <a href="https://oclif.io"><img src="https://img.shields.io/badge/cli-oclif-brightgreen.svg" alt="Oclif"></a>
 <a href="https://npmjs.org/package/@abhagsain/ai-cli"><img src="https://img.shields.io/npm/v/@abhagsain/ai-cli.svg" alt="npm"></a>
 <a href="https://npmjs.org/package/@abhagsain/ai-cli"><img src="https://img.shields.io/npm/dw/@abhagsain/ai-cli.svg" alt="npm"></a>
 <a href="https://news.ycombinator.com/item?id=33651326"><img src="https://img.shields.io/badge/%233-Hacker%20News%20%7C%20159-FF6600" alt="Hacker News"></a>
 <a href="https://www.llmhub.com/abhagsain/ai-cli"><img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fapi.llmhub.com%2Fshields%2Fstars%2Fabhagsain%2Fai-cli" alt="LLMHub"></a>
</p>
 



<!-- <img src="https://user-images.githubusercontent.com/36589645/202102237-6666f461-1aa8-496a-9438-de15cee1696e.gif" width="900" height="600"/> -->
![image](https://user-images.githubusercontent.com/36589645/202654014-c1884be3-76d5-4b64-81d1-e3f1169fcb46.png)




### Installation

You'd need to install it globally, and then authenticate against [LLMHub](https://www.llmhub.com) (which is included with `ai-cli`).

```
npm i @abhagsain/ai-cli -g
# llmhub was globally installed as part of previous command.
llmhub auth
```

Usage

```
$ ai ask "Check process running on port"
```

Pricing

Due to [LLMHub](https://www.llmhub.com), `ai-cli` is free-to-use. [LLMHub](https://www.llmhub.com) has a "fair usage limit" of ~250 commands per month. Beyond that, charges will be similar to that of the underlying provider:

The current prompt length is `~840` tokens and the pricing for [`text-davinci-002`](https://openai.com/api/pricing/) is `$0.02` for `1K` tokens which is ~`$0.017/command`. We'll see if we can improve the response as well as reduce the per-command-cost with fine-tuning.

___

Add autocomplete by running `ai autocomplete` and follow the instructions. It's super easy.
<img src="https://user-images.githubusercontent.com/36589645/206248317-8568ffcb-bebc-43df-aa1e-acc394a86c23.gif" width="800">


Auto generated documentation

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @abhagsain/ai-cli
$ llmhub auth
$ ai COMMAND
running command...
$ ai (--version)
@abhagsain/ai-cli/1.2.2 darwin-x64 node-v16.15.0
$ ai --help [COMMAND]
USAGE
  $ ai COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`ai ask [question]`](#ai-ask-question)
* [`ai autocomplete [SHELL]`](#ai-autocomplete-shell)
* [`ai help [COMMAND]`](#ai-help-command)
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

_See code: [dist/commands/ask.ts](https://github.com/abhagsain/ai-cli/blob/v1.2.2/dist/commands/ask.ts)_

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
