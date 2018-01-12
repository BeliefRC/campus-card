import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Layout} from 'antd'

const {Footer} = Layout;

export default class HomeFooter extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <Footer style={{textAlign: 'center'}}>
                {this.props.content}
            </Footer>
        )
    }
}

