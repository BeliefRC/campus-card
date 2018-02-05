import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import App from '../containers/App'
import NotFound from '../containers/NotFound'
import CardholderListPage from '../containers/cardholderListPage'
import cardholderDetailPage from '../containers/cardholderDetailPage'
import OperatePage from '../containers/operatePage'
import NewCardPage from '../containers/newCardPage'
import newNoticePage from '../containers/newNoticePage'
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
                <IndexRoute  component={InstructionPage}/>Page
                <Route path='admin'>
                    <Route path='cardholderList' component={CardholderListPage}/>
                    <Route path='noticeList' component={NoticeListPage}/>
                    <Route path='cardholderDetail' component={cardholderDetailPage}/>
                    <Route path='operate' component={OperatePage}/>
                    <Route path='newCard' component={NewCardPage}/>
                    <Route path='newNotice' component={newNoticePage}/>
                    <Route path='billList' component={BillListPage}/>
                </Route>
                <Route path='userCenter'>
                    <Route path='billList' component={BillListPage}/>
                    <Route path='operate' component={OperatePage}/>
                    <Route path='cardholderDetail' component={cardholderDetailPage}/>
                </Route>
                <Route path='notice(/:id)' component={Notice}/>
                <Route path='process' component={ProcessPage}/>
                <Route path='lostAndFound' component={LostAndFoundPage}/>
                <Route path='excel' component={ExcelPage}/>
                <Route path='*' component={NotFound}/>
            </Route>
        </Router>)
    }
}