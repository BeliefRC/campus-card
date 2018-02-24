import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Timeline } from 'antd';
import moment from 'moment'
import './style.less'
export default class FileList extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }

    render() {
        let {data}=this.props;
        return (
            <Timeline className='file-list'>
                {data.map(file=><Timeline.Item key={file._id}>
                    <p>{file.originalName}</p>
                    <p>已下载{file.downloadNum}次</p>
                    <p>发布于{moment(file.meta.createAt).format('YYYY-MM-DD HH:mm')}</p>
                </Timeline.Item>)}
            </Timeline>
        )
    }
}

