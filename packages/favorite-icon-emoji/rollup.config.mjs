import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/default.ts',
    output: {
      format: 'iife',
      name: 'FaviconEmoji',
      file: './dist/index.js'
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      nodeResolve(),
    ]
  },  
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: './dist/index.common.js'
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      nodeResolve(),
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'es',
      file: './dist/index.esm.js'
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      nodeResolve(),
    ]
  }
];
