import typescript from '@rollup/plugin-typescript';

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
    input: `examples/src/${item}.ts`,
    output: {
      format: 'iife',
      file: `./dist/${item}.js`
    },
    plugins: [typescript()]
  }
});
