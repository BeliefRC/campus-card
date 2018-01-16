import React from 'react'
import {Form, Input, Tooltip, Icon, Button, Radio} from 'antd';
import {hashHistory} from "react-router";
import typeRadioData from '../../viewDatas/typeRadio'
// import {post} from "../../fetch/post";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class CardDetailInfoForm extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };
    }

    componentDidMount() {
        this.init();
        let code=this.getCookies('companyType');
        console.log(code);
    }

     getCookies(cookiename){
        let value = document.cookie.match(new RegExp("(^| )" + cookiename + "=([^;]*)(;|$)"));
        return null != value ? decodeURIComponent(value[2]) : null;

    };

    init() {
        let pathname = hashHistory.getCurrentLocation().pathname;
        switch (pathname) {
            case '/admin/newCard':
                this.props.form.setFieldsValue({
                    password: '666666',
                    confirm: '666666'
                });
                break;
            default:
                break;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    };

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        if (value.length < 6) {
            callback(`密码不能少于6个字符`);
        } else {
            callback();
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 3},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
              一卡通账号&nbsp;
                            <Tooltip title="一卡通账号为系统自动计算">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                    )}
                >
                    {getFieldDecorator('code', {
                        rules: [{
                            required: true, message: '一卡通账号不能为空!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
              持卡人姓名&nbsp;
                            <Tooltip title="请输入持卡人的真实姓名">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                    )}
                >
                    {getFieldDecorator('cardholder', {
                        rules: [{required: true, message: '持卡人姓名不能为空!', whitespace: true}],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
              密码&nbsp;
                            <Tooltip title="系统默认密码为666666">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                    )}
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '密码不能为空!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '确认密码为必填!',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="卡类别"
                >
                    {getFieldDecorator('type', {
                        rules: [{required: true, message: '请选择卡类别!'}],
                    })(
                        <RadioGroup>
                            {
                                typeRadioData.map(item =>
                                    <Radio value={item.key} key={item.key}>{item.value}</Radio>)
                            }
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">录入</Button>
                </FormItem>
            </Form>
        );
    }
}

export default CardDetailInfoForm = Form.create({})(CardDetailInfoForm);
