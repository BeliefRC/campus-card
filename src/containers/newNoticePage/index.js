import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Spin, message} from 'antd'
import * as menuKeyActionsFromOtherFile from '../../actions/menuKey'
import NoticeDetailInfoForm from '../../components/NoticeDetailInfoForm/NoticeDetailInfoForm'
// import SearchNoticeInput from '../../components/SearchNoticeInput/SearchNoticeInput'
import {get} from "../../fetch/get";
import {post} from "../../fetch/post";
import selectedKeyUntil from "../../until/selectedKeyUntil";

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
        get('/notice/detail', {code}, (data) => {
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

    newNotice(values) {
        post('/notice/new', values, (data) => {
                this.setState({loading: false});
                if (data.success) {
                    let {menuKey, menuKeyActions} = this.props;
                        selectedKeyUntil.update(menuKey, menuKeyActions, '/admin/noticeList');
                    message.success(data.msg)
                } else {
                    message.error(data.msg);
                    this.setState({loading: false});
                }
            },
            () => {
                this.setState({loading: false});
            });
    }


    render() {
        let {loading, data} = this.state;
        let {userInfo} = this.props;
        return (
            <Spin spinning={loading}>
                <NoticeDetailInfoForm menuKey={this.props.menuKey} menuKeyActions={this.props.menuKeyActions}
                                      data={data} userInfo={userInfo} newNotice={this.newNotice.bind(this)}/>
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

