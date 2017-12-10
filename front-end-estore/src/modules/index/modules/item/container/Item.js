import React from 'react';

import { Row } from 'antd';
import ItemLayout from '../component/ItemLayout'
import { connect } from 'react-redux';
import ListItems from '../component/ListItems'
import ItemTypeFilter from '../component/ItemTypeFilter'
import ItemDiscountFilter from '../component/ItemDiscountFIlter'
import ItemBrandFilter from '../component/ItemBrandFilter'
import { saveItem, getItems } from '../ItemAction';
class Item extends React.Component {
    constructor() {
        super();

    }
    state = { isRenderDetailItem: false }

    componentDidMount = ()=>{
        if(this.props.items.length == 0) {
            this.props.getItems()
        }
    }
    onFilterItemDiscount = (e) => {
        console.log(e.target.value);
    }
    onFilterItemType = (e) => {
        console.log(e.target.value);
    }
    onFilterBrand = (e) => {
        console.log(e.target.value);
    }



    render() {
        const { items, itemTypes, brands } = this.props 
        const { isRenderDetailItem } = this.state;
        return (

            <div>
                {
               
                        <ItemLayout >
                            <ListItems items={items}  />
                            <ItemDiscountFilter onFilterItemDiscount={this.onFilterItemDiscount} />
                            <ItemTypeFilter itemtypes={itemTypes} onFilterItemType={this.onFilterItemType} />
                            <ItemBrandFilter brands={brands} onFilterBrand={this.onFilterBrand} />
                        </ItemLayout >
                    
                }
            </div>
        );
    }
};


const mapStateToProps = (state) => {
        return {
        brands: ["samsung",
            "iporn"],
        itemTypes: state.itemTypeReducer.data,
        items : state.itemReducer.items || []
    }
}

const mapDispatchToProps = dispatch => ({
    
      getItems: () => {
        dispatch(getItems());
      },
      saveItem : (item) =>{
        dispatch(saveItem(item));
      }
    })
export default connect(mapStateToProps, mapDispatchToProps)(Item);