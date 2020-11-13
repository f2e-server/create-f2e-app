// @ts-check

/**
 * @type {import('f2e-server').F2EConfig}
 */
const config = {
    port: 18588,
    livereload: true,
    build: false,
    gzip: true,
    useLess: false,
    buildFilter: pathname => /^(asserts|css|favicon|index|static|$)/.test(pathname),
    middlewares: [
        {
            middleware: 'proxy',
            test: /^\/?raw/,
            url: 'https://raw.githubusercontent.com',
            pathname: '',
        },
        require('./lib').default,
    ],
}
module.exports = config