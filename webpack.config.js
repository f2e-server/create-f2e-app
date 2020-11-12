module.exports = [{
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter',
        moment: 'moment',
        antd: 'antd',
        echarts: 'echarts',
    },
    output: {
        filename: 'static/bundle.js'
    },
    node: {
        fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.[jte]sx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    entry: './src/index.tsx',
}];