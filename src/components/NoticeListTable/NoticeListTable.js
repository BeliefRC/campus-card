import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import moment from 'moment'
import {Table, Menu, Dropdown, Icon, Popconfirm, message} from 'antd';
import {post} from "../../fetch/post";
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
                <Menu.Item key='update'>
                    <Icon type="edit"/> 编辑
                </Menu.Item>
                <Menu.Item key='delete'>
                    <Popconfirm title={`确定删除${record.cardholder}吗?`}
                                onConfirm={this.confirm.bind(this, text, record, index)}
                                onCancel={this.cancel} okText="Yes" cancelText="No">
                        <Icon type="delete"/> 删除
                    </Popconfirm>
                </Menu.Item>
                <Menu.Item key='operate'>
                    <Icon type="safety"/> 操作卡
                </Menu.Item>
                <Menu.Item key='billList'>
                    <Icon type="eye-o"/> 查看账单
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
                this.routeTo(record, `admin/cardholderDetail`);
                break;
            case'billList':
                this.routeTo(record, `admin/billList`);
                break;
            case'operate':
                this.routeTo(record, `admin/operate`);
                break;
            default:
                break;
        }
    }

    //确定删除
    confirm(text, record, index, e) {
        post(`/notice/delete`, {_id: record._id}, (data) => {
            if (data.success) {
                message.success(data.msg);
                this.props.getDataSource();
            } else {
                message.error(data.msg)
            }
        })
    }

    //取消删除电影
    cancel() {

    }

    //跳转到详情页面
    routeTo(record, url) {
        let {menuKey, menuKeyActions} = this.props;
        selectedKeyUntil.update(menuKey, menuKeyActions, url, true, {code: record.code})
    }

    render() {
        const columns = [
            {
                title: '标题',
                dataIndex: 'title',
                width: 300
            }, {
                title: '发布人',
                dataIndex: 'createPerson',
                sorter: (a, b) => a.code - b.code,
            }, {
                title: '是否显示',
                dataIndex: 'isShow',
                render: (text, record, index) => text ? '是' : '否'

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