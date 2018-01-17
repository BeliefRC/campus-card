import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Layout, BackTop} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userInfoActionsFromOtherFile from '../actions/userInfo'
import * as menuKeyActionsFromOtherFile from '../actions/menuKey'
import * as modalVisibleActionsFromOtherFile from '../actions/modalVisible'
import sessionStorage from '../until/sessionStorage'
import LeftAside from "../components/LeftAside/LeftAside";
import HomeHeader from '../components/HomeHeader/HomeHeader'
import HomeFooter from "../components/HomeFooter/HomeFooter";
import HomeBreadcrumb from "../components/HomeBreadcrumb/HomeBreadcrumb";

moment.locale('zh-cn');
const {Content} = Layout;
const layoutStyle = {minHeight: '100vh'},
    ContentStyle = {margin: '0 16px'},
    ContentDivStyle = {padding: 24, background: '#fff', minHeight: 360};

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {
            a:1
        };
    }

    componentDidMount() {
         // await this.setState({a:2});
        console.log(this.state.a);
        let sessionUserInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //更新userInfo
        if (sessionUserInfo) {
            let {userInfo, userInfoActions} = this.props;
            Object.assign(userInfo, sessionUserInfo);
            userInfoActions.update(userInfo);
        }
    }

    render() {
        let {children,userInfo, modalVisible, userInfoActions, modalVisibleActions, menuKey, menuKeyActions} = this.props;
        return (
            <Layout style={layoutStyle}>
                <LeftAside userInfo={userInfo} menuKey={menuKey}
                           menuKeyActions={menuKeyActions}/>
                <Layout>
                    <HomeHeader userInfo={userInfo} userInfoActions={userInfoActions}
                                modalVisible={modalVisible}
                                modalVisibleActions={modalVisibleActions} menuKey={menuKey}
                                menuKeyActions={menuKeyActions}/>
                    <Content style={ContentStyle}>
                        <HomeBreadcrumb menuKey={menuKey}/>
                        <div style={ContentDivStyle}>
                            {children}
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
        menuKey: state.menuKey,
        modalVisible: state.modalVisible
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
        menuKeyActions: bindActionCreators(menuKeyActionsFromOtherFile, dispatch),
        modalVisibleActions: bindActionCreators(modalVisibleActionsFromOtherFile, dispatch)
    }
}
