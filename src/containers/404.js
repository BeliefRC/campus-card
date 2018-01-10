import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router'
import {Tooltip} from 'antd';
import NotFoundLogo from '../static/imgs/404.svg'

export default class NotFound extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <h1>404 Not Found Page</h1>
                <Link to='/'>
                    <Tooltip placement="bottom" title="点击图片返回首页">
                        <img src={NotFoundLogo} alt="NotFoundLogo"/>
                    </Tooltip>
                </Link>
            </div>
        )
    }
}
