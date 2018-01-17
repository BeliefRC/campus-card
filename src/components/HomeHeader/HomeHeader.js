import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Layout, Avatar, Menu, Dropdown,message} from 'antd'
import sessionStorage from '../../until/sessionStorage'
import LoginModal from '../LoginModal/LoginModal'
import AboutUsModal from '../AboutUsModal/AboutUsModal'
import title from '../../static/imgs/campusCardTitle.png'
import './style.less'

const {Header} = Layout;

export default class HomeHeader extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {};
    }

    //点击用户相关按钮
    static handleClick(e) {
        let {userInfo, userInfoActions, modalVisible, modalVisibleActions} = this.props;
        switch (e.key) {
            case 'login':
                if (!userInfo.isLogin) {
                    modalVisible.loginVisible = true;
                    modalVisibleActions.update(modalVisible);
                }
                break;
            case 'aboutUs':
                modalVisible.aboutUsVisible = true;
                modalVisibleActions.update(modalVisible);
                break;
            case 'logout':
                let initUserInfo = {
                    user: '',
                    isLogin: false,
                    isAdmin: false,
                    code: ''
                };
                Object.assign(userInfo, initUserInfo);
                userInfoActions.update(userInfo);
                sessionStorage.setItem('userInfo', JSON.stringify(initUserInfo));
                message.info('退出登录成功');
                break;
            default:
                break;
        }
    }

    render() {
        let {userInfo, modalVisible, userInfoActions, modalVisibleActions, menuKey, menuKeyActions} = this.props;
        const menu = (
            <Menu onClick={HomeHeader.handleClick.bind(this)}>
                <Menu.Item key="login">
                    {userInfo.isLogin ? userInfo.user : '请登录'}
                </Menu.Item>
                <Menu.Item key="aboutUs">
                    关于我们
                </Menu.Item>
                <Menu.Divider/>
                {userInfo.isLogin ? <Menu.Item key="logout">退出登录</Menu.Item> : ''}
            </Menu>
        );
        return (
            <Header className='header'>
                <img className='header_title' src={title} alt="校园一卡通平台"/>
                <Dropdown overlay={menu}>
                    <Avatar className='avatar float-right' size="large" icon="user"
                            style={userInfo.isLogin ? {backgroundColor: '#1890FF'} : {}}/>
                </Dropdown>
                <LoginModal modalVisible={modalVisible} modalVisibleActions={modalVisibleActions}
                            userInfo={userInfo} userInfoActions={userInfoActions}
                            menuKey={menuKey}
                            menuKeyActions={menuKeyActions}/>
                <AboutUsModal modalVisible={modalVisible} modalVisibleActions={modalVisibleActions}/>
            </Header>
        )
    }
}

