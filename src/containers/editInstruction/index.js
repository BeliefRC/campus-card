import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {get} from '../../fetch/get'
import {post} from '../../fetch/post'
import {Form, Input, Button, Spin, message} from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input;

class EditInstruction extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {loading: false};
    }

    componentWillMount() {
        this.setState({loading: true});
        get('/instruction/detail', {}, (data) => {
            this.setState({loading: false});
            if (data.success) {
                this.props.form.setFieldsValue({instruction: data.backData.instruction})
            } else {
                message.error(data.msg)
            }
        }, () => {
            this.setState({loading: false});
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                post('/instruction/save', values, (data) => {
                    this.setState({loading: false});
                    if (data.success) {
                        message.success(data.msg)
                    } else {
                        message.error(data.msg)
                    }
                }, () => {
                    this.setState({loading: false});
                })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        let {loading} = this.state;
        return (
            <Spin spinning={loading}>
                <Form onSubmit={this.handleSubmit}>

                    <FormItem label={(<span>使用说明&nbsp;</span>)}>
                        {getFieldDecorator('instruction', {
                            rules: [{required: true, message: '使用说明不能为空!', whitespace: true}],
                        })(
                            <TextArea placeholder="请输入使用说明具体信息" autosize={{minRows: 4, maxRows: 30}}/>
                        )}
                    </FormItem>

                    <FormItem>
                        <Button type="primary" htmlType="submit">更新</Button>
                    </FormItem>
                </Form>

            </Spin>
        )
    }
}

export default EditInstruction = Form.create({})(EditInstruction);

