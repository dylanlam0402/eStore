
import React from 'react';
import Iphone from '../../../../../images/iphone7.jpg'
import { Card, Row, Col ,Tag ,InputNumber } from 'antd'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { isPrimitive } from 'util';
import { Button } from 'antd/lib/radio';
import { addItemToCart} from'../../cart/CartAction'
import { getItem } from '../ItemAction';

class ItemDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : 1
        };
    }

    onChangeQty=(value) =>{
        this.setState({value});
    }


    componentDidMount = ()=>{
        const paramater = this.props.match.params.key
        this.props.getItem(paramater);
    }

    onAddToCartClick=  (item,value) =>{
        item.cartQty = value;
        this.props.addItemToCart(item)
    }
    render() {
        const paramater = this.props.match.params.key

        const { item } = this.props ;
        const {value} = this.state;
        if(item === undefined) {
            return (<div>Cannot find product</div>)
        }


        return (
            <div>
                <Card title={item.name} bordered={false} >
                    <Row>
                        <Col span={8}>
                            <img src="http://localhost:8080/api/files/download.jpg" alt="image" style={{ width: '80%', height: '100%' }} />
                        </Col>
                        <Col span={8}>
                            <h1 style={{
                                display : 'inline-block',
                                borderRadius : 4,
                                textSize : 30,
                                padding : '0 4px 0 4px',
                                color : 'white', 
                                backgroundColor : 'blue'}}
                                > {item.name}</h1>
                            <br/><br/>
                            <h2> Description : </h2> <h3> this is disscription content</h3>
                            <br/><br/><br/><br/><br/>
                            <h1> Stock : <Tag color="cyan"> {item.quantity}</Tag></h1>
                            <br/><br/>
                            <h1> Price : </h1>
                            <h1 style={{
                                display : 'inline-block',
                                borderRadius : 4,
                                textSize : 30,
                                padding : '0 4px 0 4px',
                                color : 'purple', 
                                backgroundColor : 'white'}}
                                > {item.price}</h1>
                            <br/><br/>
                            <InputNumber min={1} max={item.quantity} value={value} onChange={this.onChangeQty}/>
                            <Button size="large" onClick={(e)=>this.onAddToCartClick(item,value)}> ADD TO CART </Button>
                          
                        </Col>
                        <Col span={8}>
                        <h2> This product was sold by : </h2> <br/>
                        <h1> {item.storeId.name} </h1> <br/>
                        <h2> {item.storeId.address} </h2><br/>
                        <h2> {item.storeId.phone} </h2>
                        </Col>
                    </Row>


                </Card>

            </div>
        )

    }
};

const mapStateToProps = (state) => {
    // Handle state to update UI
    return {
        item: state.itemReducer.item

    }

}

const mapDispatchToProps = dispatch => ({
    addItemToCart: (item) => {
        dispatch(addItemToCart(item))
    },
    getItem : (id) =>{
        dispatch(getItem(id));
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ItemDetail);

