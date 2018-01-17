import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as menuKeyActionsFromOtherFile from '../../actions/menuKey'
import CardDetailInfoForm from '../../components/CardDetailInfoForm/CardDetailInfoForm'

@connect(mapStateToProps, mapDispatchToProps)
export default class NewCardPage extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <CardDetailInfoForm menuKey={this.props.menuKey}
                                menuKeyActions={this.props.menuKeyActions}/>
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

