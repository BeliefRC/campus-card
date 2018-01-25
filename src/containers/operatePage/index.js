import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Tabs, Icon, Spin, message} from 'antd'
import SearchByCodeInput from '../../components/SearchByCodeInput/SearchByCodeInput'
import BaseCardInfo from '../../components/CardBaseInfo/BaseCardInfo'
import FrozenState from '../../components/FrozenState/FrozenState'
import ResetPassword from '../../components/ResetPassword/ResetPassword'
import BalanceState from '../../components/BalanceState/BalanceState'
import {get} from "../../fetch/get";

const TabPane = Tabs.TabPane;
export default class OperatePage extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {
            loading: false,
            data: {}
        };
    }

    init(code) {
        this.setState({loading: true});
        get('/admin/detail', {code}, (data) => {
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
        let {loading, data} = this.state;
        return (
            <Spin spinning={loading}>
                <SearchByCodeInput init={this.init.bind(this)}/>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="frown-o"/>挂失卡</span>} key="1">
                        <BaseCardInfo data={data}/>
                        <FrozenState data={data}/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="reload"/>重置密码</span>} key="2">
                        <BaseCardInfo data={data}/>
                        <ResetPassword data={data}/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="bank"/>充值缴费</span>} key="3">
                        <BaseCardInfo data={data}/>
                        <BalanceState data={data}/>
                    </TabPane>
                </Tabs>
            </Spin>
        )
    }
}

