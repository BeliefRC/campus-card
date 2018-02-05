import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import NoticeDetailDisplay from "../../components/NoticeDetailDisplay/NoticeDetailDisplay";
import {Spin, message} from "antd/lib/index";
import {post} from "../../fetch/post";

export default class NoticePage extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {
            data: [],
            loading: false
        };
    }

    componentWillMount() {
        this.setState({loading: true});
        post('/notice/list', {}, (data) => {
            this.setState({loading: false});
            if (data.success) {
                this.setState({data: data.backData});
            } else {
                message.error(data.msg)
            }
        }, () => {
            this.setState({loading: false});
        })

    }

    render() {
        let {loading, data} = this.state;
        return (
            <Spin spinning={loading}>
                <NoticeDetailDisplay data={data}/>
            </Spin>
        )
    }
}

