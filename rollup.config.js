import typescript from 'rollup-plugin-typescript2';

export default {
    input: './index.ts',
    output: {
        file: './dist/form-model.esm',
        format: 'esm'
    },
    plugins: [
        typescript({ clean: true })
    ]
}