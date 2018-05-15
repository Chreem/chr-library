import * as React from 'react'
import {Form} from 'antd'
import * as PropTypes from 'prop-types'
import items from './map'

const FormItem = Form.Item;

interface InputPropsType {
    name: string,
    rules: Array<any>,
}

function generator({props, rules: defaultRules, type}: any) {
    return (Input: new() => React.Component) => {
        class FormComponent extends React.Component<InputPropsType> {
            static contextTypes = {
                form: PropTypes.object,
            };

            render() {
                const {getFieldDecorator} = this.context.form;
                const {name, rules, ...otherProps} = this.props;

                return <FormItem>
                    {getFieldDecorator(name, {rules: (rules || defaultRules)})(
                        <Input {...props} {...otherProps}/>
                    )}
                </FormItem>
            }
        }

        return FormComponent
    }
}

const User: any = {};
const comps = items as any;
Object.keys(comps).forEach(key => {
    User[key] = generator({
        props: comps[key].props,
        rules: comps[key].rules,
        type: key
    })(comps[key].component)
});
export default User;

