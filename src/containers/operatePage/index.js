import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Tabs, Icon, Spin, Button, message} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import * as modalVisibleActionsFromOtherFile from '../../actions/modalVisible'
import SearchByCodeInput from '../../components/SearchByCodeInput/SearchByCodeInput'
import BaseCardInfo from '../../components/CardBaseInfo/BaseCardInfo'
import FrozenState from '../../components/FrozenState/FrozenState'
import BalanceState from '../../components/BalanceState/BalanceState'
import ChangePasswordModal from '../../components/ChangePasswordModal/ChangePasswordModal'
import {get} from "../../fetch/get";
import {post} from "../../fetch/post";

const TabPane = Tabs.TabPane;
@connect(mapStateToProps, mapDispatchToProps)
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
        get('/card/detail', {code}, (data) => {
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

    //挂失解挂卡操作
    frozenOperate() {
        this.setState({loading: true});
        let code = this.state.data.code;
        post('/card/frozen', {code}, (data) => {
            this.setState({loading: false});
            if (data.success) {
                this.setState({
                    data: data.backData
                });
                message.success(data.msg)
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

    recharge(rechargeAmount, password) {
        this.setState({loading: true});
        let code = this.state.data.code;
        post('/card/recharge', {code, rechargeAmount, password},
            (data) => {
                this.setState({loading: false});
                if (data.success) {
                    message.success(data.msg);
                    this.setState({
                        data: data.backData
                    });
                } else {
                    message.error(data.msg);
                    this.setState({loading: false});
                }
            },
            () => {
                this.setState({loading: false});
            });
    }

    resetPassword() {
        this.setState({loading: true});
        let code = this.state.data.code;
        post('/admin/resetPassword', {code}, (data) => {
            this.setState({loading: false});
            if (data.success) {
                this.setState({
                    data: data.backData
                });
                message.success(data.msg)
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

    changePassword() {
        let {modalVisible, modalVisibleActions} = this.props;
        modalVisible.changePasswordVisible = true;
        modalVisibleActions.update(modalVisible);
    }


    handleCLick() {
        let {userInfo} = this.props;
        if (userInfo.isAdmin) {
            this.resetPassword()
        } else {
            this.changePassword();
        }
    }

    render() {
        let {loading, data} = this.state;
        let {userInfo, modalVisible, modalVisibleActions} = this.props;
        return (
            <Spin spinning={loading}>
                {userInfo.isAdmin ? <SearchByCodeInput init={this.init.bind(this)}/> : ''}
                <Tabs defaultActiveKey="3">
                    <TabPane tab={<span><Icon type="frown-o"/>挂失卡</span>} key="1">
                        <BaseCardInfo data={data}/>
                        <FrozenState data={data} frozenOperate={this.frozenOperate.bind(this)} loading={loading}/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="reload"/>{userInfo.isAdmin ? `重置密码` : `修改密码`}</span>} key="2">
                        <BaseCardInfo data={data}/>
                        <Button style={{margin: '40px auto', display: 'block'}} type="primary" size='large'
                                disabled={!data.code}
                                onClick={this.handleCLick.bind(this)}>{userInfo.isAdmin ? `重置密码` : `修改密码`}</Button>
                    </TabPane>

                    <TabPane tab={<span><Icon type="bank"/>充值缴费</span>} key="3">
                        <BaseCardInfo data={data}/>
                        <BalanceState data={data} recharge={this.recharge.bind(this)}/>
                    </TabPane>
                </Tabs>
                <ChangePasswordModal modalVisible={modalVisible} modalVisibleActions={modalVisibleActions}/>
            </Spin>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo,
        modalVisible: state.modalVisible
    }
}

function mapDispatchToProps(dispatch) {
    return {
        modalVisibleActions: bindActionCreators(modalVisibleActionsFromOtherFile, dispatch)
    }
}

