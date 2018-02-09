import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Spin} from 'antd'
import processDetailData from '../../viewDatas/processDetail'

export default class ProcessPage extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {loading: false};
    }

    render() {
        let {loading} = this.state;
        return (
            <Spin spinning={loading}>
                <h1 className='instruction-title'>办卡流程</h1>
                <div className='bg-img clear-fix'>
                    <article className='instruction-content'>
                        {processDetailData.content}
                    </article>
                </div>
            </Spin>
        )
    }
}

