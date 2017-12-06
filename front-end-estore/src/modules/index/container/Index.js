import React from 'react';
import IndexLayout from '../component/IndexLayout'

import Item from '../modules/item/container/Item'
import Cart from '../modules/cart/container/Cart'
import ItemDetail from '../modules/item/container/ItemDetail'
import {Switch, Route, Redirect} from 'react-router-dom'
import Shopping from '../modules/shopping/container/Shopping'
import {security} from '../../../utils/security'

class Index extends React.Component{
    constructor() {
        super();
    }
   
    render() {
          
        return (
            <div>
                <IndexLayout >
                    <div>
                   
                    <Route path='/shopping' component={Shopping}/ > 
                    <Route path='/cart' component={Cart}/ > 
                    <Route exact path='/items' component={Item}/ >  
                    <Route exact path='/items/:key' render={(props)=><ItemDetail {...props}/>}/ >
                    <Route exact path="/" render={() => <Redirect to="/shopping" />} />
                    </div>
                </IndexLayout>
           
                
            </div>
        );
    }
};

export default Index;