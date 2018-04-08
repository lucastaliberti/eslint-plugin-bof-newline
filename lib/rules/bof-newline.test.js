"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("./bof-newline"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("bof-newline", rule, {
  valid: [
    { code: "", options: ["always"] },
    { code: "\n", options: ["always"] },
    { code: "\nvar a = 123;", options: ["always"] },
    { code: "\n\nvar a = 123;", options: ["always"] },
    { code: "\n   \nvar a = 123;", options: ["always"] },

    { code: "var a = 123;", options: ["never"] },
    { code: "var a = 123;\nvar b = 456;", options: ["never"] },
    { code: "var a = 123;\r\nvar b = 456;", options: ["never"] },

    { code: "", options: ["unix"] },
    { code: "\n", options: ["unix"] },
    { code: "\nvar a = 123;", options: ["unix"] },
    { code: "\n\nvar a = 123;", options: ["unix"] },
    { code: "\n   \nvar a = 123;", options: ["unix"] },

    { code: "", options: ["windows"] },
    { code: "\n", options: ["windows"] },
    { code: "\r\n", options: ["windows"] },
    { code: "\r\nvar a = 123;", options: ["windows"] },
    { code: "\r\n\r\nvar a = 123;", options: ["windows"] },
    { code: "\r\n   \r\nvar a = 123;", options: ["windows"] }
  ],

  invalid: [
    {
      code: "var a = 123;",
      output: "\nvar a = 123;",
      errors: [{ messageId: "missing", type: "Program" }]
    },
    {
      code: "\nvar a = 123;",
      output: "var a = 123;",
      options: ["never"],
      errors: [{ messageId: "unexpected", type: "Program" }]
    },
    {
      code: "\r\nvar a = 123;",
      output: "var a = 123;",
      options: ["never"],
      errors: [{ messageId: "unexpected", type: "Program" }]
    },
    {
      code: "\r\n\r\nvar a = 123;",
      output: "var a = 123;",
      options: ["never"],
      errors: [{ messageId: "unexpected", type: "Program" }]
    },
    {
      code: "\nvar a = 123;\nvar b = 456;",
      output: "var a = 123;\nvar b = 456;",
      options: ["never"],
      errors: [{ messageId: "unexpected", type: "Program" }]
    },
    {
      code: "\r\nvar a = 123;\r\nvar b = 456;",
      output: "var a = 123;\r\nvar b = 456;",
      options: ["never"],
      errors: [{ messageId: "unexpected", type: "Program" }]
    },
    {
      code: "\n\nvar a = 123;",
      output: "var a = 123;",
      options: ["never"],
      errors: [{ messageId: "unexpected", type: "Program" }]
    },

    {
      code: "var a = 123;",
      output: "\nvar a = 123;",
      options: ["unix"],
      errors: [{ messageId: "missing", type: "Program" }]
    },
    {
      code: "var a = 123;",
      output: "\r\nvar a = 123;",
      options: ["windows"],
      errors: [{ messageId: "missing", type: "Program" }]
    },
  ]
});
