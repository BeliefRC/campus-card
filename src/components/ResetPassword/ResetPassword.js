import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Button} from 'antd';

export default class ResetPassword extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }


    render() {
        // let {data} = this.props;
        return (
            <Button>重置密码</Button>
        )
    }
}

