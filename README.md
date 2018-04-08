eslint-plugin-bof-newline
====================
ESLint plugin to ensure that files begin with new line

## Usage

Add the config below to your `package.json` or `.eslintrc`

```json
{
    "plugins": [
        "bof-newline"
    ],
    "rules": {
        "bof-newline/bof-newline": [2, "always"]
    }
}
```

## Options

This rule has a string option:

* `"always"` (default) enforces that files begin with a newline (LF)
* `"never"` enforces that files do not begin with a newline

**Important:** If you need to enforce a specific linebreak style, use this rule in conjunction with `linebreak-style`.

## License

MIT