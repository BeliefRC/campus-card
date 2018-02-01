import React from 'react'
import {Form, Input, Button, Spin, message,Switch} from 'antd';
import {post} from "../../fetch/post";
import selectedKeyUntil from "../../until/selectedKeyUntil";

const FormItem = Form.Item;
const {TextArea} = Input;

class NoticeDetailInfoForm extends React.Component {
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
              文章标题&nbsp;
            </span>
                        )}
                    >
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true, message: '文章标题不能为空!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={(<span>公告正文&nbsp;</span>)}>
                        {getFieldDecorator('content', {
                            rules: [{required: true, message: '公告正文不能为空!', whitespace: true}],
                        })(
                            <TextArea placeholder="请输入公告的具体信息" autosize={{minRows: 4, maxRows: 20}}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(<span>是否显示&nbsp;</span>)}>
                        {getFieldDecorator('content', {
                            rules: [],
                        })(
                            <TextArea placeholder="请输入公告的具体信息" autosize={{minRows: 4, maxRows: 20}}/>
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" loading={loading} htmlType="submit">发布</Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default NoticeDetailInfoForm = Form.create({})(NoticeDetailInfoForm);
