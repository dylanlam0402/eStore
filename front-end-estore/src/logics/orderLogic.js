import { createLogic } from 'redux-logic';
import * as ActionTypes from '../types/ActionTypes'

const orderLogic = createLogic({
    type: ActionTypes.SAVE_ORDER, // only apply this logic to this type
    latest: true, // only take latest
/*
    validate({ getState, action }, allow, reject) {
        if (true) { // can also hit server to check
          allow(action);
        } else {
          reject({ type: ActionTypes.LOGIN_SUCCESS })
        }
    },
*/
    process({ getState, action, api }, dispatch, done) {

        dispatch({ type: ActionTypes.SAVE_ORDER_REQUESTED });

        api.services.customerService.saveCustomer(action.customer)
        .then(result => {
           if(result.success){
                let orderDto  = action.order;
                orderDto.order.customerId = result.data
            
                api.services.orderService.saveOrder(orderDto).then(result=>{
                    if(result.success){
                        dispatch({ type: ActionTypes.SAVE_ORDER_SUCCESS, data : result.data });
                    }
                    else{
                        dispatch({ type: ActionTypes.SAVE_ORDER_FAILURE, errors : result.errors });
                    }
                }).then(()=>done())

           }
        })
    }
  });

  export default [
    orderLogic,
  ]