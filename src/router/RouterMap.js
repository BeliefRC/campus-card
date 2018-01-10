import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import Home from '../containers/Home/Home'
import App from '../containers/App'
import NotFound from '../containers/404'

export default class RouterMap extends React.Component {
    render() {
        return (<Router history={this.props.history}>
            <Route path='/' component={App}>
                <IndexRoute component={Home}/>
                <Route path='*' component={NotFound}/>
            </Route>
        </Router>)
    }
}