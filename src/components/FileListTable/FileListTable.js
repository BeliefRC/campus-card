import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import moment from 'moment'
import {Table, Icon, Popconfirm} from 'antd';

export default class FileListTable extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {
            pagination: {},
        };
    }

    //表格分页
    handleTableChange = (pagination, filters, sorter) => {

    };


    //确定删除
    confirm(text, record, index, e) {
        this.props.delFile(record._id);
    }

    //取消删除卡片
    cancel() {

    }

    render() {
        const columns = [
            {
                title: '文件名',
                dataIndex: 'originalName',
            }, {
                title: '时间戳名',
                dataIndex: 'filename',
            }, {
                title: '创建时间',
                dataIndex: 'meta.createAt',
                sorter: (a, b) => a['meta.createAt'] - b['meta.createAt'],
                render: (text, record, index) => moment(text).format('YYYY-MM-DD HH:mm')

            }, {
                title: '更新时间',
                dataIndex: 'meta.updateAt',
                sorter: (a, b) => a['meta.updateAt'] - b['meta.updateAt'],
                render: (text, record, index) => moment(text).format('YYYY-MM-DD HH:mm')
            }, {
                title: '操作',
                dataIndex: 'operate',
                fixed: 'right',
                width: 100,
                render: (text, record, index) => <Popconfirm title={`确定删除《${record.originalName}》吗?`}
                                                             onConfirm={this.confirm.bind(this, text, record, index)}
                                                             onCancel={this.cancel} okText="Yes" cancelText="No">
                    <span style={{'color': '#1890ff', 'cursor': 'pointer'}}><Icon type="delete"/> 删除</span>
                </Popconfirm>
            }
        ];
        return <Table columns={columns}
                      rowKey={record => record._id}
                      dataSource={this.props.data}
            // pagination={this.state.pagination}
                      onChange={this.handleTableChange}
                      className='movie-table-list'
        />
    }
}