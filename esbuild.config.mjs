import esbuild from "esbuild";
import fs from "fs";
import process from "process";
import builtins from 'builtin-modules'

const PLUGIN_PATH_WINDOWS = "C:/Users/ian/iCloudDrive/iCloud~md~obsidian/Ian's Vault/.obsidian/plugins/custom-modals-obsidian";
const PLUGIN_PATH_MACOS = "/Users/pgm/Library/Mobile\ Documents/iCloud\~md\~obsidian/Documents/Ian\'s\ Vault/.obsidian/plugins/custom-modals-obsidian"

const banner =
`/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const prod = (process.argv[2] === 'production');

esbuild.build({
	banner: {
		js: banner,
	},
	entryPoints: ['./src/main.ts'],
	bundle: true,
	external: [
		'obsidian',
		'electron',
		'@codemirror/autocomplete',
		'@codemirror/closebrackets',
		'@codemirror/collab',
		'@codemirror/commands',
		'@codemirror/comment',
		'@codemirror/fold',
		'@codemirror/gutter',
		'@codemirror/highlight',
		'@codemirror/history',
		'@codemirror/language',
		'@codemirror/lint',
		'@codemirror/matchbrackets',
		'@codemirror/panel',
		'@codemirror/rangeset',
		'@codemirror/rectangular-selection',
		'@codemirror/search',
		'@codemirror/state',
		'@codemirror/stream-parser',
		'@codemirror/text',
		'@codemirror/tooltip',
		'@codemirror/view',
		'@lezer/common',
		'@lezer/highlight',
		'@lezer/lr',
		...builtins],
	format: 'cjs',
	watch: !prod,
	target: 'es2016',
	logLevel: "info",
	sourcemap: prod ? false : 'inline',
	treeShaking: true,
	outfile: 'main.js',
})
.then(() => {
  console.log("Built for dev testing!");
  fs.copyFileSync("./main.js", `${PLUGIN_PATH_MACOS}/main.js`);
  fs.copyFileSync("./manifest.json", `${PLUGIN_PATH_MACOS}/manifest.json`);
  process.exit();
})
.catch(() => process.exit(1));