import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Spin} from 'antd'
import * as menuKeyActionsFromOtherFile from '../../actions/menuKey'
import CardDetailInfoForm from '../../components/CardDetailInfoForm/CardDetailInfoForm'
import {get} from "../../fetch/get";

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

    render() {
        let {loading, data} = this.state;
        return (
            <Spin spinning={loading}>
                <CardDetailInfoForm type='录入' menuKey={this.props.menuKey} menuKeyActions={this.props.menuKeyActions}
                                    codeDisabled={true} showPassword={true} data={data}/>
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

