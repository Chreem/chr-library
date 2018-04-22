import React, {Component} from 'react';
import {Form, Icon, Button, Popover} from 'antd';
import PropTypes from 'prop-types'
import './Login.less'
import UserComponents from '../../components/user'
import {createHashHistory} from 'history'
import {setAuthority} from '../../utils/authority'

const history = createHashHistory();
const FormItem = Form.Item;
const {UserName, Password, Email, FormInput} = UserComponents;

const initialPasswordState = {
    length: false,
    number: false,
    character: false,
    uppercase: false,
    visible: false,

    minLength: 8
};

const PasswordPopoverContent = (props) => {
    return <div>
        length?: {props.length ? 'yes' : 'no'} <br/>
        number?: {props.number ? 'yes' : 'no'} <br/>
        character?: {props.character ? 'yes' : 'no'} <br/>
        uppercase?: {props.uppercase ? 'yes' : 'no'} <br/>
    </div>
};

class Register extends Component {
    state = {
        password: initialPasswordState,
    };

    password = '';

    constructor(props) {
        super(props);

        this.handleCheckPassword = this.handleCheckPassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    }

    getChildContext() {
        return {form: this.props.form}
    }

    handleLoginSubmit(e) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('try to register', values);

                setAuthority('token' + new Date().getTime());
                history.push('register-result');
            }
        });
    }

    /**
     * 密码规则
     */
    handleCheckPassword(rule, val, cb) {
        const tipMessage = 'password should be strong';
        const passState = Object.assign({}, initialPasswordState);
        this.setState({password: passState});
        if (!!val) {passState.visible = true}
        else {return cb(tipMessage)}

        if (val.length >= passState.minLength) passState.length = true;
        if (/[a-z]/.test(val)) passState.character = true;
        if (/[A-Z]/.test(val)) passState.uppercase = true;
        if (/[0-9]/.test(val)) passState.number = true;

        this.password = val;
        cb(Object.values(passState).indexOf(false) > -1 ? tipMessage : undefined);
    }

    handleConfirmPassword(rule, val, cb) {
        cb(this.password === val ? undefined : 'password not match')
    }

    render() {
        return <Form onSubmit={this.handleLoginSubmit.bind(this)} className="login-container">
            <Email name="email"/>
            <UserName name="username"/>
            <Popover placement="left"
                     content={<PasswordPopoverContent {...this.state.password}/>}
                     visible={this.state.password.visible}>
                <Password name="password"
                          rules={[{validator: this.handleCheckPassword,}]}
                          onChange={({target}) => this.password = target.value}
                          placeholder="at least 6 character"/>
            </Popover>
            <Password name="check"
                      rules={[{validator: this.handleConfirmPassword,}]}
                      placeholder="confirm your password"/>
            <FormItem>
                <div>
                    <Button type="primary" htmlType="submit">Sign up</Button>
                    <Button type="primary" htmlType="button" onClick={() => history.push('login')}>Back</Button>
                </div>
            </FormItem>
        </Form>
    }
}

Register.childContextTypes = {
    form: PropTypes.object
};

export default Form.create()(Register);