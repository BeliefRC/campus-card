import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import moment from 'moment'
import {Table, Menu, Dropdown, Icon, Popconfirm, message, Avatar} from 'antd';
import {get} from "../../fetch/get";
import {hashHistory, Link} from 'react-router'

export default class CardListTable extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {
            data: [],
            pagination: {},
            loading: false,
        };
    }

    componentDidMount() {
        //请求表格数据
        this.getDataSource()
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

            </Menu>}>
                <span style={{color: '#1890FF', cursor: 'pointer'}}>
                    操作 <Icon type="down"/>
                </span>
        </Dropdown>
    }

    //表格分页
    handleTableChange = (pagination, filters, sorter) => {

    };

    //获取表格数据
    getDataSource() {
        this.setState({
            loading: true
        });
        let _this = this;
        get('/card/list', {}, (data) => {
            if (data.success) {
                _this.setState({
                    data: data.backData
                })
            } else {
                message.error(data.msg)
            }
            _this.setState({
                loading: false
            });
        }, () => {
            message.error('获取电影列表失败');
            _this.setState({
                loading: false
            });
        })
    }

    //行操作按钮绑定事件
    handleOperate(text, record, index, e) {
        switch (e.key) {
            case'update':
                hashHistory.push(`admin/movie/detail/${record._id}`);
                break;
            default:
                break;
        }
    }

    //确定删除
    confirm(text, record, index, e) {
        console.log(arguments);
        get(`/admin/movie/delete`, {_id: record._id}, (data) => {
            if (data.success) {
                message.success(data.msg);
                this.getDataSource();
            } else {
                message.error(data.msg)
            }
        })
    }

    //取消删除电影
    cancel() {

    }

    render() {
        const columns = [
            {
                title: '持卡人姓名',
                dataIndex: 'cardholder',
                fixed: 'left',
                width: 130,
                render: (text, record, index) => <Link to={`/movie/${record._id}`}>{text}</Link>,
            }, {
                title: '卡号',
                dataIndex: 'code',
                sorter: (a, b) => a.code - b.code,
                fixed: 'left',
                width: 100,
            }, {
                title: '头像',
                dataIndex: 'photo',
                width: 100,
                render: (text, record, index) => text ? <Avatar src={text}/> : <Avatar icon="user"
                                                                                       style={{backgroundColor: '#1890FF'}}/>,
            }, {
                title: '性别',
                dataIndex: 'sex',
                filters: [
                    {text: '男', value: '男'},
                    {text: '女', value: '女'},
                ],
                onFilter: (value, record) => record.sex.includes(value),
                width: 100,
            }, {
                title: '卡类别',
                dataIndex: 'type',
                filters: [
                    {text: '临时卡', value: '临时卡'},
                    {text: '学生卡', value: '学生卡'},
                    {text: '教师卡', value: '教师卡'}
                ],
                onFilter: (value, record) => record.type.includes(value),
                width: 100,
            }, {
                title: '余额',
                dataIndex: 'balance',
                width: 150,
                render: (text, record, index) => text.toFixed(2)

            }, {
                title: '是否挂失',
                dataIndex: 'isFrozen',
                width: 100,
                render: (text, record, index) => text ? '是' : '否'

            }, {
                title: '是否丢失',
                dataIndex: 'isLost',
                width: 100,
                render: (text, record, index) => text ? '是' : '否'

            }, {
                title: '创建时间',
                dataIndex: 'meta.createAt',
                width: 150,
                sorter: (a, b) => a['meta.createAt'] - b['meta.createAt'],
                render: (text, record, index) => moment(text).format('YYYY-MM-DD HH:mm')

            }, {
                title: '更新时间',
                dataIndex: 'meta.updateAt',
                width: 150,
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
                      dataSource={this.state.data}
            // pagination={this.state.pagination}
                      loading={this.state.loading}
                      onChange={this.handleTableChange}
                      scroll={{x: 1400}}
                      className='movie-table-list'
        />
    }
}