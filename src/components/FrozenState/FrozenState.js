import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Switch} from 'antd'
import './style.less'

export default class FrozenState extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }

    handleChange() {
        this.props.frozenOperate();
    }

    render() {
        let {data, loading} = this.props;
        return (
            <div className='frozen-state'>
                {data.code ?
                    <Switch checkedChildren="已挂失" unCheckedChildren="未挂失" checked={data.isFrozen}
                            loading={loading} onChange={this.handleChange.bind(this)}/> : ''}

            </div>
        )
    }
}

