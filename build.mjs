import esbuild from "esbuild";
import {polyfillNode} from "esbuild-plugin-polyfill-node";

const sharedConfig = {
    entryPoints: ["index.ts"],
    bundle: true,
    minify: true
};
const context = await esbuild.context({
    ...sharedConfig,
    platform: 'browser',
    outfile: "bundle.js",
    plugins: [
        polyfillNode({}),
    ],
});
await context.watch();