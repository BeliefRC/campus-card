import React from 'react'
import {Form, Icon, Input, Modal, Button} from 'antd';
import {post} from "../../fetch/post";

import './style.less'

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginModal extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loading: false,
        };
    }

    componentDidMount() {
        // 初始化经禁用登录按钮
        this.props.form.validateFields();
    }

    //登录
    handleSubmit = (e) => {
        e.preventDefault();
        let {modalVisible, modalVisibleActions} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({loading: true});
                post('/card/login', values,
                    (data) => {
                        this.setState({loading: false});
                        console.log(data);
                        modalVisible.loginVisible = false;
                        modalVisibleActions.update(modalVisible);
                    },
                    () => {
                        this.setState({loading: false});
                        modalVisible.loginVisible = false;
                        modalVisibleActions.update(modalVisible);
                    });
            }
        });
    };

    //关闭弹窗
    handleCancel = () => {
        let {modalVisible, modalVisibleActions} = this.props;
        modalVisible.loginVisible = false;
        modalVisibleActions.update(modalVisible);
    };

    render() {
        const {modalVisible} = this.props;
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const {loading} = this.state;
        return (
            <div>
                <Modal
                    visible={modalVisible.loginVisible}
                    title="登录"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer=''
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            validateStatus={usernameError ? 'error' : ''}
                            help={usernameError || ''}
                        >
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: '请输入一卡通账号!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="一卡通账号"/>
                            )}
                        </FormItem>
                        <FormItem
                            validateStatus={passwordError ? 'error' : ''}
                            help={passwordError || ''}
                        >
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入一卡通密码!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder="一卡通密码"/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button className='float-right login-button'
                                    type="primary"
                                    htmlType="submit"
                                    disabled={hasErrors(getFieldsError())}
                                    loading={loading}
                            >
                                登 录
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default LoginModal = Form.create({})(LoginModal);