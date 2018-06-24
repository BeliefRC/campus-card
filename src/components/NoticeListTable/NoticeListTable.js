import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import moment from 'moment'
import {Table, Menu, Dropdown, Icon, Popconfirm} from 'antd';
import selectedKeyUntil from "../../until/selectedKeyUntil";
// import {hashHistory} from 'react-router'

export default class NoticeListTable extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {
            pagination: {},
        };
    }

    //渲染行操作按钮
    renderOperate(text, record, index) {
        return <Dropdown
            overlay={<Menu onClick={this.handleOperate.bind(this, text, record, index)}>
                <Menu.Item key='delete'>
                    <Popconfirm title={`确定删除《${record.title}》吗?`}
                                onConfirm={this.confirm.bind(this, text, record, index)}
                                onCancel={this.cancel} okText="Yes" cancelText="No">
                        <Icon type="delete"/> 删除
                    </Popconfirm>
                </Menu.Item>
                <Menu.Item key='update'>
                    <Icon type="edit"/> 编辑
                </Menu.Item>
                <Menu.Item key='show'>
                    <Icon type="eye"/> {record.isShow ? '取消显示' : '显示'}
                </Menu.Item>
            </Menu>}>
                <span style={{color: '#1890FF', cursor: 'pointer'}}>
                    操作 <Icon type="down"/>
                </span>
        </Dropdown>
    }

    //表格分页
    handleTableChange = (pagination, filters, sorter) => {

    };

    //行操作按钮绑定事件
    handleOperate(text, record, index, e) {
        switch (e.key) {
            case'update':
                this.routeTo(record, `admin/newNotice`);
                break;
            case 'show':
                this.props.isShowHandler(record._id);
                break;
            default:
                break;
        }
    }

    //确定删除
    confirm(text, record, index, e) {
        this.props.delNotice(record._id);
    }

    //取消删除卡片
    cancel() {

    }

    //跳转到详情页面
    routeTo(record, url) {
        let {menuKey, menuKeyActions} = this.props;
        selectedKeyUntil.update(menuKey, menuKeyActions, url, true, {_id: record._id})
    }

    render() {
        const columns = [
            {
                title: '标题',
                dataIndex: 'title',
                width: 500,
                render: (text, record, index) => <a
                    onClick={this.routeTo.bind(this, record, `admin/newNotice`)}>{text}</a>,
            }, {
                title: '发布人',
                dataIndex: 'createPerson',
            }, {
                title: '是否显示',
                dataIndex: 'isShow',
                render: (text, record, index) => text ? '是' : '否'

            }, {
                title: '创建时间',
                dataIndex: 'meta.createAt',
                // sorter: (a, b) => a['meta.createAt'] - b['meta.createAt'],
                render: (text, record, index) => moment(text).format('YYYY-MM-DD HH:mm')

            }, {
                title: '更新时间',
                dataIndex: 'meta.updateAt',
                // sorter: (a, b) => a['meta.updateAt'] - b['meta.updateAt'],
                render: (text, record, index) => moment(text).format('YYYY-MM-DD HH:mm')
            }, {
                title: '操作',
                dataIndex: 'operate',
                fixed: 'right',
                width: 100,
                render: this.renderOperate.bind(this)
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