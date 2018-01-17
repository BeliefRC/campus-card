import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import App from '../containers/App'
import NotFound from '../containers/NotFound'
import CardholderListPage from '../containers/cardholderListPage'
import NewCardPage from '../containers/newCardPage'
import BillListPage from '../containers/billListPage'
import Notice from '../containers/noticePage'
import NoticeListPage from '../containers/noticeListPage'
import InstructionPage from '../containers/instructionPage'
import ProcessPage from '../containers/processPage'
import LostAndFoundPage from '../containers/lostAndFoundPage'
import ExcelPage from '../containers/excelPage'


export default class RouterMap extends React.Component {
    render() {
        return (<Router history={this.props.history}>
            <Route path='/' component={App}>
                <IndexRoute component={Notice}/>Page
                <Route path='admin'>
                    <Route path='cardholderList' component={CardholderListPage}/>
                    <Route path='noticeList' component={NoticeListPage}/>
                    <Route path='newCard' component={NewCardPage}/>
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