import typescript from 'rollup-plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  plugins: [
    json(),
    typescript()
  ]
}
