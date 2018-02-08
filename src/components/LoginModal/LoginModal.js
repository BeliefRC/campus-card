import React from 'react'
import {Form, Icon, Input, Modal, Button, message} from 'antd';
import {post} from "../../fetch/post";
import sessionStorage from '../../until/sessionStorage'
import selectedKeyUntil from '../../until/selectedKeyUntil'

import './style.less'
import {hashHistory} from "react-router";

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
                this.setState({loading: true});
                let code = this.props.form.getFieldValue('code'),
                    url = code === 'admin' ? '/admin/login' : '/card/login';
                //发送请求
                post(url, values,
                    (data) => {
                        if (data.success) {
                            this.loginHandle(data);
                        } else {
                            message.error(data.msg);
                            this.setState({loading: false});
                        }
                    },
                    () => {
                        //更新弹窗状态
                        modalVisible.loginVisible = false;
                        modalVisibleActions.update(modalVisible);
                        //更新按钮状态
                        this.setState({loading: false});
                    });
            }
        });
    };

    loginHandle(data) {
        let {modalVisible, modalVisibleActions, userInfo, userInfoActions, menuKey, menuKeyActions} = this.props;
        //更新弹窗状态
        modalVisible.loginVisible = false;
        modalVisibleActions.update(modalVisible);
        //更新用户信息
        userInfo.code = data.backData.code;
        userInfo.isAdmin = data.backData.isAdmin;
        userInfo.user = data.backData.cardholder || 'admin';
        userInfo.isLogin = true;
        userInfo.photo = data.backData.photo;
        userInfoActions.update(userInfo);
        //将用户信息存储到sessionStorage
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        message.success(data.msg);
        //更新按钮状态
        this.setState({loading: false});
        //跳转至首页
        let url = hashHistory.getCurrentLocation().pathname;
        if ((userInfo.isAdmin && url.indexOf('userCenter') > -1) ||
            (!userInfo.isAdmin && url.indexOf('admin') > -1)) {
            selectedKeyUntil.update(menuKey, menuKeyActions, '/')
        }
    }

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
        const codeError = isFieldTouched('code') && getFieldError('code');
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
                            validateStatus={codeError ? 'error' : ''}
                            help={codeError || ''}
                        >
                            {getFieldDecorator('code', {
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
