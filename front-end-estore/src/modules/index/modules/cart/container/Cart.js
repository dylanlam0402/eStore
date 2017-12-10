import React from 'react';

import { Row , Form} from 'antd';
import CartLayOut from '../component/CartLayout'
import { connect } from 'react-redux';
import ListItemCart from '../component/ListItemCart'
import PaymentForm from '../component/PaymentForm'



const PaymentFormWrapper = Form.create()(PaymentForm);
class Cart extends React.Component {
    constructor() {
        super();
       
    }

    
    initLoginForm = (form) => {
        this.form = form
    }
  
    calcTotal = (cart) =>{
        let total = 0
        cart.forEach(element => {
            total += element.price * element.cartQty;
        });
        return total;
    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
                
          }
        });
      }

    handlePaymentType =(value) =>{
        console.log(value)
    }
    render() {
        
        const { cart} = this.props
        const total = this.calcTotal(cart) || 0;
        return (

            <div >
                        <CartLayOut >
                            <ListItemCart items={cart}/>
                            <PaymentFormWrapper totalPrice={total} 
                            ref={this.initLoginForm}
                            handleSubmitForm={this.handleSubmitForm}
                            handlePaymentType={this.handlePaymentType}/>
                      
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