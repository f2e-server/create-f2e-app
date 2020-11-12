
export const server_time = () => new EventSource('/sse/runtime/server_time')
export const mem_ratio = () => new EventSource('/sse/runtime/mem_ratio')