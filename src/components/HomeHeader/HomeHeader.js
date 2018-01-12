import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Layout,Avatar} from 'antd'
const {Header} = Layout;

export default class HomeHeader extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {

            userInfo: {
                username: '请登录',
                isLogin: true,
                isAdmin: true
            },
        };
    }

    render() {
        return (
            <Header style={{background: '#fff', padding: 0}}>
                <Avatar icon="user"/>
            </Header>
        )
    }
}

