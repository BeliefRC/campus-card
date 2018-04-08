import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import RouterMap from './router/RouterMap'
import './static/css/common.less';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore'

{// 各种浏览器兼容
    let visibilityChange;
    if (typeof document.hidden !== "undefined") {
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        visibilityChange = "webkitvisibilitychange";
    }
    document.addEventListener(visibilityChange, function () {
        //document.title = document[state];
        if (document.hidden) {
            //用户没有在看本页面，
            document.title = '跑哪去了，快来看我';
        } else {
            document.title = '校园一卡通平台';
        }
    }, false);
}

const store = configureStore();
ReactDOM.render(<Provider store={store}>
        <RouterMap history={hashHistory}/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
