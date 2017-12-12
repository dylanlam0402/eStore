import React from 'react';

import { Row } from 'antd';
import ItemLayout from '../component/ItemLayout'
import { connect } from 'react-redux';
import ListItems from '../component/ListItems'
import ItemTypeFilter from '../component/ItemTypeFilter'
import ItemDiscountFilter from '../component/ItemDiscountFIlter'
import ItemBrandFilter from '../component/ItemBrandFilter'
import { saveItem, getItems, getBrands, filterItem } from '../ItemAction';
class Item extends React.Component {
    constructor() {
        super();
        this.state= {
            itemFiter : { brand : null, typeId : null, discount : null }
        }

    }
    state = { isRenderDetailItem: false }

    componentDidMount = ()=>{
        if(this.props.items.length == 0) {
            this.props.getItems()
        }
        this.props.getBrands()
    }
    onFilterItemDiscount = (e) => {
        const itemFiter = {...this.state.itemFiter}
        itemFiter.discount = e.target.value;
        this.props.filterItem(itemFiter);
        this.setState(itemFiter)
     
     
    }
    onFilterItemType = (e) => {

        
        const itemFiter = {...this.state.itemFiter}
        itemFiter.typeId = e.target.value;
        this.props.filterItem(itemFiter);
        this.setState(itemFiter)
    }
    onFilterBrand = (e) => {
       
        const itemFiter = {...this.state.itemFiter}
        itemFiter.brand = e.target.value;
        this.props.filterItem(itemFiter);
        this.setState(itemFiter);
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
        brands: state.itemReducer.brands,
        itemTypes: state.itemTypeReducer.data,
        items : state.itemReducer.items || []
    }
}

const mapDispatchToProps = dispatch => ({
    
  
      getItems: () => {
        dispatch(getItems());
      },
      getBrands: () => {
        dispatch(getBrands());
      },
      saveItem : (item) =>{
        dispatch(saveItem(item));
      },
      filterItem: (itemFilter) => {
        dispatch(filterItem(itemFilter));
      },
    })
export default connect(mapStateToProps, mapDispatchToProps)(Item);