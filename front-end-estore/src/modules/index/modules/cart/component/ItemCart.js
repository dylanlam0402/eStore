import React from 'react';
import { Icon, Card, Button, Row, Col, InputNumber } from 'antd';
import Iphone from '../../../../../images/iphone7.jpg'
import { connect } from 'react-redux'

import { removeItemToCart, addItemToCart, adjustItemToCart } from '../CartAction'




class ItemCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item 
        }
    }

    componentWillReceiveProps = (nextProps)  =>{
        if(nextProps.item != this.props.item){
            this.setState({item : nextProps})
        }
    }

    onChange = (e, item) => {

        item.cartQty = e;
        this.props.adjustItemToCart(item);
        this.setState({ item })

    }

    removeItem = (item) => {
        this.props.removeItemToCart(item);
        this.setState({item : {}})
    
    }

    render() {
        const { item } = this.state
        if ( item.typeId === undefined) {
            return ( <div>
             
            </div>)
        }
        else {
            return (


                <Row gutter={2}>
                    <Col span={5}>
                        <div className="custom-image">
                            <img alt="iphone" width="100%" src={Iphone} />
                        </div>
                    </Col>
                    <Col span={9}>
                        <h2>{item.typeId.name}</h2>
                        <h2>{item.storeId.name}</h2>
                        <h2>{item.storeId.address}</h2>
                    </Col>
                    <Col span={4}>
                        <h2> {item.price}</h2>
                    </Col>
                    <Col span={6}>
                        <Row>
                            <InputNumber style={{ width: '100%' }}
                                value={item.cartQty} min={1} max={item.quantity}
                                onChange={(e) => this.onChange(e, item)}
                            />
                        </Row>
                        <Row style={{ marginTop: 10, width: '100%' }}>
                            <Button onClick={(e) => this.removeItem(item)}> Delete </Button>
                        </Row>
                    </Col>
                </Row>



            );
        }

    }
}
const mapDispatchToProps = dispatch => ({
    removeItemToCart: (item) => {
        dispatch(removeItemToCart(item))
    },
    addItemToCart: (item) => {
        dispatch(addItemToCart(item))
    },
    adjustItemToCart: (item) => {
        dispatch(adjustItemToCart(item))
    },
})
export default connect(null, mapDispatchToProps)(ItemCart); 