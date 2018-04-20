import React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import PropTypes from "prop-types";
import './Login.less'
import UserComponents from '../../components/user'

const FormItem = Form.Item;
const {UserName, Password, Email, FormInput} = UserComponents;

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.handleCheckPassword = this.handleCheckPassword.bind(this);
    }

    getChildContext() {
        return {form: this.props.form}
    }

    handleLoginSubmit(e) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('try to register', values);

                // history.push('/');
            }
        });
    }

    handleCheckPassword(rule, val, cb) {
        console.log(rule, val);
        cb('error')
    }

    render() {
        const passwordRules = [{
            validator: this.handleCheckPassword,
        }];

        return <Form onSubmit={this.handleLoginSubmit.bind(this)} className="login-container">
            <UserName name="username"/>
            <Password name="password" rules={passwordRules} placeholder="at least 6 character"/>
            <Password name="check" placeholder="confirm your password"/>
            <Email name="email"/>
            <FormItem>
                <div>
                    <Button type="primary" htmlType="submit">Sign up</Button>
                    <Button type="primary" htmlType="button">asdf</Button>
                </div>
            </FormItem>
        </Form>
    }
}

Register.childContextTypes = {
    form: PropTypes.object
};

export default Form.create()(Register);