import React from 'react'
import {message} from "antd";
import Moment from 'moment'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import {post} from "../../fetch/post";

export default class DataAnalysis extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: {},
            outlay: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
    }

    componentWillMount() {
        let {userInfo} = this.props;
        let code = userInfo.code;
        let startTime = Moment().startOf('year');
        let endTime = Moment().endOf('year');
        console.log(startTime, endTime);
        code && code !== 'admin' && this.init(code, [startTime, endTime])
    }

    //初始化（获取出卡人信息）
    init(code, value) {
        this.setState({loading: true});
        post('/card/billList', {code, date: value}, (data) => {
            this.setState({loading: false});
            if (data.success) {
                delete data.backData._id;
                this.setState({
                    data: data.backData
                }, () => {
                    const {data, outlay} = this.state;
                    if (Array.isArray(data.bills)) {
                        for (let i = 0; i < 12; i++) {
                            let num = 0;
                            data.bills.map(bill => {
                                bill.time = new Moment(bill.time);
                                if (bill.time.month() === i && bill.type === '消费') {
                                    num += bill.amount;
                                }
                                return true
                            });
                            outlay[i] = num.toFixed(2);
                        }
                        this.setState({
                            outlay
                        });
                        // 基于准备好的dom，初始化echarts实例
                        const myChart = echarts.init(this.node);

                        // 绘制图表
                        myChart.setOption({
                            title: {text: `${Moment().year()}每月消费情况图`, subtext: '单位：元'},
                            color: function (params) {
                                //首先定义一个数组
                                const colorList = [
                                    '#C33531', '#EFE42A', '#64BD3D', '#EE9201',
                                    '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589',
                                    '#c3a3e8', '#4b3fe8', '#e8d641', '#44e87e'
                                ];
                                return colorList[params.dataIndex]
                            },
                            tooltip: {},
                            xAxis: {
                                data: ['1月', '2月', '3月', '4月',
                                    '5月', '6月', '7月', '8月',
                                    '9月', '10月', '11月', '12月']
                            },
                            yAxis: {},
                            series: [{
                                name: '消费',
                                type: 'bar',
                                data: outlay
                            },
                            ]
                        });
                    }
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
        return (
            <div ref={node=>this.node=node} style={{width: 800, height: 400}}/>
        );
    }
}