import React from 'react';

import { Row } from 'antd';
import CartLayOut from '../component/CartLayout'
import { connect } from 'react-redux';
import ListItemCart from '../component/ListItemCart'

class Cart extends React.Component {
    constructor() {
        super();

    }
    render() {
        const { cart, itemTypes, brands } = this.props
  
        return (

            <div style={{background:"white", margin : 5, padding :10}}>
                        <CartLayOut >
                            <ListItemCart items={cart}  />
                            <h1> Tong so tien </h1>
                        </CartLayOut >
                    
            </div>
        );
    }
};


const mapStateToProps = (state) => {
    return {
        cart :  state.cartReducer.cart
    }
}
export default connect(mapStateToProps)(Cart);