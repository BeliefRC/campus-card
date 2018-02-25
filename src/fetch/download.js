import {message} from 'antd';
import * as domainConstants from './domainConstants'

export function download(url, filename, originalName) {
    let params = JSON.stringify({filename, originalName});
    fetch(`${domainConstants.DOMAIN}${url}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        credentials: 'include',
        body: params
    })
        .then(response => response.blob())
        .then(myBlob => {
            let objectUrl = URL.createObjectURL(myBlob);
            let a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display:none');
            a.setAttribute('href', objectUrl);
            a.setAttribute('download', originalName);
            a.click();
            URL.revokeObjectURL(objectUrl);
        }).catch(err => {
            console.error(err);
            message.error(err.toString());
        }
    )
}