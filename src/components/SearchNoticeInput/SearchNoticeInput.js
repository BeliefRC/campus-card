import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Form, Input} from 'antd';

const FormItem = Form.Item;
const Search = Input.Search;

class SearchNoticeInput extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }

    //同步信息
    handleSubmit = (e) => {
        // e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                // this.props.init(values.searchCode)
            }
        });
    };

    //处理回车按键
    search(e) {
        if (e.keyCode === 13) {
            this.handleSubmit(e)
        }
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
                <FormItem label="输入文章标题或主体内容查询"
                          {...formItemLayout}>
                    {getFieldDecorator('searchCode', {
                        rules: [{
                            required: true, message: '该项不能为空!',
                        }],
                    })(
                        <Search placeholder="input search text" enterButton="搜索"
                                onSearch={this.handleSubmit}/>
                    )}
                </FormItem>
            </Form>
        )
    }
}

export default SearchNoticeInput = Form.create({})(SearchNoticeInput);

