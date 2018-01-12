import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Layout, BackTop} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import LeftAside from "../components/LeftAside/LeftAside";
import HomeHeader from '../components/HomeHeader/HomeHeader'
import HomeFooter from "../components/HomeFooter/HomeFooter";
import HomeBreadcrumb from "../components/HomeBreadcrumb/HomeBreadcrumb";

moment.locale('zh-cn');
const {Content} = Layout;
const layoutStyle = {minHeight: '100vh'},
    ContentStyle = {margin: '0 16px'},
    ContentDivStyle = {padding: 24, background: '#fff', minHeight: 360};

class App extends Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <Layout style={layoutStyle}>
                <LeftAside/>
                <Layout>
                    <HomeHeader/>
                    <Content style={ContentStyle}>
                        <HomeBreadcrumb path='个人中心/流水充值'/>
                        <div style={ContentDivStyle}>
                            {this.props.children}
                        </div>
                    </Content>
                    <HomeFooter content='Campus Card System &copy;2018 Created by Belief_RC'/>
                </Layout>
                <BackTop/>
            </Layout>
        );
    }
}

export default App;
