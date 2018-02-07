import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Spin,message} from 'antd'
import * as menuKeyActionsFromOtherFile from '../../actions/menuKey'
import CardDetailInfoForm from '../../components/CardDetailInfoForm/CardDetailInfoForm'
import {get} from "../../fetch/get";
import selectedKeyUntil from "../../until/selectedKeyUntil";
import {post} from "../../fetch/post";

@connect(mapStateToProps, mapDispatchToProps)
export default class NewCardPage extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {
            loading: false,
            data: {
                password: '666666',
                confirm: '666666',
                code: '',
            }
        }
    }

    componentDidMount() {
        this.init()
    }

    init() {
        this.setState({loading: true});
        get('/card/getCode', {}, (data) => {
            this.setState({loading: false});
            if (data.success) {
                this.setState({
                    data: {
                        password: '666666',
                        confirm: '666666',
                        code: data.backData
                    }
                });
            }
        }, () => {
            this.setState({loading: false});
        });
    }

    //新增卡片
    handleSubmit = (values) => {
        this.setState({loading: true});
        post('/card/register', values,
            (data) => {
                this.setState({loading: false});
                if (data.success) {
                    let {menuKey, menuKeyActions, userInfo} = this.props;
                    if (userInfo.isAdmin) {
                        selectedKeyUntil.update(menuKey, menuKeyActions, '/admin/cardholderList');
                    }
                    message.success(data.msg)
                } else {
                    message.error(data.msg);
                    this.setState({loading: false});
                }
            },
            () => {
                this.setState({loading: false});
            });
    };

    render() {
        let {loading, data} = this.state;
        return (
            <Spin spinning={loading}>
                <CardDetailInfoForm type='录入' userInfo={this.props.userInfo} codeDisabled={true} showPassword={true}
                                    data={data} handleSubmit={this.handleSubmit.bind(this)}/>
            </Spin>
        )
    }
}

function mapStateToProps(state) {
    return {
        menuKey: state.menuKey,
        userInfo: state.userInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        menuKeyActions: bindActionCreators(menuKeyActionsFromOtherFile, dispatch),
    }
}

