import {message} from 'antd';
import * as domainConstants from './domainConstants'

export function post(url, params, cb, errCb) {
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
    params = paramsArray.join('&');
    fetch(`${domainConstants.DOMAIN}${url}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        credentials: 'include',
        body: params
    })
        .then(res => res.json())
        .then(data => {
                if (cb) {
                    cb(data);
                }
            }
        )
        .catch(
            err => {
                console.error(err);
                message.error(err.toString());
                if (errCb) {
                    errCb(err)
                }
            }
        )
}