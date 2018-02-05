import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import NoticeDetailDisplay from "../../components/NoticeDetailDisplay/NoticeDetailDisplay";
import {Spin, Anchor, message, Row, Col} from "antd";
import {post} from "../../fetch/post";
import './style.less'
const {Link} = Anchor;

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
                <Row>
                    <Col span={20}>
                        <NoticeDetailDisplay data={data}/>
                    </Col>
                    <Col span={1}/>
                    <Col span={3}>
                        <Anchor className='notice-anchor'>
                            {data.map(item => <Link key={item._id} href={`/#notice/#${item._id}`} title={item.title}/>)}
                        </Anchor>
                    </Col>
                </Row>

            </Spin>
        )
    }
}

