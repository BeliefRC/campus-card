import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Card, Avatar, Button} from 'antd'
import logo from '../../static/imgs/logo.svg'
import './style.less'

const {Meta} = Card;

export default class GoodList extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {};
    }

    handleClick(good) {
        this.props.shopping(good);
    }

    render() {
        let {goodsData} = this.props;
        return (
            <div className='good-list'>
                {goodsData.map((good, index) =>
                    <Card
                        key={`good${index}`}
                        hoverable
                        cover={<img alt="example" src={good.img}/>}
                        actions={[<Button type='primary' onClick={this.handleClick.bind(this, good)}>购买</Button>]}
                    >
                        <Meta
                            avatar={<Avatar src={logo}/>}
                            title={<h3>{good.name}</h3>}
                            description={`￥${good.price.toFixed(2)}`}
                        />
                    </Card>)}
            </div>
        )
    }
}

