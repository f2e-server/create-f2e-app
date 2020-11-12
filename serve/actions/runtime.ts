import * as os from 'os'

export const server_time = () => Date.now()

export const mem_ratio = () => (os.totalmem() - os.freemem()) / os.totalmem()