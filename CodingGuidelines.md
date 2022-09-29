# Coding Guidelines

- We use tabs to indent, and interpret tabs as 4 spaces.
- Variables have to be declared at the beginning of the block, before the first statement.
- Variables name should follow Camel casing.
- Make your code readable and sensible. You may put comments if needed.
- Code should obey `gofmt` must not consists of any `go lint` warning.
- Multi-line comments include their delimiters on separate lines from
   the text.  E.g.
  ```
	/*
	 * A very long
	 * multi-line comment.
	 */
  ```
- Do not end error messages with a full stop. Also, do not capitalize the first word, only because it is the first word in the message.
- Avoid introducing a new dependency.

As for more concrete guidelines, just imitate the existing code (this is a good guideline, no matter which project you are contributing to). It is always preferable to match the _local_ convention. New code added to Git suite is expected to match the overall style of existing code. Modifications to existing code is expected to match the style the surrounding code already uses (even if it doesn't match the overall style of existing code).
