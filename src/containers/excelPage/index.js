import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {message, Spin} from "antd";
import FileList from '../../components/FileList/FileList'
import {get} from "../../fetch/get";
export default class ExcelPage extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {loading: false, data: []};
    }

    componentWillMount() {
        this.getFileList()
    }

    getFileList() {
        get('/file/fileList', {}, (data) => {
            this.setState({loading: false});
            if (data.success) {
                this.setState({
                    data: data.backData
                });
            } else {
                this.setState({
                    data: {}
                });
                message.error(data.msg)
            }
        }, () => {
            this.setState({loading: false});
        });
    }

    render() {
        const {loading, data} = this.state;

        return (
            <Spin spinning={loading}>
                    <FileList data={data} />
            </Spin>
        )
    }
}

