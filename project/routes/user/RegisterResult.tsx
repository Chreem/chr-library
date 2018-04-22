import * as React from 'react'
import {Component, Fragment} from 'react'
import './RegisterResultStyle'
import {Button, Icon} from 'antd'
import {createHashHistory} from 'history'

const history = createHashHistory();

type RegisterResultProps = {
    email: string;
}

class RegisterResult extends Component<RegisterResultProps> {
    render() {
        const {email} = this.props;
        const emailLink = 'mail.' + email.split('@')[1];

        return <div id="register-result">
            <div className="icon">
                <Icon type="check"/>
            </div>
            <div className="tip">您的账户: <span className="email">{email}</span> 注册成功</div>
            <div className="content">
                验证邮件已发往您的邮箱, 邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。
            </div>
            <Button href={'http://' + emailLink} target="_blank" type="primary">查看邮箱</Button>
            <Button className="to-home" onClick={() => history.push('/')}>返回首页</Button>
        </div>
    }
}

export default () => {
    console.log('how to get data');
    return <Fragment>
        <RegisterResult email="chreem@qq.com"/>
    </Fragment>
}