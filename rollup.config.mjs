import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/default.ts',
    output: {
      format: 'iife',
      name: 'Favicon',
      file: './dist/index.js'
    },
    plugins: [typescript({ tsconfig: './tsconfig.json' })]
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: './dist/index.common.js'
    },
    plugins: [typescript({ tsconfig: './tsconfig.json' })]
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'es',
      file: './dist/index.esm.js'
    },
    plugins: [typescript({ tsconfig: './tsconfig.json' })]
  }
];
