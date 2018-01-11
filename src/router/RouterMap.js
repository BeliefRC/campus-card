import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import CardholderListPage from '../containers/cardholderListPage'
import BillListPage from '../containers/billListPage'
import ExcelPage from '../containers/excelPage'
import InstructionPage from '../containers/instructionPage'
import LostAndFoundPage from '../containers/lostAndFoundPage'
import Notice from '../containers/noticePage'
import NoticeListPage from '../containers/noticeListPage'
import ProcessPage from '../containers/processPage'
import App from '../containers/App'
import NotFound from '../containers/404'


export default class RouterMap extends React.Component {
    render() {
        return (<Router history={this.props.history}>
            <Route path='/' component={App}>
                <IndexRoute component={Notice}/>Page
                <Route path='admin'>
                    <Route path='cardholderList' component={CardholderListPage}/>
                    <Route path='noticeList' component={NoticeListPage}/>
                </Route>
                <Route path='userCenter'>
                    <Route path='billList' component={BillListPage}/>
                </Route>
                <Route path='instruction' component={InstructionPage}/>
                <Route path='process' component={ProcessPage}/>
                <Route path='lostAndFound' component={LostAndFoundPage}/>
                <Route path='excel' component={ExcelPage}/>
                <Route path='*' component={NotFound}/>
            </Route>
        </Router>)
    }
}