Contributing to Gitopia
=======================

Getting Started
---------------

New contributors to the project are always welcome. The best place to get started is the issues page. You can filter for issues with "good first issue" label. These issues will be lot easier and favourable if you are new to the project. You can comment on the issue which you are interested to work on and ask any doubts you have. You can start working on it once we clarify the implementation and assign the issue to you.

You can also discuss in the #💻-development channel of [Gitopia's Discord server](https://discord.gg/K3F5x2k6h8). You can see general queries regarding development and other contributor's discussions there.

[gitopia issues](https://gitopia.com/Gitopia/gitopia/issues)
[gitopia-web issues](https://gitopia.com/Gitopia/gitopia-web/issues)
[git-remote-gitopia issues](https://gitopia.com/Gitopia/git-remote-gitopia/issues)

Communication Channels
----------------------

The discussions specific to the particular issue and pull request can be discussed in the issue and pull request page on the Gitopia platform itself. Other discussions can happen over #💻-development channel of [Gitopia's Discord server](https://discord.gg/K3F5x2k6h8).

Contributor Workflow
--------------------

All contributions should happen over Pull Requests.

To contribute a patch, the workflow is as follows:

1. Fork repository ([only for the first time](https://docs.gitopia.com/fork))
2. Create topic branch

### Branch Naming Guidelines

To streamline our development process and make our version control history as readable as possible, we ask all contributors to follow these guidelines when naming their branches:

**Prefix Branch Name:** Start the branch name with a prefix that describes the type of work or the area of the project it addresses. Common prefixes include:
- `feat/` for new features or significant improvements.
- `bugfix/` for bug fixes.
- `docs/` for documentation changes.
- `refactor/` for code refactoring without changing any functionality.
- `test/` for adding or modifying tests.
- `chore/` for maintenance tasks that don't modify the source code or tests.

**Use Issue Numbers:** If your work is related to a specific issue in the project's issue tracker, include the issue number in the branch name. This creates a direct link between the branch and its corresponding issue. For example: `feat/42-add-metamask-wallet-support`.

**Short and Descriptive:** After the prefix, add a short description of the work the branch contains. Use hyphens to separate words for readability. The description should be concise but descriptive enough to give an idea of the work without needing to refer to additional resources. Example: `bugfix/27-fix-login-error`.

**Lowercase Letters Only:** Use only lowercase letters to avoid confusion and ensure consistency across different operating systems and platforms.

**Avoid Special Characters:** Stick to alphanumeric characters and hyphens. Do not use spaces, underscores, or other special characters as they may cause issues with certain command-line tools or scripts.

**Keep It Short:** Aim for a maximum of 30-40 characters (including the prefix) to keep branch names manageable and readable at a glance.

Example Branch Names:

- `feat/user-profile-edit`
- `bugfix/45-login-page-crash`
- `docs/update-installation-guide`
- `refactor/34-improve-db-query-efficiency`
- `test/add-tests-for-user-service`
- `chore/update-dependencies`

3. Commit patches
4. Create a Pull Request

For GUI-related issues or pull requests, the [gitopia-web](https://gitopia.com/Gitopia/gitopia-web) repository should be used.
For issues and pull requests related to the blockchain, the [gitopia](https://gitopia.com/Gitopia/gitopia) repository should be used.

The project coding conventions in the [CodingGuidelines](CodingGuidelines.md)
must be followed.

### Committing Patches

In general, [commits should be atomic](https://en.wikipedia.org/wiki/Atomic_commit#Atomic_commit_convention)
and diffs should be easy to read. For this reason, do not mix any formatting
fixes or refactoring with actual code changes.

Make sure each individual commit is hygienic: that it builds successfully on its
own without warnings, errors, regressions, or test failures.

Command to run all tests
```
make test
```

Commit messages should be verbose by default consisting of a short subject line
(50 chars max), a blank line and detailed explanatory text as separate
paragraph(s), unless the title alone is self-explanatory (like "Correct typo
in init.cpp") in which case a single title line is sufficient. Commit messages should be
helpful to people reading your code in the future, so explain the reasoning for
your decisions. Further explanation [here](https://chris.beams.io/posts/git-commit/).

If a particular commit references another issue, please add the reference. For
example: `refs #1234` or `fixes #4321`.

### Creating the Pull Request

The body of the pull request should contain sufficient description of *what* the
patch does, and even more importantly, *why*, with justification and reasoning.
You should include references to any discussions (for example, other issues).

### Address Feedback

At this stage, one should expect comments and review from other contributors. You can add more commits to your pull request to resolve the reviews/comments by committing them locally and pushing to your fork of the repo.

You are expected to reply to any review comments before your pull request is
merged. You may update the code or reject the feedback if you do not agree with
it, but you should express so in a reply. If there is outstanding feedback and
you are not actively working on it, your pull request may be closed.

### Squashing Commits

If your pull request contains fixup commits (commits that change the same line of code repeatedly) or too fine-grained
commits, you may be asked to [squash](https://git-scm.com/docs/git-rebase#_interactive_mode) your commits
before it will be reviewed. The basic squashing workflow is shown below.

```
git checkout your_branch_name
git rebase -i HEAD~n
# n is normally the number of commits in the pull request.
# Set commits (except the one in the first line) from 'pick' to 'squash', save and quit.
# On the next screen, edit/refine commit messages.
# Save and quit.

# Warning: Force pushing can rewrite history and potentially
# erase commits for everyone else working on the project. Use with caution and
# ensure you fully understand the consequences.
git push -f
```

Please update the resulting commit message, if needed. It should read as a
coherent message. In most cases, this means not just listing the interim
commits.

If your change contains a merge commit, the above workflow may not work and you
will need to remove the merge commit first. See the next section for details on
how to rebase.

Please refrain from creating several pull requests for the same change unless requested by the maintainer.
Use the pull request that is already open (or was created earlier) to amend
changes. This preserves the discussion and review that happened earlier for
the respective change set.

### Rebasing Changes

When a pull request conflicts with the target branch, you may be asked to rebase it on top of the current target branch.

```
git fetch gitopia://Gitopia/gitopia  # Fetch the latest upstream commit
git rebase FETCH_HEAD  # Rebuild commits on top of the new base
```

Pull Request Philosophy
-----------------------

A Pull Request should always be focused. For example, a pull request could add a
feature, fix a bug, or refactor code; but not a mixture. Please also avoid super
pull requests which attempt to do too much, are overly large, or overly complex
as this makes review difficult.

### Finding Reviewers

You can reach out to the project maintainers on #💻-development channel of [Gitopia's Discord server](https://discord.gg/K3F5x2k6h8) if no one has picked up your review.

Setting Up the Development Environment
--------------------------------------

### Dependencies

[Go 1.21+](https://golang.org/dl/)

[Ignite CLI v0.27.2](https://github.com/ignite/cli/releases/tag/v0.27.2)

> [!WARNING]
> Make sure that you install the v0.27.2 of Ignite CLI. The latest versions are not compatible with v0.47.13 of cosmos-sdk used by gitopia.

### Setup

We use Ignite CLI for configuring the local test chain. The configuration file `config.yml` is located in the root directory. You can find more details about the config file [here](https://docs.ignite.com/references/config).

You can start the node by executing the following command. Ignite will automatically build and start the node whenever any new changes are made into the code.

```
ignite chain serve
```

On successfull execution, you should see output like below.

```
❯ ignite chain serve

  ✔ Added account node3 with address gitopia1vzjwk8cd7y9scd4uj9darlusgflkr9ccgfrzzr and mnemonic:
  ✔ Added account faucet with address gitopia1hgjmjsnstdgzlfs4uxazf78se30p3xlxcetdt8 and mnemonic:
  👤 evaluator's account address: gitopia12dlfw7kqzy336j8z3qpzr3kfu8zssnccy03xqy
  👤 cosmos_rewards's account address: gitopia1e385ct9padxt2ylzen884kr79genlq8la04sy4

  🌍 Tendermint node: http://0.0.0.0:26657
  🌍 Blockchain API: http://0.0.0.0:1317
  🌍 Token faucet: http://0.0.0.0:4500
  👤 evaluator's account address: gitopia12dlfw7kqzy336j8z3qpzr3kfu8zssnccy03xqy
  ⋆ Data directory: /Users/alice/.gitopia
  ⋆ App binary: /Users/alice/go/bin/gitopiad

  Press the 'q' key to stop serve

```

And this is the command to compile protocol buffer files to Go source code when you make changes to proto files in `proto` directory. The generated Go files will be available in respective go packages (For eg., `x/gitopia/types`). This is automatically done when you use `ignite chain serve`.

```
ignite generate proto-go
```

If you need the ts files of new message types for [gitopia-js](https://gitopia.com/Gitopia/gitopia-js), then you can run the following command to generate it.

```
ignite generate ts-client
```
