import { Form, Icon, Input, Button } from 'antd';

import React from 'react';

const FormItem = Form.Item;



export default class HorizontalLoginForm extends React.Component {

   
    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const {children ,value, rules} = this.props
        
        return (
            <Form layout="inline" >
                <FormItem style={{marginBottom:0}}>
                    {getFieldDecorator('input', {
                        rules: rules
                    })(
                        children
                        )}
                </FormItem>
            </Form>
        );
    }
}
