// @ts-check

/**
 * @type { import('f2e-middle-esbuild').BuildOptions }
 */
let config = {
    watches: [/\.tsx?$/],
    sourcemap: 'external',
    external: [
        'react',
        'react-dom',
        'react-router',
        'moment',
        'antd',
        'echarts',
    ],
    entryPoints: ['src/index.tsx'],
    outfile: 'static/bundle.js',
    target: 'chrome49',
    jsxFactory: 'React.createElement',
    bundle: true,
    format: 'iife',
    loader: {
        '.tsx': 'tsx',
        '.ts': 'ts'
    },
    tsconfig: './tsconfig.json',
};

module.exports = config