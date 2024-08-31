import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/default.ts',
    output: {
      format: 'iife',
      name: 'TimeoutWorker',
      file: './dist/index.js',
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
    ]
  },
  {
    input: 'src/worker.ts',
    output: {
      format: 'iife',
      file: './dist/worker.js',
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ]
  },  
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: './dist/index.common.js',
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'es',
      file: './dist/index.esm.js',
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
    ]
  }
];
