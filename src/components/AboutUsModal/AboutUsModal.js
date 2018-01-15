import React from 'react'
import {Modal, Button} from 'antd';
import './style.less'

export default class LoginModal extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loading: false,
        };
    }

    //点击确认
    handleOk = () => {
        let {modalVisible, modalVisibleActions} = this.props;
        modalVisible.aboutUsVisible = false;
        this.setState({loading: false, visible: false});
        modalVisibleActions.update(modalVisible);
    };

    //点击取消
    handleCancel = () => {
        let {modalVisible, modalVisibleActions} = this.props;
        modalVisible.aboutUsVisible = false;
        modalVisibleActions.update(modalVisible);
    };

    render() {
        const {modalVisible} = this.props;
        return (
            <div>
                <Modal className='about-us-modal'
                       visible={modalVisible.aboutUsVisible}
                       title="关于我们"
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                       footer={[
                           <Button key="submit" type="primary" onClick={this.handleOk}>
                               确定
                           </Button>,
                       ]}
                >
                    <span className='inner-content'>
                        校园一卡通系统是数字化校园的基础工程，是数字化校园中有机的、重要的组成部分。为数字化大学提供了全面的数据采集平台，结合大学的管理信息系统和网络，形成全校范围的数字空间和共享环境。为大学管理人员提供具有开放性、灵活性、面向大学的应用服务管理平台、是管理与管理科学化的必要前提和基本途径。将给全校师生带来一种全新的、方便现代化生活。
                    </span>
                </Modal>
            </div>
        )
    }
}