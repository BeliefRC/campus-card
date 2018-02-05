import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Collapse} from 'antd';
import moment from 'moment'
import listItem from '../../static/imgs/listItem.svg'
import './style.less'

const Panel = Collapse.Panel;

export default class NoticeDetailDisplay extends React.Component {
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
            <Collapse className='home-notice-detail' bordered={false}>
                {data.map(item =>
                    <Panel id={item._id} key={item._id}
                           header={<div className='notice-item'><span className='notice-title'>
                        <img src={listItem} alt="{listItem}"/>{item.title}</span>
                               <span
                                   className='notice-extra'>{item.createPerson} 发布于 {moment(item.meta.updateAt).format('YYYY-MM-DD HH:mm')}
                            </span></div>}>
                        <div className='notice-detail-content'>{item.content}</div>
                    </Panel>)}
            </Collapse>
        )
    }
}

