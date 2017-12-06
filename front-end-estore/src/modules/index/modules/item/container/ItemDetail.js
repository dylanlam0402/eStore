
import React from 'react';
import Iphone from '../../../../../images/iphone7.jpg'
import { Card, Row, Col ,Tag } from 'antd'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { isPrimitive } from 'util';
import { Button } from 'antd/lib/radio';
import { addItemToCart} from'../ItemDetailAction'

class ItemDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginInfo:
                { email: "", password: "", rememberMe: false }
        };
    }




    onAddToCartClick=  (item) =>{
        this.props.addItemToCart(item)
    }
    render() {
        const paramater = this.props.match.params.key

        const { item } = this.props;


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

                            <Button size="large" onClick={(e)=>this.onAddToCartClick(item)}> ADD TO CART </Button>
                          
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

const mapStateToProps = state => {
    // Handle state to update UI

    return {
        item: {
            "id": 2,
            "createdAt": "2017-12-04T16:01:04",
            "createdBy": "admin",
            "modifiedAt": "2017-12-04T16:01:03",
            "name": "Galaxy S8",
            "itemCode": "SS01",
            "quantity": 121,
            "price": 1221200000,
            "storeId": {
                "id": 1,
                "createdAt": "2017-12-03T15:58:00",
                "storeCode": "STORE01",
                "name": "ATT Shop",
                "address": "123 abc q11 ",
                "phone": "081236435",
                "activated": true
            },
            "uomId": {
                "id": 1,
                "createdAt": "2017-12-03T15:58:00",
                "name": "Each",
                "unitAmount": 1
            },
            "typeId": {
                "id": 1,
                "createdAt": "2017-12-03T15:58:00",
                "name": "Phone",
                "description": "phone type",
                "activated": true
            },
            "activated": true,
            "size": 0,
            "ranking": 0
        }

    }

}
const mapDispatchToProps = dispatch => ({
    addItemToCart: (item) => {
        dispatch(addItemToCart(item))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ItemDetail);

