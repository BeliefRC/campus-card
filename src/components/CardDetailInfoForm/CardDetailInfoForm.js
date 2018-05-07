import React from 'react'
import {Form, Input, Tooltip, Icon, Button, Radio, Upload, message} from 'antd';
import typeRadioData from '../../viewDatas/typeRadio'
import * as domainConstants from '../../fetch/domainConstants'

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
            loading: false,
            imageUrl: '',
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

                if (nextProps.data.photo) {
                    this.setState({loading: true});
                    this.setState({imageUrl: `${domainConstants.DOMAIN}/imgs/${nextProps.data.photo}`, loading: true});
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
                this.props.handleSubmit(values);
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

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        let {codeDisabled, type, showPassword, userInfo} = this.props;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const {imageUrl} = this.state;

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
                    label="头像"
                >
                    <div className="dropbox">
                        {getFieldDecorator('photo')(
                            <Upload
                                name="photo"
                                withCredentials
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={`${domainConstants.DOMAIN}/card/beforeUpload`}
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img style={{width: '100%'}} src={imageUrl} alt=""/> : uploadButton}
                            </Upload>
                        )}
                    </div>
                </FormItem>
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
                        <RadioGroup disabled={!userInfo.isAdmin}>
                            {
                                typeRadioData.map(item =>
                                    <Radio value={item.key} key={item.key}>{item.value}</Radio>)
                            }
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">{type}</Button>
                </FormItem>
            </Form>
        );
    }
}

export default CardDetailInfoForm = Form.create({})(CardDetailInfoForm);


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg' || 'image/png';
    if (!isJPG) {
        message.error('只能上传JPG或PNG文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小必选小于2MB!');
    }
    return isJPG && isLt2M;
}
