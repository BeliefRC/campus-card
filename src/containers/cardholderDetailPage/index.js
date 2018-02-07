import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Spin, message} from 'antd'
import * as menuKeyActionsFromOtherFile from '../../actions/menuKey'
import CardDetailInfoForm from '../../components/CardDetailInfoForm/CardDetailInfoForm'
import SearchByCodeInput from '../../components/SearchByCodeInput/SearchByCodeInput'
import {get} from "../../fetch/get";
import selectedKeyUntil from "../../until/selectedKeyUntil";
import {post} from "../../fetch/post";

@connect(mapStateToProps, mapDispatchToProps)
export default class cardholderDetailPage extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {
            loading: false,
            data: {}
        }
    }

    componentDidMount() {
        let {userInfo} = this.props;
        //用户访问此页面时，直接从session中取出code查询；管理员进入时，根据传入的code进行查询
        if (userInfo.isLogin && !userInfo.isAdmin && userInfo.code) {
            this.init(userInfo.code)
        } else {
            let code = this.props.location.state ? this.props.location.state.code : null;
            if (code) {
                this.init(code)
            }
        }
    }

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

    //修改信息
    handleSubmit = (values) => {
        this.setState({loading: true});
        post('/card/update', values,
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
        let {userInfo} = this.props;
        return (
            <Spin spinning={loading}>
                {userInfo.isAdmin ? <SearchByCodeInput init={this.init.bind(this)}/> : ''}
                <CardDetailInfoForm type='更新' codeDisabled={true} data={data} userInfo={userInfo}
                                    handleSubmit={this.handleSubmit.bind(this)}/>
            </Spin>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo,
        menuKey: state.menuKey,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        menuKeyActions: bindActionCreators(menuKeyActionsFromOtherFile, dispatch),
    }
}

