import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class InstructionPage extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <h1>使用说明</h1>
        )
    }
}

