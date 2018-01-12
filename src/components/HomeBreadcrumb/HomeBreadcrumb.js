import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router'
import {Breadcrumb} from 'antd'
import menuData from '../../viewDatas/menu'


export default class HomeBreadcrumb extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {path: ''};
    }

    componentWillMount() {
        let BreadcrumbItems = [],
            pathArr = hashHistory.getCurrentLocation().pathname.split('/').filter(item => item);


        console.log(BreadcrumbItems);

    }

    render() {
        let {path} = this.state;
        let BreadcrumbItems = path.split('/').map(item => (
            <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
        ));
        return (
            <Breadcrumb style={{margin: '16px 0'}}>
                {BreadcrumbItems}
            </Breadcrumb>
        )
    }
}

