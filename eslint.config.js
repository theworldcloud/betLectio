import ts from "typescript-eslint";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
    ...ts.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node
            }
        }
    },
    {
        files: ["**/*.ts"],
        languageOptions: {
            parserOptions: {
                parser: ts.parser
            }
        }
    },
    {
        ignores: ["dist/*", "build/*"]
    },
    {
        plugins: {
            "@stylistic": stylistic
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "error",
            "semi": "error",
            "quotes": [ "error", "double" ],
            "no-inner-declarations": "error",
            "no-var": "error",
            "@typescript-eslint/no-inferrable-types": "error",
            "@stylistic/type-annotation-spacing": "error"
        }
    }
];