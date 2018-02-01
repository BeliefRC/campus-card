import React from 'react'
import {Form, Input, Tooltip, Icon, Button, Radio, Spin, message} from 'antd';
import typeRadioData from '../../viewDatas/typeRadio'
import {post} from "../../fetch/post";
import selectedKeyUntil from "../../until/selectedKeyUntil";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class CardDetailInfoForm extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            confirmDirty: false,
            codeDisabled: false,
            loading: false
        };
    }

    static  defaultProps = {
        codeDisabled: false,
        isFrozenDisabled: false,
        isLostDisabled: false,

    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.code !== this.props.data.code) {
            if (nextProps.data && JSON.stringify(nextProps.data) !== '{}') {
                let value = this.props.form.getFieldsValue();
                for (let key in value) {
                    if (value.hasOwnProperty(key)) {
                        value[key] = nextProps.data[key]
                    }
                }
                this.props.form.setFieldsValue(value)
            } else {
                this.props.form.resetFields()
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                //发送请求
                let url;
                let {type} = this.props;
                if (type === '更新') {
                    url = `/card/update`
                } else if (type === '录入') {
                    url = `/card/register`
                }
                post(url, values,
                    (data) => {
                        this.setState({loading: false});
                        if (data.success) {
                            let {menuKey, menuKeyActions, userInfo} = this.props;
                            if (userInfo.isAdmin) {
                                selectedKeyUntil.update(menuKey, menuKeyActions, '/admin/cardholderList');
                            }
                            message.success(data.msg)
                        } else {
                            message.error(data.msg);
                            this.setState({loading: false});
                        }
                    },
                    () => {
                        this.setState({loading: false});
                    });
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
        let {codeDisabled, type, showPassword} = this.props;
        let {loading} = this.state;
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
            <Spin spinning={loading}>

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
                            <Input disabled={codeDisabled}/>
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
                    {showPassword ? [<FormItem key='password'{...formItemLayout} label={(
                        <span>密码&nbsp;<Tooltip title="系统默认密码为666666">
                            <Icon type="question-circle-o"/>
                        </Tooltip></span>)}>
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '密码不能为空!',
                            }, {
                                validator: this.checkConfirm,
                            }],
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>,
                        <FormItem key='confirm'{...formItemLayout} label="确认密码">
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '确认密码为必填!',
                                }, {
                                    validator: this.checkPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur}/>
                            )}
                        </FormItem>] : ''}
                    <FormItem
                        {...formItemLayout}
                        label="性别">
                        {getFieldDecorator('sex', {
                            rules: [{required: true, message: '请选择性别!'}],
                        })(<RadioGroup>
                            <Radio value='男'>男</Radio>
                            <Radio value='女'>女</Radio>
                        </RadioGroup>)}
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
                        <Button type="primary" loading={loading} htmlType="submit">{type}</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default CardDetailInfoForm = Form.create({})(CardDetailInfoForm);
