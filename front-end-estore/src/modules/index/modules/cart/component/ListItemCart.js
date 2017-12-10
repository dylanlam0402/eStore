import React from 'react';
import {Table , Row,Pagination} from 'antd';

import ItemCart from './ItemCart'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
class ListItemCart extends React.Component {
    constructor(props) {
        super(props);
      
        this.setState({})
    }

    state ={
        page : 1,
        pageSize : 5
    }

    onChange = (page, pageSize) =>{    
        this.setState({page,pageSize})
    }
    renderListItemCart = (items,page,pageSize)=>{
        let listItems = [];
        const to = page * pageSize;
        const from = to - pageSize;
        for(let i = from; i< to ; i ++ ){
            items[i] !== undefined && listItems.push(
                <Row style={{ borderBottom : "1px solid black"}}>
                <ItemCart item={items[i]}  />
                </Row>)
        }
        return listItems;
    }

    render() {
        const { items } = this.props || [];
        const { pageSize, page} = this.state;

        return (
            <div>
                <Pagination
                current={page}
                onChange={this.onChange}
                pageSize={pageSize} 
                style={{ margin :20}} 
                total={items.length  || 0 }  />
                {
                    items.length >0 ? this.renderListItemCart(items,page, pageSize) : 
                    <div>
                        <h1> Your cart is empty, wanna buy something </h1>
                        <Link to="/items"> Shopping Now </Link>
                    </div>
                }
               
            </div>

        );
    }
}


export default  (ListItemCart)