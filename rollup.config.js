import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import VuePlugin from "rollup-plugin-vue";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import url from "postcss-url";

export default {
    input: "src/components/SlidingMeters.vue",
    output: {
        format: "esm",
        file: "dist/index.esm.js",
    },
    external: ["vue"],
    plugins: [
        terser(),
        nodeResolve(),
        VuePlugin({
            target: "browser",
        }),
        typescript(),
        postcss({
            plugins: [
                url({
                    url: "inline",
                    maxSize: 100,
                }),
            ],
        }),
    ],
};
