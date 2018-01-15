import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Layout, BackTop} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userInfoActionsFromOtherFile from '../actions/userInfo'
import * as menuKeyActionsFromOtherFile from '../actions/menuKey'
import LeftAside from "../components/LeftAside/LeftAside";
import HomeHeader from '../components/HomeHeader/HomeHeader'
import HomeFooter from "../components/HomeFooter/HomeFooter";
import HomeBreadcrumb from "../components/HomeBreadcrumb/HomeBreadcrumb";

moment.locale('zh-cn');
const {Content} = Layout;
const layoutStyle = {minHeight: '100vh'},
    ContentStyle = {margin: '0 16px'},
    ContentDivStyle = {padding: 24, background: '#fff', minHeight: 360};

// @connect(mapStateToProps, mapDispatchToProps)
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
                <LeftAside userInfo={this.props.userInfo} menuKey={this.props.menuKey}
                           menuKeyActions={this.props.menuKeyActions}/>
                <Layout>
                    <HomeHeader userInfo={this.props.userInfo}/>
                    <Content style={ContentStyle}>
                        <HomeBreadcrumb menuKey={this.props.menuKey}/>
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


function mapStateToProps(state) {
    return {
        userInfo: state.userInfo,
        menuKey: state.menuKey
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
        menuKeyActions: bindActionCreators(menuKeyActionsFromOtherFile, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)