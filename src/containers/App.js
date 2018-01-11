import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Layout, Menu, Breadcrumb, Icon, Avatar, BackTop} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import menuData from '../viewDatas/menu'
import logo from '../static/imgs/logo.svg'
import './App.less'
// import userInfo from "../reducers/userInfo";

moment.locale('zh-cn');
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {
            collapsed: false,
            userInfo: {
                username: '请登录',
                isLogin: true,
                isAdmin: false
            }
        };
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        let {userInfo} = this.state;
        let LeftNav = menuData.map(item => {
            if (item.children && item.children.length) {
                if (item.key === 'admin') {
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
                } else {
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
                }
            } else {
                return (<Menu.Item key={item.key}>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                </Menu.Item>)
            }

        });

        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo">
                        <img src={logo} alt="logo"/>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['notice']} defaultOpenKeys={['admin', 'userCenter']}
                          mode="inline">
                        {LeftNav}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Avatar icon="user"/>
                    </Header>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Campus Card System &copy;2018 Created by Belief_RC
                    </Footer>
                </Layout>
                <BackTop/>
            </Layout>
        );
    }
}

export default App;
