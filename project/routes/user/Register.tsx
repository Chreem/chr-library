import * as React from 'react';
import {Form, Icon, Button, Popover} from 'antd';
import * as PropTypes from 'prop-types'
import './LoginStyle.less'
import UserComponents from '../../components/user/index'
import {createHashHistory} from 'history'
import {setAuthority} from '../../utils/authority'
import {WrappedFormUtils} from "antd/es/form/Form";
import {Simulate} from "react-dom/test-utils";
import keyDown = Simulate.keyDown;

const history = createHashHistory();
const FormItem = Form.Item;
const {UserName, Password, Email, FormInput} = UserComponents;

interface passwordType {
    length: boolean,
    number: boolean,
    character: boolean,
    uppercase: boolean,
    visible: boolean,
    minLength: number,
}

const initialPasswordState: passwordType = {
    length: false,
    number: false,
    character: false,
    uppercase: false,
    visible: false,
    minLength: 8
};

const PasswordPopoverContent = (props: passwordType) => {
    return <div>
        length?: {props.length ? 'yes' : 'no'} <br/>
        number?: {props.number ? 'yes' : 'no'} <br/>
        character?: {props.character ? 'yes' : 'no'} <br/>
        uppercase?: {props.uppercase ? 'yes' : 'no'} <br/>
    </div>
};

interface RegisterPropsType extends passwordType{
    form: WrappedFormUtils
}
class Register extends React.Component<RegisterPropsType> {
    static childContextTypes = {
        form: PropTypes.object
    };

    state = {
        password: initialPasswordState,
    };

    private password = '';

    constructor(props:RegisterPropsType) {
        super(props);

        this.handleCheckPassword = this.handleCheckPassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    }

    getChildContext() {
        return {form: this.props.form}
    }

    private handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                setAuthority('token' + new Date().getTime());
                history.push('register-result');
            }
        });
    }

    /**
     * 密码规则
     */
    private handleCheckPassword(rule: Array<string>, val: string, cb: Function) {
        const tipMessage = 'password should be strong';
        const passState: any = Object.assign({}, initialPasswordState);
        this.setState({password: passState});
        if (!!val) {
            passState.visible = true
        }
        else {
            return cb(tipMessage)
        }

        if (val.length >= passState.minLength) passState.length = true;
        if (/[a-z]/.test(val)) passState.character = true;
        if (/[A-Z]/.test(val)) passState.uppercase = true;
        if (/[0-9]/.test(val)) passState.number = true;

        this.password = val;
        const values = Object.keys(passState).map(key => passState[key]);
        cb(values.indexOf(false) > -1 ? tipMessage : undefined);
    }

    private handleConfirmPassword(rule: Array<string>, val: string, cb: Function) {
        cb(this.password === val ? undefined : 'password not match', '')
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
                          onChange={({target}: any) => this.password = target.value}
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

export default Form.create()(Register);