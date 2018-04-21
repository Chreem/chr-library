import React, {Component} from 'react'
import {Form} from 'antd'
import PropTypes from 'prop-types'
import items from './map.js'

const FormItem = Form.Item;

function generator({props, rules: defaultRules, type}) {
    return Input => {
        class FormComponent extends Component {
            static contextTypes = {
                form: PropTypes.object,
            };

            render() {
                const {getFieldDecorator} = this.context.form;
                const {name, rules, ...otherProps} = this.props;

                return <FormItem>
                    {getFieldDecorator(name, {rules: (rules ? rules : defaultRules)})(
                        <Input {...props} {...otherProps}/>
                    )}
                </FormItem>
            }
        }

        return FormComponent
    }
}

const User = {};
Object.keys(items).forEach(key => {
    User[key] = generator({
        props: items[key].props,
        rules: items[key].rules,
        type: key
    })(items[key].component)
});
export default User;

