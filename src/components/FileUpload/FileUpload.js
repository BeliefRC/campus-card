import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Upload, Icon, message} from 'antd';
import * as domainConstants from "../../fetch/domainConstants";

const Dragger = Upload.Dragger;

const props = {
    name: 'file',
    multiple: true,
    withCredentials: true,
    action: `${domainConstants.DOMAIN}/file/upload`,
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} 文件上传成功.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
        }
    },
};

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
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox"/>
                </p>
                <p className="ant-upload-text">点击或拖动文件到这个区域上传</p>
                <p className="ant-upload-hint">支持单个或批量上传, 严格禁止上传公司数据或其他频段文件</p>
            </Dragger>
        )
    }
}

