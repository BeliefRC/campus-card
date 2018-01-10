import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import RouterMap from './router/RouterMap'
import './static/css/common.less';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore'

const store = configureStore();
ReactDOM.render(<Provider store={store}>
        <RouterMap history={hashHistory}/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
