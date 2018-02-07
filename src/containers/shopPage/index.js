import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Spin} from 'antd'
import GoodList from '../../components/GoodList/GoodList'
import goodsData from '../../viewDatas/goods'
import {post} from '../../fetch/post'
import {Modal} from "antd/lib/index";

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
                success(data.msg);

            } else {
                error(data.msg);
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

function error(msg) {
    Modal.error({
        title: '失败',
        content: msg,
    });
}

function success(msg) {
    Modal.success({
        title: '成功',
        content: msg,
    });
}

