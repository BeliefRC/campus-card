import React from 'react'
import {Form, Input, Modal, Button, message, Spin} from 'antd';
import {post} from "../../fetch/post";

const FormItem = Form.Item;

class ChangePasswordModal extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loading: false,
            confirmDirty: false,
        };
    }


    //修改密码
    handleSubmit = (e) => {
        e.preventDefault();
        let {modalVisible, modalVisibleActions} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                //发送请求
                post('/card/changePassword', values,
                    (data) => {
                        if (data.success) {
                            this.successCb(data);
                        } else {
                            message.error(data.msg);
                            this.setState({loading: false});
                        }
                    },
                    () => {
                        //更新弹窗状态
                        modalVisible.changePasswordVisible = false;
                        modalVisibleActions.update(modalVisible);
                        //更新按钮状态
                        this.setState({loading: false});
                    });
            }
        });
    };

    successCb(data) {
        let {modalVisible, modalVisibleActions} = this.props;
        //更新弹窗状态
        modalVisible.changePasswordVisible = false;
        modalVisibleActions.update(modalVisible);
        message.success(data.msg);
        this.setState({loading: false});
    }

    //点击确认
    handleOk = () => {
        let {modalVisible, modalVisibleActions} = this.props;
        modalVisible.changePasswordVisible = false;
        this.setState({loading: false});
        modalVisibleActions.update(modalVisible);
    };

    //关闭弹窗
    handleCancel = () => {
        let {modalVisible, modalVisibleActions} = this.props;
        modalVisible.changePasswordVisible = false;
        modalVisibleActions.update(modalVisible);
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

        if (value && value.length < 6) {
            callback(`密码不能少于6个字符`);
        } else {
            callback();
        }
    };

    render() {
        const {modalVisible} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {loading} = this.state;
        return (
            <Modal
                visible={modalVisible.changePasswordVisible}
                title="修改密码"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer=''
            >
                <Spin spinning={loading}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('oldPassword', {
                                rules: [{required: true, message: '请输入一卡通账号!'}],
                            })(
                                <Input type='password' placeholder="原密码"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '密码不能为空!',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                            })(
                                <Input type="password" placeholder="新密码"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '确认密码为必填!',
                                }, {
                                    validator: this.checkPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur}
                                       placeholder="确认新密码"/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button className='float-right login-button'
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                            >
                                确 认 修 改
                            </Button>
                        </FormItem>
                    </Form>
                </Spin>
            </Modal>
        )
    }
}

export default ChangePasswordModal = Form.create({})(ChangePasswordModal);
