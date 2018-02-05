import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from "redux";
import * as menuKeyActionsFromOtherFile from "../../actions/menuKey";
import {connect} from "react-redux";
import NoticeListTable from '../../components/NoticeListTable/NoticeListTable'
import {Spin, message} from 'antd'
import {post} from '../../fetch/post'

@connect(mapStateToProps, mapDispatchToProps)
export default class NoticeListPage extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {data: [], loading: false};
    }

    componentWillMount() {
        this.getNoticeList();
    }

    getNoticeList() {
        this.setState({loading: true});
        post('/notice/list', {listTable: true}, (data) => {
            this.setState({loading: false});
            if (data.success) {
                this.setState({data: data.backData});
            } else {
                message.error(data.msg)
            }
        }, () => {
            this.setState({loading: false});
        })
    }

    delNotice(_id) {
        post(`/notice/delete`, {_id}, (data) => {
            if (data.success) {
                message.success(data.msg);
                this.getNoticeList();
            } else {
                message.error(data.msg)
            }
        })
    }

    isShowHandler(_id) {
        post('/notice/show', {_id}, (data) => {
            this.setState({loading: false});
            if (data.success) {
                this.getNoticeList();
                message.success(data.msg)

            } else {
                message.error(data.msg)
            }
        }, () => {
            this.setState({loading: false});
        })
    }

    render() {
        let {data, loading} = this.state;
        return (
            <Spin spinning={loading}>
                <NoticeListTable data={data} delNotice={this.delNotice.bind(this)} menuKey={this.props.menuKey}
                                 menuKeyActions={this.props.menuKeyActions}
                                 isShowHandler={this.isShowHandler.bind(this)}/>
            </Spin>
        )
    }
}

function mapStateToProps(state) {
    return {
        menuKey: state.menuKey,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        menuKeyActions: bindActionCreators(menuKeyActionsFromOtherFile, dispatch),
    }
}

