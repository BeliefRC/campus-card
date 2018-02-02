import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Icon} from 'antd'
import moment from 'moment'
import {Link} from 'react-router'
import listItem from '../../static/imgs/listItem.svg'
import './style.less'

export default class NoticeList extends React.Component {
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
            <ul className='notice-list'>
                {data.map(item =>
                    <li className='notice-item' key={item._id}>
                        <Link><h2 title={item.title}><img src={listItem} alt="{listItem}"/> {item.title}</h2></Link>
                        <span>{item.createPerson} 发布于 {moment(item.meta.updateAt).format('YYYY-MM-DD HH:mm')}
                             <Icon type="eye-o"/>{item.pv}次</span>
                    </li>)}
            </ul>
        )
    }
}

