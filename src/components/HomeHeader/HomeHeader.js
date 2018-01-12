import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Layout, Avatar, Menu, Dropdown} from 'antd'
import title from '../../static/imgs/campusCardTitle.png'
import './style.less'

const {Header} = Layout;

export default class HomeHeader extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {
            userInfo: {
                username: 'BeliefRC',
                isLogin: false,
                isAdmin: true
            },
        };
    }

    render() {
        let {userInfo} = this.state;
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    {userInfo.isLogin ? userInfo.username : '请登录'}
                </Menu.Item>
                <Menu.Item key="1">
                    关于我们
                </Menu.Item>
                <Menu.Divider/>
                {userInfo.isLogin ? <Menu.Item key="3">退出登录</Menu.Item> : ''}
            </Menu>
        );
        return (
            <Header className='header'>
                <img className='header_title' src={title} alt="校园一卡通平台"/>
                <Dropdown overlay={menu}>
                    <Avatar className='avatar' size="large" icon="user"/>
                </Dropdown>
            </Header>
        )
    }
}

