import React from 'react'
import {Form, Input, Button, Switch} from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input;

class NoticeDetailInfoForm extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }


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
                this.props.newNotice(values)
            }
        });
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
                    {getFieldDecorator('isShow', {
                        rules: [{
                            required: true, message: '该项为必填!',
                        }],
                        initialValue: true
                    })(
                        <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked/>
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">发布/修改</Button>
                </FormItem>
            </Form>
        );
    }
}

export default NoticeDetailInfoForm = Form.create({})(NoticeDetailInfoForm);
