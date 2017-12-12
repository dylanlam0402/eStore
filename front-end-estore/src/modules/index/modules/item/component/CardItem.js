import React from 'react';
import { Icon, Card, Button } from 'antd';
import Iphone from '../../../../../images/iphone7.jpg'
import { connect } from 'react-redux'
import { Col } from 'antd/lib/grid';
import { Redirect, withRouter } from 'react-router-dom';
import {fileApiURL} from '../../../../../config/webconfig'




class CardItem extends React.Component {
    constructor() {
        super();
    }

    onClickBuy = (e,item)=>{
        const url = "/items/"+ item.id
        this.props.history.push(url);
    }

    render() {
        const { item } = this.props
        return (
            <Card  style={{ width: 240, textAlign : 'center' }} bodyStyle={{ padding: 0 }}>
                <div className="custom-image">
                    <img alt="iphone" width="200" height="300" src={fileApiURL+item.imageUrl} />
                </div>
                <div className="custom-card">
                    <h3>Price : {item.price}</h3>
                    <p> Stock : {item.quantity}</p>
                    <Button type="primary" onClick={(e)=>{this.onClickBuy(e,item)}}> Buy Now </Button>
                </div>
            </Card>
        );
    }
}
export default withRouter(CardItem); 