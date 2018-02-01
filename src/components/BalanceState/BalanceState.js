import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {InputNumber, Tag, Form, Button, Input, Icon} from 'antd'
import './style.less'

const FormItem = Form.Item;

class ResetPassword extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {
            afterBalance: 0
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.recharge(values.rechargeAmount, values.password);
                this.props.form.resetFields();
            }
        });
    };

    handleChang(value) {
        let balance = this.props.data.balance;
        if (value > 500) {
            value = 500
        }
        let afterBalance = parseFloat(balance) + parseFloat(value);
        this.setState({
            afterBalance
        })
    }

    render() {
        let {data} = this.props;
        let {afterBalance} = this.state;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 11},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 3},
            },
        };
        return (
            <div>
                {data.code ?
                    <div className='balance-state'>
                        <Tag color="gold" className='balance-num'>当前余额：￥{data.balance.toFixed(2)}</Tag>
                        <br/>
                        <br/>
                        <Tag color="orange" className='balance-num after-balance-num'>
                            充值后余额：￥{afterBalance ? afterBalance.toFixed(2) : data.balance.toFixed(2)}</Tag>
                        <Form onSubmit={this.handleSubmit} className="balance-form">
                            <FormItem
                                {...formItemLayout}
                                label={(<span>充值金额</span>)}>
                                {getFieldDecorator('rechargeAmount', {
                                    rules: [{required: true, message: '你到底充不充钱!'}, {
                                        validator(rule, values, callback) {
                                            if (values) {
                                                if (values > 500 || values < 50) {
                                                    callback(`充值金额为￥50.00到￥500.00之间`);
                                                } else {
                                                    callback();
                                                }
                                            } else {
                                                callback();
                                            }
                                        }
                                    }],
                                })(
                                    <InputNumber formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                 parser={value => value.replace(/￥\s?|(,*)/g, '')}
                                                 style={{width: '154px'}} size='large'
                                                 step={10} precision={2} onChange={this.handleChang.bind(this)}/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={(<span>密码</span>)}>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '请输入密码!'}],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password" size='large'/>
                                )}
                            </FormItem>
                            <h4>注：充值金额为￥50.00到￥500.00之间</h4>
                            <FormItem>
                                <Button type="primary" htmlType="submit" size='large'>
                                    确定充值
                                </Button>
                            </FormItem>
                        </Form>
                    </div> : ''}
            </div>
        )
    }
}

export default ResetPassword = Form.create({})(ResetPassword);

