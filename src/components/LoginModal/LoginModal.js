import React from 'react'
import {Modal, Button} from 'antd';

export default class LoginModal extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loading: false,
        };
    }

    handleOk = () => {
        let {modalVisible, modalVisibleActions} = this.props;
        modalVisible.loginVisible = false;
        setTimeout(() => {
            this.setState({loading: true});
            this.setState({loading: false, visible: false});
            modalVisibleActions.update(modalVisible);
        }, 1000);
    };

    handleCancel = () => {
        let {modalVisible, modalVisibleActions} = this.props;
        modalVisible.loginVisible = false;
        modalVisibleActions.update(modalVisible);
    };

    render() {
        const {modalVisible} = this.props;
        const {loading} = this.state;
        return (
            <div>
                <Modal
                    visible={modalVisible.loginVisible}
                    title="登录"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            登录
                        </Button>,
                    ]}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}