import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  'badge',
  'blinking-dot',
  'dot',
  'emoji',
  'index',
  'status',
  'video',
].map(item => {
  return {
    input: `./examples/src/${item}.ts`,
    output: {
      format: 'iife',
      file: `./examples/dist/${item}.js`
    },
    plugins: [
      typescript(),
      nodeResolve(),
    ]
  }
});
