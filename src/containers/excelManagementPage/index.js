import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Tabs, Icon, Spin, message} from 'antd'
import FileListTable from '../../components/FileListTable/FileListTable'
import FileUpload from '../../components/FileUpload/FileUpload'
import {get} from '../../fetch/get'
import {post} from '../../fetch/post'

const TabPane = Tabs.TabPane;

export default class ExcelManagementPage extends React.Component {
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

    delFile(_id) {
        post(`/file/delete`, {_id}, (data) => {
            if (data.success) {
                message.success(data.msg);
                this.getFileList();
            } else {
                message.error(data.msg)
            }
        })
    }

    //切换面板式查询文件列表
    onChangeHandle(key) {
        if (key === '1') {
            this.getFileList();
        }
    }

    render() {
        const {loading, data} = this.state;
        return (
            <Spin spinning={loading}>
                <Tabs defaultActiveKey='1' onChange={this.onChangeHandle.bind(this)}>
                    <TabPane tab={<span><Icon type="folder"/>文件管理</span>} key="1">
                        <FileListTable data={data} delFile={this.delFile.bind(this)}/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="file-add"/>新增文件</span>} key="2">
                        <div><FileUpload/></div>
                    </TabPane>
                </Tabs>
            </Spin>
        )
    }
}
