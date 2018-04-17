import React from 'react';
import PropTypes from 'prop-types'
import {createHashHistory} from 'history'
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import User from '../../components/user'
import {setAuthority} from '../../utils/authority'
import './Login.less'

const FormItem = Form.Item;
const history = createHashHistory();
const {UserName, Password} = User;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remember: false
        }
    }

    getChildContext() {
        return {form: this.props.form}
    }

    handleLoginSubmit(e) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('try to login', values);

                // 通过验证
                if (this.state.remember) {console.log('set token')}
                setAuthority('token' + (new Date()).getTime());
                history.push('/');
            }
        });
    }

    render() {
        const {remember} = this.state;

        return <Form onSubmit={this.handleLoginSubmit.bind(this)} className="login-container">
            <UserName name="username"/>
            <Password name="password"/>
            <FormItem>
                <Checkbox checked={remember} onChange={() => this.setState({remember: !remember})}>Remember
                    me</Checkbox>
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
}

Login.childContextTypes = {
    form: PropTypes.object
};

export default Form.create()(Login)
