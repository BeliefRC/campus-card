import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router'
import {Layout, Menu, Icon} from 'antd'
import menuData from '../../viewDatas/menu'
import logo from '../../static/imgs/logo.svg'
import './style.less'

const SubMenu = Menu.SubMenu;
const {Sider} = Layout;


export default class LeftAside extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {
            userInfo: {
                username: '请登录',
                isLogin: true,
                isAdmin: false,
            },
            collapsed: false,
        };
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    onSelectHandler = (arg) => {
        // { item, key, selectedKeys }
        if (hashHistory.getCurrentLocation().pathname !== arg.key) {
            hashHistory.push(arg.key)
        }
    };

    render() {
        let {userInfo} = this.state;
        let nav = menuData.map(item => {
            if (item.children && item.children.length) {
                switch (item.key) {
                    case 'admin':
                        if (userInfo.isAdmin) {
                            return (
                                <SubMenu
                                    key={item.key}
                                    title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}
                                >
                                    {item.children.map(subItem => {
                                        return (
                                            <Menu.Item key={subItem.key}>{subItem.title}</Menu.Item>
                                        );
                                    })}
                                </SubMenu>
                            )
                        } else {
                            return true
                        }
                    case 'userCenter':
                        if (!userInfo.isAdmin) {
                            return (
                                <SubMenu
                                    key={item.key}
                                    title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}
                                >
                                    {item.children.map(subItem => {
                                        return (
                                            <Menu.Item key={subItem.key}>{subItem.title}</Menu.Item>
                                        );
                                    })}
                                </SubMenu>
                            )
                        } else {
                            return true
                        }
                    default:
                        return true;
                }
            } else {
                return (<Menu.Item key={item.key}>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                </Menu.Item>)
            }
        });
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
                <Menu theme="dark" defaultOpenKeys={['admin', 'userCenter']}
                      defaultSelectedKeys={['/']}
                      mode="inline" onSelect={this.onSelectHandler}>
                    {nav}
                </Menu>
            </Sider>
        )
    }
}

