import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Calendar, Badge} from 'antd'
import moment from 'moment'
import {post} from "../../fetch/post";
import {message} from "antd";

export default class CardListTable extends React.Component {
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
        let {userInfo} = this.props;

    }

    onPanelChange(date) {
        console.log(date.startOf(), date.endOf());
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
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                {type: 'error', content: `消费：20.00`},
                {type: 'success', content: `充值：16.60`},
            ];
            break;
        case 10:
            listData = [
                {type: 'success', content: `充值：200.0`},
            ];
            break;
        case 15:
            listData = [
                {type: 'error', content: `消费：233.33`},

            ];
            break;
        default:
            listData = [
                {type: 'error', content: `消费：10.00`},
            ];
    }
    return listData || [];
}

function dateCellRender(value) {
    const listData = getListData(value);
    return (
        <ul className="events">
            {
                listData.map(item => (
                    <li style={{listStyle: 'none'}} key={item.content}>
                        <Badge status={item.type} text={item.content}/>
                    </li>
                ))
            }
        </ul>
    );
}

function getMonthData(value) {
    if (value.month() === 8) {
        return 1394;
    }
}

function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}