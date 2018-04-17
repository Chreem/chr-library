import React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import './Login.less'

const FormItem = Form.Item;

export default class extends React.Component {
    handleLoginSubmit(e) {
        e.stopPropagation();
        e.preventDefault();

        console.log('try to login');

        return false;
    }

    render() {
        return <Form onSubmit={this.handleLoginSubmit.bind(this)} className="login-container">
            Register
        </Form>
    }
}