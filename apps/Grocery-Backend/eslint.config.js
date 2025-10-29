import { config } from "@grocery-repo/eslint-config";
import nextPlugin from "@next/eslint-plugin-next";

/** @type {import("eslint").Linter.Config[]} */
export default [
...config,
nextPlugin.configs["core-web-vitals"],
{
ignores: [".next/**"]
}
];
