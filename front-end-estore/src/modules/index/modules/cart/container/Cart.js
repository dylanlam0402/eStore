import React from 'react';

import { Row , Form} from 'antd';
import CartLayOut from '../component/CartLayout'
import { connect } from 'react-redux';
import ListItemCart from '../component/ListItemCart';
import PaymentForm from '../component/PaymentForm';
import { saveOrder} from '../CartAction';


const PaymentFormWrapper = Form.create()(PaymentForm);
class Cart extends React.Component {
    constructor(props) {
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

    calcQty = (cart) =>{
        let qty = 0;
        cart.forEach(element =>{
            qty += element.cartQty
        })
        return qty;
    }
    handleSubmitForm = (e) => {
        e.preventDefault();
        const {cart} = this.props
        const price =  this.calcTotal(cart);
        const qty = this.calcQty(cart);
        const details = []
        const orderDetail = cart.forEach(element =>{
            let detail = { itemsId : element, qty : element.cartQty ,totalPrice : element.cartQty * element.price}
            details.push(detail);
        });
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            const customer = { 
                firstName : values.firstName,
                lastName : values.lastName,
                address : values.address,
                phoneNumber : values.phonenumber,
                city : values.city         
            }

            const orderDto = {order : { totalPrice : price, totalQty : qty, payment_id : values.paymentId }, orderDetails : details   }
            this.props.saveOrder(customer,orderDto);
          }
        });
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
const mapDispatchToProps = dispatch => ({
    saveOrder: (customer,order) => {
        dispatch(saveOrder(customer, order));
    },
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);