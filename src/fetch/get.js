import {message} from 'antd';
import * as domainConstants from './domainConstants'

export function get(url, params, cb, errCb) {
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
    url += url.search(/\?/) === -1 ? `?${paramsArray.join('&')}` : url += `&${paramsArray.join('&')}`;

    if (url.endsWith('?')) {
        url = url.substring(0, url.lastIndexOf('?'));
    }
    fetch(`${domainConstants.DOMAIN}${url}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
                if (cb) {
                    cb(data);
                }
            }
        ).catch(
        err => {
            console.error(err);
            message.error(err.toString());
            if (errCb) {
                errCb(err)
            }
        }
    )
}