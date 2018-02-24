import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import App from '../containers/App'
import NotFound from '../containers/NotFound'
import CardholderListPage from '../containers/cardholderListPage'
import NoticeListPage from '../containers/noticeListPage'
import BillListPage from '../containers/billListPage'
import cardholderDetailPage from '../containers/cardholderDetailPage'
import OperatePage from '../containers/operatePage'
import NewCardPage from '../containers/newCardPage'
import newNoticePage from '../containers/newNoticePage'
import EditInstruction from '../containers/editInstruction'
import ExcelManagementPage from '../containers/excelManagementPage'
import Notice from '../containers/noticePage'
import InstructionPage from '../containers/instructionPage'
import ProcessPage from '../containers/processPage'
import LostAndFoundPage from '../containers/lostAndFoundPage'
import ExcelPage from '../containers/excelPage'
import ShopPage from '../containers/shopPage'


export default class RouterMap extends React.Component {
    render() {
        return (<Router history={this.props.history}>
            <Route path='/' component={App}>
                <IndexRoute component={InstructionPage}/>Page
                <Route path='admin'>
                    <Route path='cardholderList' component={CardholderListPage}/>
                    <Route path='noticeList' component={NoticeListPage}/>
                    <Route path='billList' component={BillListPage}/>
                    <Route path='cardholderDetail' component={cardholderDetailPage}/>
                    <Route path='operate' component={OperatePage}/>
                    <Route path='newCard' component={NewCardPage}/>
                    <Route path='newNotice' component={newNoticePage}/>
                    <Route path='editInstruction' component={EditInstruction}/>
                    <Route path='excelManagement' component={ExcelManagementPage}/>
                </Route>
                <Route path='userCenter'>
                    <Route path='billList' component={BillListPage}/>
                    <Route path='operate' component={OperatePage}/>
                    <Route path='cardholderDetail' component={cardholderDetailPage}/>
                    <Route path='shopping' component={ShopPage}/>
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