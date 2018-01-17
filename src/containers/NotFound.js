import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Tooltip} from 'antd';
import NotFoundLogo from '../static/imgs/404.svg'
import selectedKeyUntil from "../until/selectedKeyUntil";
import * as menuKeyActionsFromOtherFile from "../actions/menuKey";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

@connect(mapStateToProps, mapDispatchToProps)
export default class NotFound extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {};
    }

    handleClick() {
        let {menuKey, menuKeyActions} = this.props;
        selectedKeyUntil.update(menuKey, menuKeyActions, '/')
    }

    render() {
        return (
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <h1>404 Not Found Page</h1>

                <Tooltip placement="bottom" title="点击图片返回首页">
                    <img src={NotFoundLogo} alt="NotFoundLogo" onClick={this.handleClick.bind(this)}
                         style={{cursor: 'pointer'}}/>
                </Tooltip>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        menuKey: state.menuKey,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        menuKeyActions: bindActionCreators(menuKeyActionsFromOtherFile, dispatch),
    }
}