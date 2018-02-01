import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Spin, message} from 'antd'
import * as menuKeyActionsFromOtherFile from '../../actions/menuKey'
import CardDetailInfoForm from '../../components/CardDetailInfoForm/CardDetailInfoForm'
import SearchByCodeInput from '../../components/SearchByCodeInput/SearchByCodeInput'
import {get} from "../../fetch/get";

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


    render() {
        let {loading, data} = this.state;
        let {userInfo} = this.props;
        return (
            <Spin spinning={loading}>
                {userInfo.isAdmin ? <SearchByCodeInput init={this.init.bind(this)}/> : ''}
                <CardDetailInfoForm type='更新' menuKey={this.props.menuKey} menuKeyActions={this.props.menuKeyActions}
                                    codeDisabled={true} data={data} userInfo={userInfo}/>
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

