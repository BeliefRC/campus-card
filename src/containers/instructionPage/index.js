import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Spin, message} from "antd";
import {get} from "../../fetch/get";
import './style.less'

export default class InstructionPage extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {
            loading: false,
            instruction: ''
        };
    }

    componentWillMount() {
        this.setState({loading: true});
        get('/instruction/detail', {}, (data) => {
            this.setState({loading: false});
            if (data.success) {
                this.setState({
                    instruction: data.backData.instruction
                })
            } else {
                message.error(data.msg)
            }
        }, () => {
            this.setState({loading: false});
        })
    }

    render() {
        let {loading ,instruction} = this.state;
        return (
            <Spin spinning={loading}>
                <h1 className='instruction-title'>校园卡使用说明</h1>
                <div className='bg-img clear-fix'>
                    <article className='instruction-content'>
                        {instruction}
                    </article>
                </div>
            </Spin>

        )
    }
}

