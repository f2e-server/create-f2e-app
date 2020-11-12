export const formatNumString = (num: number | string, fixed = 2) => {
    return (num || 0).toString().replace(new RegExp(`(\\.\\d{${fixed}}).*?$`), '$1').replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

export const querystring = {
    parse: (search: string = '') => {
        let result: {[k:string]: string} = {}
        search.replace(/([^?&]+)=([^?&]+)?/g, (__all, k, v) => {
            result[k] = v
            return __all
        })
        return result
    },
    stringify: (obj: {[k:string]: string | number}) => {
        let result = []
        Object.keys(obj).forEach(key => {
            const value = obj[key]
            if (null === value || undefined === value) {
                return
            } else {
                result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value + '').replace(/%20/g, '+')}`)
            }
        })
        return result.join('&')
    }
}