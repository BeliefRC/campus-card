import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Form, Input, Icon} from 'antd';

const FormItem = Form.Item;

class SearchByCodeInput extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }

    //同步信息
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.init(values.searchCode)
            }
        });
    };

    //处理回车按键
    search(e) {
        if (e.keyCode === 13) {
            this.handleSubmit(e)
        }
    }

    keyPress() {
        let searchCode = this.props.form.getFieldValue('searchCode');
        this.props.changeCode && this.props.changeCode(searchCode);

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 3},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
        };
        return (
            <Form>
                <FormItem label="输入一卡通账号查询"
                          {...formItemLayout}>
                    {getFieldDecorator('searchCode', {
                        rules: [{
                            required: true, message: '请输入一卡通账号!',
                        }, {
                            validator(rule, values, callback) {
                                if (values && values.length > 0) {
                                    let reg = /^[0-9]*$/g;
                                    if (!reg.test(values)) {
                                        callback(`id只能是数字`);
                                    } else {
                                        callback();
                                    }
                                } else {
                                    callback();
                                }
                            }
                        }],
                    })(
                        <Input onKeyUp={this.keyPress.bind(this)}
                               prefix={<Icon type="link" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="输入一卡通账号后按下回车键即查询" onKeyDown={this.search.bind(this)}/>
                    )}
                </FormItem>
            </Form>
        )
    }
}

export default SearchByCodeInput = Form.create({})(SearchByCodeInput);

