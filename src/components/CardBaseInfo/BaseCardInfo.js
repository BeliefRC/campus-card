import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Steps, Icon, Tag} from 'antd';
import './style.less'
const Step = Steps.Step;
export default class CardBaseInfo extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }


    render() {
        let {data} = this.props;
        return (
            <Steps className='base-info'>
                <Step status="finish" title={`卡号`}
                      description={data.code ? <Tag color="purple">{data.code}</Tag> : ''}
                      icon={<Icon type="credit-card" />}/>
                <Step status="finish"
                      title={`姓名`}
                      description={data.cardholder ? <Tag color="cyan">{data.cardholder}</Tag> : ''}
                      icon={<Icon type="user"/>}/>
                <Step status="finish" title={`性别`}
                      description={data.sex ? <Tag color="orange">{data.sex}</Tag> : ''}
                      icon={<Icon type="exception" />}/>

            </Steps>
        )
    }
}

