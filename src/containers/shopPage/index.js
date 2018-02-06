import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Spin, message} from 'antd'
import GoodList from '../../components/GoodList/GoodList'
import goodsData from '../../viewDatas/goods'
import {post} from '../../fetch/post'

export default class ShopPage extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {loading: false};
    }

    shopping(good) {
        post('/card/shop', good, (data) => {
            this.setState({loading: false});
            if (data.success) {
                message.success(data.msg)
            } else {
                message.error(data.msg)
            }
        }, () => {
            this.setState({loading: false});
        });
    }

    render() {
        let {loading} = this.state;
        return (
            <Spin spinning={loading}>
                <GoodList goodsData={goodsData} shopping={this.shopping.bind(this)}/>
            </Spin>
        )
    }
}

