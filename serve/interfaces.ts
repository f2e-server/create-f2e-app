import { IncomingMessage, ServerResponse } from 'http'

/**
 * 系统支持的主题类型
 */
export type ThemeType = 'default' | 'dark';
export const ThemeMap = new Map<ThemeType, string>([
    ['default', '默认'],
    ['dark', '暗色'],
])

/**
 * 服务端统一接口定义
 */
export interface RequestWith<T = any> extends IncomingMessage {
    /** POST 请求JSON对象 */
    body?: T,
    /** GET 请求参数 */
    data?: T,
}
export interface FetchResult<T = any> {
    success: boolean
    error?: string
    data?: T
}
export interface FetchApi<T = any, F = any> {
    (req?: RequestWith<T>, resp?: ServerResponse): Promise<FetchResult<F>>
}