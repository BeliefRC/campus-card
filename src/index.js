import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router'
// import {Provider} from 'react-redux'
import RouterMap from './router/RouterMap'
import './static/css/common.less';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RouterMap history={hashHistory}/>, document.getElementById('root'));
registerServiceWorker();
