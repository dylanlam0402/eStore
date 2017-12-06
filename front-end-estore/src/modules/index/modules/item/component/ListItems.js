import React from 'react';
import { Icon, Card, Button ,Pagination} from 'antd';
import Iphone from '../../../../../images/iphone7.jpg'
import { connect } from 'react-redux'
import { Col } from 'antd/lib/grid';

import CardItem from './CardItem'




class ListItems extends React.Component {
    constructor() {
        super();
    }

    state ={
        page : 1,
        pageSize : 5
    }

    renderListItems(items, page, pageSize,onClickBuy){
        let listItems = [];
        const to = page * pageSize;
        const from = to - pageSize;
        for(let i = from; i< to ; i ++ ){
            items[i] !== undefined && listItems.push(
                <div style={{ float : 'left', margin : 10}}> 
                <CardItem item={items[i]} onClickBuy={onClickBuy}  />
                </div>)
        }
        return listItems;
    }

    onChange = (page, pageSize) =>{    
        this.setState({page,pageSize})
    }

    render() {
        const { items, onClickBuy } = this.props;
        const {page,pageSize} = this.state;
        return (
            <div style ={ {padding :20 }}>

                <Pagination
                current={page}
                onChange={this.onChange}
                 pageSize={pageSize} 
                 style={{ margin :20}} 
                 total={items.length || 0 }  />
                <div style={{ marginTop : 20 , padding : 10 }}>
                {this.renderListItems(items, page, pageSize,onClickBuy)}
                </div>
            </div>
        );
    }
}
export default ListItems