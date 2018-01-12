import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Breadcrumb} from 'antd'


export default class HomeBreadcrumb extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {};
    }

    static defaultProps = {
        path: '/'
    };

    render() {
        let {path} = this.props;
        let BreadcrumbItem = path.split('/').map(item => (
            <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
        ));
        return (
            <Breadcrumb style={{margin: '16px 0'}}>
                {BreadcrumbItem}
            </Breadcrumb>
        )
    }
}

