// @ts-check
const { join } = require('path')
/**
 * @type {import('f2e-server').F2EConfig}
 */
const config = {
    build: true,
    useLess: true,
    buildFilter: pathname => /^(asserts|css|favicon|index|src|$)/.test(pathname),
    outputFilter: pathname => /^(asserts|css|favicon|index|static|$)/.test(pathname),
    middlewares: [
        // 对应文本支持简单ejs语法的服务端渲染，通常用来给资源链接加时间戳
        { middleware: 'template', test: /\.html?/ },
        // { middleware: 'esbuild' },
        { middleware: 'webpack' },
    ],
    output: join(__dirname, './output'),
}
module.exports = config