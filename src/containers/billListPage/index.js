import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Tabs, Icon, Spin, message, DatePicker, Col, Row} from 'antd'
import {connect} from 'react-redux'
import SearchByCodeInput from '../../components/SearchByCodeInput/SearchByCodeInput'
import {post} from "../../fetch/post";
import BillListTable from '../../components/BillListTable/BillListTable'
import BillCalendar from '../../components/BillCalendar/BillCalendar'

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
            loading: false,
            data: []
        };
    }

    componentDidMount() {
        let {userInfo} = this.props;
        if (userInfo.isLogin && !userInfo.isAdmin && userInfo.code) {
            this.init(userInfo.code)
        } else {
            let code = this.props.location.state ? this.props.location.state.code : null;
            if (code) {
                this.init(code)
            }
        }
    }

    //初始化（获取出卡人信息）
    init(code) {
        this.setState({loading: true});
        post('/card/billList', {code}, (data) => {
            this.setState({loading: false});
            if (data.success) {
                delete data.backData._id;
                this.setState({
                    data: data.backData.bills
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
        let {userInfo} = this.props;
        let {loading, data} = this.state;
        return (
            <Spin spinning={loading}>
                {userInfo.isAdmin ? <SearchByCodeInput init={this.init.bind(this)}/> : ''}
                <Row>
                    <Col span={3}/>
                    <RangePicker onChange={onChange}/>
                </Row>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="table"/>表格</span>} key="1">
                        <BillListTable data={data}/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="calendar"/>日历</span>} key="2">
                        <BillCalendar/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="line-chart"/>数据分析</span>} key="3">
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

function onChange(date, dateString) {
    console.log(date, dateString);
}

