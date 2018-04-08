import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Tabs, Icon, Spin, message, DatePicker, Row, Alert} from 'antd'
import {connect} from 'react-redux'
import moment from 'moment'
import SearchByCodeInput from '../../components/SearchByCodeInput/SearchByCodeInput'
import {post} from "../../fetch/post";
import BillListTable from '../../components/BillListTable/BillListTable'
import BillCalendar from '../../components/BillCalendar/BillCalendar'
import DataAnalysis from '../../components/DataAnalysis/DataAnalysis'

const TabPane = Tabs.TabPane;
const {RangePicker} = DatePicker;

@connect(mapStateToProps, mapDispatchToProps)
export default class BillListPage extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {
            activeKey: '1',
            loading: false,
            code: '',
            data: [],
            value: []
        };
    }

    componentWillMount() {
        this.setState({
            value: [moment().subtract(3, 'days'), moment()]
        });
        let {userInfo} = this.props;
        if (userInfo.isLogin && !userInfo.isAdmin && userInfo.code) {
            this.setState({code: userInfo.code});
        } else {
            let code = this.props.location.state ? this.props.location.state.code : null;
            if (code) {
                this.setState({code});
            }
        }
    }

    componentDidMount() {
        let {code, value, activeKey} = this.state;
        //时间不存在则不查询
        if (!code || value.length === 0 || activeKey !== '1') {
            return
        }
        this.init(code, value)
    }

    tabOnChange(key) {
        this.setState({activeKey: key})
    }

    onChange(date, dateString) {
        console.log(moment().subtract(3, 'years'));
        this.setState({value: date}, () => {
            let {code, value, activeKey} = this.state;
            //时间不存在则不查询
            if (value.length === 0 || activeKey !== '1') {
                return
            }
            console.log(value);
            this.init(code, value)
        });

    }

    disabledDate(current) {
        return current && current > moment().endOf('day');
    }


    //初始化（获取出卡人信息）
    init(code, value = this.state.value) {
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

    changeCode(code) {
        this.setState({code})
    }


    render() {
        let {userInfo} = this.props;
        let {loading, data, value, activeKey, code} = this.state;
        return (
            <Spin spinning={loading}>
                {userInfo.isAdmin ? <SearchByCodeInput init={this.init.bind(this)} code={code}
                                                       changeCode={this.changeCode.bind(this)}/> : ''}
                <Tabs activeKey={activeKey} onChange={this.tabOnChange.bind(this)}>
                    <TabPane tab={<span><Icon type="table"/>表格</span>} key="1">
                        <Row>
                            <RangePicker value={value}
                                         format="YYYY-MM-DD"
                                         onChange={this.onChange.bind(this)}
                                         disabledDate={this.disabledDate.bind(this)}
                                         ranges={{
                                             'Today': [moment(), moment()],
                                             'This Week': [moment().startOf('week'), moment()],
                                             'This Month': [moment().startOf('month'), moment()]
                                         }}/>
                        </Row>
                        <Alert style={{margin: '10px 0 10px 0'}}
                               message={`当前余额：￥${data.balance ? data.balance.toFixed(2) : 0.00}`} type="warning"
                               showIcon/>
                        <BillListTable data={data.bills}/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="calendar"/>日历</span>} key="2">
                        <BillCalendar userInfo={userInfo}/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="line-chart"/>数据分析</span>} key="3">
                        <DataAnalysis userInfo={userInfo}/>
                    </TabPane>
                </Tabs>
            </Spin>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

