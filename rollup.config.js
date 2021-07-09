import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble'; // Transpile/polyfill with reasonable browser support
import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/components/index.ts', // Path relative to package.json
    output: {
        name: 'VueQuickTree',
        exports: 'named',
    },
    plugins: [
        commonjs(),
        typescript({
            abortOnError: false,
            useTsconfigDeclarationDir: true,
            clean: true,
        }),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
            template: {
                isProduction: true,
            }
        }),
        buble(), // Transpile to ES5
    ],
};