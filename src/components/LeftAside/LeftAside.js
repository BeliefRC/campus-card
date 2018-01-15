import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router'
import {Layout, Menu, Icon} from 'antd'
import LocalStore from '../../until/localStore'
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
            collapsed: false,
        };
    }

    componentWillMount() {
        //从缓存汇中取selectedKey并设置
        let selectedKey = LocalStore.getItem('selectedKey');
        let {menuKey, menuKeyActions} = this.props;
        if (selectedKey) {
            menuKey.selectedKey = selectedKey;
            menuKeyActions.update(menuKey);
        }
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    //点击左侧菜单
    onSelectHandler = (arg) => {
        // { item, key, selectedKeys }
        let {menuKey, menuKeyActions} = this.props;
        if (hashHistory.getCurrentLocation().pathname !== arg.key) {
            //跟新redux中的状态
            menuKey.selectedKey = arg.key;
            menuKeyActions.update(menuKey);
            //跳转
            hashHistory.push(arg.key);
            //存储
            LocalStore.setItem('selectedKey', arg.key);
        }
    };


    render() {
        let {menuKey} = this.props,
            {userInfo} = this.props,
            nav = menuData.map(item => {
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
                      selectedKeys={[menuKey.selectedKey]}
                      mode="inline" onSelect={this.onSelectHandler}>
                    {nav}
                </Menu>
            </Sider>
        )
    }
}

