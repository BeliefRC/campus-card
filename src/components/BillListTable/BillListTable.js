import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import moment from 'moment'
import {Table} from 'antd';

export default class BillListTable extends React.Component {
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

    render() {
        const columns = [
            {
                title: '地点',
                dataIndex: 'place',
            }, {
                title: '金额',
                dataIndex: 'amount',
                sorter: (a, b) => a.code - b.code,
                render: (text, record, index) => record.type==='充值'?
                    <span style={{color:'green',fontWeight:'bold'}}>{text.toFixed(2)}</span>:
                    <span style={{color:'red',fontWeight:'bold'}}>{text.toFixed(2)}</span>

            }, {
                title: '时间',
                dataIndex: 'time',
                sorter: (a, b) => a['meta.createAt'] - b['meta.createAt'],
                render: (text, record, index) => moment(text).format('YYYY-MM-DD HH:mm')
            },{
                title: '类型',
                dataIndex: 'type',
                filters: [
                    {text: '充值', value: '充值'},
                    {text: '消费', value: '消费'},
                ],
                onFilter: (value, record) => record.sex.includes(value),
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