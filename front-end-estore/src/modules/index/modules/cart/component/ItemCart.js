import React from 'react';
import { Icon, Card, Button, Row, Col, InputNumber } from 'antd';
import Iphone from '../../../../../images/iphone7.jpg'
import { connect } from 'react-redux'

import {removeItemToCart, addItemToCart} from '../CartAction'




class ItemCart extends React.Component {
    constructor() {
        super();
    }

    onChange =(item, value)=>{
        item.cartQty = value;
        this.props.addItemToCart(item)
    }

    removeItem=(item)=>{
        this.props.removeItemToCart(item)
    }

    render() {
        const { item } = this.props
        return (

            <Card style={{  textAlign: 'center' }} bodyStyle={{ padding: 0 }}>
                <Row gutter={2}>
                    <Col span={4}>
                    <div className="custom-image">
                        <img alt="iphone" width="100%" src={Iphone} />
                    </div>
                    </Col>
                    <Col span={10}>
                    </Col>
                    <Col span={4}>
                    </Col>
                    <Col span={6}>
                        <Row>
                        <InputNumber style={{width : '100%'}} 
                        value={item.cartQty} min={1} max={item.quantity}
                        onChange={(value)=>this.onChange(item,value)}
                        /> 
                        </Row>
                        <Row style={{ marginTop : 10, width : '100%'}}>
                        <Button onClick={(e)=>this.removeItem(item)}> Delete </Button>
                        </Row>
                    </Col>
                </Row>
            </Card>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    removeItemToCart : (item) => {
        dispatch(removeItemToCart(item))
    },
    addItemToCart : (item)=>{
        dispatch(addItemToCart(item))
    }
})
export default connect(null, mapDispatchToProps) (ItemCart); 