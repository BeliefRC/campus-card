import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import CardListTable from '../../components/CardListTable/CardListTable'
import {get} from "../../fetch/get";
import {Spin, message} from "antd";
import {bindActionCreators} from "redux";
import * as menuKeyActionsFromOtherFile from "../../actions/menuKey";
import {connect} from "react-redux";

@connect(mapStateToProps, mapDispatchToProps)

export default class CardholderListPage extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {
            loading: false
        };
    }

    componentWillMount() {
        this.getDataSource()
    }

    //获取表格数据
    getDataSource() {
        this.setState({
            loading: true
        });
        let _this = this;
        get('/card/list', {}, (data) => {
            if (data.success) {
                _this.setState({
                    data: data.backData
                })
            } else {
                message.error(data.msg)
            }
            _this.setState({
                loading: false
            });
        }, () => {
            message.error('获取电影列表失败');
            _this.setState({
                loading: false
            });
        })
    }

    render() {
        let {loading, data} = this.state;
        return (
            <Spin spinning={loading}>
                <CardListTable menuKey={this.props.menuKey} menuKeyActions={this.props.menuKeyActions} data={data}
                               getDataSource={this.getDataSource.bind(this)}/>
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

