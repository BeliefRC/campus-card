import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Row, Col} from 'antd'

export default class Home extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }


    render() {
        return (
            <Row style={{marginTop:'20px'}}>
                <Col span={2}/>
                <Col span={20}>
                    home
                </Col>
                <Col span={2}/>
            </Row>
        )
    }
}

