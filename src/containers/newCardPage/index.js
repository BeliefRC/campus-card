import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import CardDetailInfoForm from '../../components/CardDetailInfoForm/CardDetailInfoForm'

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
           <CardDetailInfoForm/>
        )
    }
}

