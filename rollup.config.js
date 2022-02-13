import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import ts from 'rollup-plugin-ts';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'esm',
    },
  ],
  plugins: [ts(), nodeResolve({
    preferBuiltins: true
  }), commonjs({
    ignore: [
      "url",
      "buffer",
    ]
  }), terser()],
};
