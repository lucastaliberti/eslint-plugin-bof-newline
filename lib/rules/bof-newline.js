"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "require or disallow newline at the beginning of files",
            category: "Stylistic Issues",
            recommended: false,
        },
        fixable: "whitespace",
        schema: [
            {
                enum: ["always", "never", "unix", "windows"]
            }
        ],
        messages: {
            missing: "Newline required at beginning of file but not found.",
            unexpected: "Newline not allowed at beginning of file."
        }
    },
    create(context) {

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            Program: function checkBadBOF(node) {
                const sourceCode = context.getSourceCode(),
                    src = sourceCode.getText(),
                    location = {
                        column: 0,
                        line: 1
                    },
                    LF = "\n",
                    CRLF = `\r${LF}`,
                    startsWithLF = src.startsWith(LF),
                    startsWithCRLF = src.startsWith(CRLF);
                /*
                 * Empty source is always valid: No content in file so we don't
                 * need to lint for a newline on the first line of content.
                 */
                if (!src.length) {
                    return;
                }

                let mode = context.options[0] || "always",
                    appendCRLF = false;

                if (mode === "unix") {

                    // `"unix"` should behave exactly as `"always"`
                    mode = "always";
                }
                if (mode === "windows") {

                    // `"windows"` should behave exactly as `"always"`, but append CRLF in the fixer for backwards compatibility
                    mode = "always";
                    appendCRLF = true;
                }
                if (mode === "always" && (!appendCRLF && !startsWithLF || (appendCRLF && !startsWithCRLF))) {
                    // File is not newline-started, but should be
                    context.report({
                        node,
                        loc: location,
                        messageId: "missing",
                        fix(fixer) {
                            return fixer.insertTextBefore(node, appendCRLF ? CRLF : LF);
                        }
                    });
                } else if (mode === "never" && (startsWithLF || startsWithCRLF)) {

                    // File is newline-started, but shouldn't be
                    context.report({
                        node,
                        loc: location,
                        messageId: "unexpected",
                        fix(fixer) {
                            const startEOLs = /^(?:\r?\n)+/,
                                match = startEOLs.exec(src),
                                start = match.index,
                                end = match[0].length;

                            return fixer.replaceTextRange([start, end], "");
                        }
                    });
                }
            }
        };
    }
};