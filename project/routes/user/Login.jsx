import React from 'react';
import {createHashHistory} from 'history'
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import User from '../../components/user'
import './Login.less'

const FormItem = Form.Item;
const history = createHashHistory();
const {UserName, Password} = User;

export default Form.create()(class extends React.Component {
    handleLoginSubmit(e) {
        e.stopPropagation();
        e.preventDefault();

        this.props.form.validateFields((err, val) => {
            if (!err) {
                console.log('try to login');
            }
        });


        return false;
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return <Form onSubmit={this.handleLoginSubmit.bind(this)} className="login-container">
            <UserName placeholder="admin"/>
            <Password placeholder="123qwe"/>
            <FormItem>
                <Checkbox>Remember me</Checkbox>
                <a href="javascript:">Forget password?</a>
                <div>
                    <Button type="primary" htmlType="submit">Sign in</Button>
                    <Button type="primary" htmlType="button"
                            onClick={() => history.push('/user/register')}>
                        Sign up
                    </Button>
                </div>
            </FormItem>
        </Form>
    }
})
