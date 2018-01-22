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
        let code = this.props.location.state ? this.props.location.state.code : null;
        if (code) {
            this.init(code)
        }
    }

    init(code) {
        this.setState({loading: true});
        get('/admin/detail', {code}, (data) => {
            this.setState({loading: false});
            if (data.success) {
                delete data.backData._id;
                for (let key in data.backData) {
                    if (data.backData.hasOwnProperty(key) && key === 'isFrozen') {
                        if (data.backData[key]) {
                            data.backData[key] = '是'
                        } else {
                            data.backData[key] = '否'
                        }
                    }
                }
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
                <CardDetailInfoForm type='更新' menuKey={this.props.menuKey} menuKeyActions={this.props.menuKeyActions}
                                    codeDisabled={true} data={data}/>
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

