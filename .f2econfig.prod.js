// @ts-check

/**
 * @type {import('f2e-server').F2EConfig}
 */
const config = {
    livereload: true,
    build: false,
    gzip: true,
    useLess: true,
    buildFilter: pathname => /^(asserts|css|favicon|index|static|$)/.test(pathname),
    middlewares: [
        require('./lib').default
    ],
}
module.exports = config