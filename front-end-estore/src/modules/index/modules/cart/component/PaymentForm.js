import React from 'react';
import { Row, Col, Button, Select, Form, Input, Tooltip, Icon } from 'antd';

const Option = Select.Option
const FormItem = Form.Item

class PaymentForm extends React.Component {
    constructor(props) {
        super(props);

    }



    render() {
        const { totalPrice, handleSubmitForm, handlePaymentType } = this.props;
        const message = "this field is required!"
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <h1> Total price : </h1>
                <br />
                <h2> {totalPrice} </h2>
                <br />
                <Form onSubmit={handleSubmitForm}>
                    <FormItem >
                        {getFieldDecorator('firstName', {
                            rules: [{ required: true, message: message }],
                            value: {}
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="first name" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('lastName', {
                            rules: [{ required: true, message: message }],
                            value: {}
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="last name" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: message }],
                            value: {}
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="address" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('phonenumber', {
                            rules: [{ required: true, message: message }],
                            value: {}
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="phone number" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('city', {
                            rules: [{ required: true, message: message }],
                            initialValue : 'TPHCM'
                        })(
                            <Select style={{ width: '100%' }} >
                                <Option value={"TPHCM"}> TP.HCM </Option>
                                <Option value={"Hà Nội"}> Hà Nội </Option>
                                <Option value={"Đà Nẵng"}> Đà Nẵng </Option>
                            </Select>
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('paymentId', {
                            rules: [{ required: true, message: message }],
                            initialValue: 1
                        })(
                            <Select onChange={handlePaymentType} style={{ width: '100%' }} >
                                <Option value={1}> Cash On Delivery </Option>
                                <Option value={2}> ATM </Option>
                                <Option value={3}> VISA </Option>
                            </Select>
                            )}
                    </FormItem>

                    <FormItem>
                        <Button type="dasher" htmlType="submit" > Pay </Button>
                    </FormItem>
                </Form>
            </div>

        );
    }
}

export default (PaymentForm)