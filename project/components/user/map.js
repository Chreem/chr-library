import React from 'react'
import {Input, Icon} from 'antd'

export default {
    UserName: {
        component: Input,
        props: {
            size: 'large',
            prefix: <Icon type="user"/>,
            placeholder: 'username'
        },
        rules: [
            {
                required: true,
                message: 'Please enter username'
            }
        ]
    },
    Password: {
        component: Input,
        props: {
            size: 'large',
            prefix: <Icon type="lock"/>,
            type: 'password',
            placeholder: 'password',
        },
        rules: [
            {
                required: true,
                message: 'Please enter password'
            }
        ]
    },
    Email: {
        component: Input,
        props: {
            size: 'large',
            prefix: <Icon type="mail"/>,
            placeholder: 'email',
        },
        rules: [
            {
                required: true,
                type: 'email',
                message: 'Please check your message'
            }
        ]
    },
    FormInput: {
        component: Input,
        props: {
            size: 'large',
        }
    }
}