import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const utils = require('./utils')

/**
 * @type {import('rollup').OutputOptions[]}
 */
const output = []

/**
 * @type {import('rollup').Plugin[]}
 */
const plugins = [
  typescript({
    tsconfig: path.resolve('./tsconfig.json')
  }),
  babel({
    sourceMaps: true,
    extensions: ['.ts']
  })
]

switch (process.env.NODE_ENV) {
  case 'node':
    output.push({
      file: utils.fileName('./lib/main.esm'),
      format: 'es'
    })
    break
  default:
    output.push({
      file: utils.fileName('./lib/main'),
      format: 'umd',
      name: 'LoadScript'
    })
    plugins.push(terser())
    break
}

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: path.resolve('./src/main.ts'),
  cache: true,
  output,
  plugins
}

export default config
