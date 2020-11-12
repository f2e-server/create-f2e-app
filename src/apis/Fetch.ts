import { message } from 'antd';
import { dispatch } from '../store';

export const Fetch = async <F = any, T = any>(url: string, data?: F, init?: RequestInit, withLoading = false): Promise<T> => {
    withLoading && dispatch(state => ({ ...state, loading: state.loading + 1 }))
    return fetch(url, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        method: data ? 'POST' : 'GET',
        body: data && JSON.stringify(data),
        ...init
    }).then(async res => {
        if (res.redirected) {
            location.reload();
        } else {
            const result = await res.json()
            if (result.code === 0 && result.message) {
                message.error(result.message)
            }
            return result
        }
    }).catch(e => {
        message.error(e.toString())
    }).finally(() => {
        withLoading && dispatch(state => ({ ...state, loading: state.loading - 1 }))
    })
};

