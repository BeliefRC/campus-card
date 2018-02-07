import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Spin, message} from 'antd'
import * as menuKeyActionsFromOtherFile from '../../actions/menuKey'
import NoticeDetailInfoForm from '../../components/NoticeDetailInfoForm/NoticeDetailInfoForm'
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
        let _id = this.props.location.state ? this.props.location.state._id : null;
        if (_id) {
            this.init(_id)
        }
    }

    init(_id) {
        this.setState({loading: true});
        get('/notice/detail', {_id}, (data) => {
            this.setState({loading: false});
            if (data.success) {
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
    };

    updateNotice(values) {
        post('/notice/update', values, (data) => {
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
                                      userInfo={userInfo} newNotice={this.newNotice.bind(this)}
                                      updateNotice={this.updateNotice.bind(this)} data={data}/>
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

