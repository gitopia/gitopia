# Contribution Guidelines

## Reporting Bug or Feature Request

We recommend using Gitopia issues for bug report, feature request and feedback. However, you can ask quick questions on our official [Gitopia Discord](https://discord.gg/mVpQVW3vKE).

Before you open an issue, do a web search, and check for existing open and closed Issues to see if that bug has already been reported. If you find a relevant topic, you can comment on that issue.

Please try to be as detailed as possible. What steps will reproduce the issue? What are you looking in particular feature?

## Submitting Pull Request

### Base branch

In general, always base your work on the `master` branch.

For a bug that's not yet in `master`, find the branch that introduces the bug, and base your work on the tip of that branch.

### Do not rebase commits in your branch. 

Avoid rebasing after you open your PRs to reviews. Instead, add more commits to your PR. It's OK to do force pushes if PR was never opened for reviews before.

A reviewer likes to see a linear commit history while reviewing. If you tend to force push from an older commit, a reviewer might lose track in your recent changes and will have to start reviewing from scratch.

Don't worry about adding too many commits. The commits are squashed into a single commit while merging (if needed). Your PR title is used as the commit message.

### Describe changes

Give an explanation for the change(s) that is detailed enough so that people can judge if it is good thing to do, without reading the actual code. 

The goal of your commit message is to convey the _what_ and _why_ behind your change.

### Make seperate commits

Make separate commits for logically separate changes. 

If your description starts to get too long, that's a sign that you probably need to split up your commit to finer grained pieces.

### Respect existing Code

Bug fix or feature implementation should not break existing functionalities and tests.

### Write Tests

Make sure that you have tests for the bug you are fixing. 

### Code must be well written

See [Coding Guidelines](CodingGuidelines.md).
