import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class LostAndFoundPage extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }

    render() {
        return (
           <h1>丢卡查询，敬请期待！</h1>
        )
    }
}

