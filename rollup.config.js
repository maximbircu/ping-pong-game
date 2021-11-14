import scss from 'rollup-plugin-scss'

export default {
    input: 'src/main.js',
    output: {
        file: 'dest/main.bundle.js',
        format: 'iife',
    },
    plugins: [
        scss({
            output: 'dest/css/main.bundle.css',
            failOnError: true,
            watch: 'styles',
        }),
    ],
}
