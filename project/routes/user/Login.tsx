import * as React from 'react';
import * as PropTypes from 'prop-types'
import {createHashHistory} from 'history'
import {Form, Button, Checkbox} from 'antd';
import User from '../../components/user/index'
import {setAuthority} from '../../utils/authority'
import './LoginStyle.less'
import {WrappedFormUtils} from "antd/es/form/Form";

const FormItem = Form.Item;
const history = createHashHistory();
const {UserName, Password} = User;

class Login extends React.Component<{ form: WrappedFormUtils }> {
    state = {
        remember: false
    };

    static childContextTypes = {
        form: PropTypes.object
    };

    getChildContext() {
        return {form: this.props.form}
    }

    private handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('try to login', values);

                // 通过验证
                if (this.state.remember) {
                    console.log('set remember sign');
                }
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

export default Form.create()(Login)
