import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Calendar, Badge} from 'antd'
import Moment from 'moment'
import {post} from "../../fetch/post";
import {message} from "antd";
let _this = null;
export default class BillCalendar extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {
            pagination: {},
        };
    }

    componentWillMount() {
        _this = this;
        let {userInfo} = this.props;
        let code = userInfo.code;
        code && code !== 'admin' && this.init(code)
    }

    componentDidMount() {

    }

    onPanelChange(date) {


    }

    //初始化（获取出卡人信息）
    init(code, value) {
        this.setState({loading: true});
        post('/card/billList', {code, date: value}, (data) => {
            this.setState({loading: false});
            if (data.success) {
                delete data.backData._id;
                this.setState({
                    data: data.backData
                });
            } else {
                this.setState({
                    data: {}
                });
                message.error(data.msg)
            }
        }, () => {
            this.setState({loading: false});
        });
    }

    render() {
        return (
            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender}
                      onPanelChange={this.onPanelChange.bind(this)}/>
        )
    }
}

function getListData(value) {
    let bills = _this.state.data ? _this.state.data.bills : null;
    let listData, income = 0.00, outlay = 0.00;
    if (Array.isArray(bills)) {
        bills.map(bill => {
            bill.time = new Moment(bill.time);
            if (bill.time.year() === value.year() && bill.time.month() === value.month() && bill.time.date() === value.date()) {
                if (bill.type === '充值') {
                    income += bill.amount;
                } else {
                    outlay += bill.amount;
                }
            }
            return true
        });
    }
    if (outlay || income) {
        listData = [
            {type: 'error', content: `消费：${outlay.toFixed(2)}`},
            {type: 'success', content: `充值：${income.toFixed(2)}`},
        ];
    }

    return listData
}

function dateCellRender(value) {
    const listData = getListData(value);
    return (
        <ul className="events">
            {
                listData ? listData.map(item => (
                    <li style={{listStyle: 'none'}} key={item.content}>
                        <Badge status={item.type} text={item.content}/>
                    </li>
                )) : null
            }
        </ul>
    );
}

function getMonthData(value) {
    let bills = _this.state.data ? _this.state.data.bills : null;

    let listData = [], income = 0.00, outlay = 0.00;
    if (Array.isArray(bills)) {
        bills.map(bill => {
            bill.time = new Moment(bill.time);
            console.log(bill.time.month());
            if (bill.time.year() === value.year() && bill.time.month() === value.month()) {
                if (bill.type === '充值') {
                    income += bill.amount;
                } else {
                    outlay += bill.amount;
                }
            }
            return true
        });
    }
    if (outlay || income) {
        listData = [
            {type: 'error', content: `消费：${outlay.toFixed(2)}`},
            {type: 'success', content: `充值：${income.toFixed(2)}`},
        ];
    }
    console.log(listData);
    return listData
}

function monthCellRender(value) {
    const listData = getMonthData(value);
    return listData ? (
        <div className="notes-month">
            <ul className="events">
                {
                    listData ? listData.map(item => (
                        <li style={{listStyle: 'none'}} key={item.content}>
                            <Badge status={item.type} text={item.content}/>
                        </li>
                    )) : null
                }
            </ul>
        </div>
    ) : null;
}