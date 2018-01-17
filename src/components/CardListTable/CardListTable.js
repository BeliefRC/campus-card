import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import moment from 'moment'
import {Table, Menu, Dropdown, Icon, Popconfirm, message} from 'antd';
import {get} from "../../fetch/get";
import {hashHistory,Link} from 'react-router'

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
                    <Popconfirm title="确定删除这条电影吗?"
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
        get('/admin/movie/list', {}, (data) => {
            if (data.success) {

                //更改分类数据格式
                data.backData.map(movie => {
                    let category = [];
                    movie.category.map(item =>
                        category.push(item.name)
                    );
                    movie.category = category.toString();
                    return true
                });

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

    //确定删除电影
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
        const columns = [{
            title: '电影名称',
            dataIndex: 'title',
            sorter: (a, b) => {
                a.title.localeCompare(b.title, 'zh')
            },
            fixed: 'left',
            width: 250,
            render: (text, record, index) => <Link to={`/movie/${record._id}`}>{text}</Link>,

        }, {
            title: '导演',
            dataIndex: 'director',
            filters: [
                {text: 'Male', value: 'male'},
                {text: 'Female', value: 'female'},
            ],
            width: 150,
        }, {
            title: '国家',
            dataIndex: 'country',
            width: 100,
        }, {
            title: '语言',
            dataIndex: 'language',
            width: 100,

        }, {
            title: '上映日期',
            dataIndex: 'year',
            width: 120,
            render: (text, record, index) => moment(text).format('YYYY-MM-DD'),
            sorter: (a, b) => a.year - b.year

        }, {
            title: '分类',
            dataIndex: 'category',
            width: 180,

        }, {
            title: '录入时间',
            dataIndex: 'meta.createAt',
            width: 150,
            render: (text, record, index) => moment(text).format('YYYY-MM-DD HH:mm')

        }, {
            title: '更新时间',
            dataIndex: 'meta.updateAt',
            width: 150,
            render: (text, record, index) => moment(text).format('YYYY-MM-DD HH:mm')
        }, {
            title: 'pv',
            dataIndex: 'pv',
            width: 100,
            sorter: (a, b) => a.pv - b.pv
        }, {
            title: 'flash地址',
            dataIndex: 'flash',
            width: 400,

        }, {
            title: '操作',
            dataIndex: 'operate',
            fixed: 'right',
            width: 100,
            render: this.renderOperate.bind(this)
        }];
        return <Table columns={columns}
                      rowKey={record => record._id}
                      dataSource={this.state.data}
            // pagination={this.state.pagination}
                      loading={this.state.loading}
                      onChange={this.handleTableChange}
                      scroll={{x: 1800, y: 600}}
                      className='movie-table-list'
        />
    }
}