import React from 'react';

import { Row } from 'antd';
import ItemLayout from '../component/ItemLayout'
import { connect } from 'react-redux';
import ListItems from '../component/ListItems'
import ItemTypeFilter from '../component/ItemTypeFilter'
import ItemDiscountFilter from '../component/ItemDiscountFIlter'
import ItemBrandFilter from '../component/ItemBrandFilter'
class Item extends React.Component {
    constructor() {
        super();

    }
    state = { isRenderDetailItem: false }

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
        itemTypes: [
            {
                "id": 1,
                "createdAt": "2017-12-03T15:58:00",
                "name": "Phone",
                "description": "phone type",
                "activated": true
            },
            {
                "id": 2,
                "createdAt": "2017-12-03T15:58:00",
                "name": "Tablet",
                "description": "tablet type",
                "activated": true
            }
        ],
        items: [
            {
                "id": 1,
                "createdAt": "2017-12-03T15:58:00",
                "name": "Galaxy S7",
                "itemCode": "SS01",
                "quantity": 12,
                "price": 1200000,
                "storeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "storeCode": "STORE01",
                    "name": "ATT Shop",
                    "address": "123 abc q11 ",
                    "phone": "081236435",
                    "activated": true
                },
                "uomId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Each",
                    "unitAmount": 1
                },
                "typeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Phone",
                    "description": "phone type",
                    "activated": true
                },
                "activated": true,
                "size": 0,
                "ranking": 0
            },
            {
                "id": 2,
                "createdAt": "2017-12-04T16:01:04",
                "createdBy": "admin",
                "modifiedAt": "2017-12-04T16:01:03",
                "name": "Galaxy S8",
                "itemCode": "SS01",
                "quantity": 121,
                "price": 1221200000,
                "storeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "storeCode": "STORE01",
                    "name": "ATT Shop",
                    "address": "123 abc q11 ",
                    "phone": "081236435",
                    "activated": true
                },
                "uomId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Each",
                    "unitAmount": 1
                },
                "typeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Phone",
                    "description": "phone type",
                    "activated": true
                },
                "activated": true,
                "size": 0,
                "ranking": 0
            },
            {
                "id": 3,
                "createdAt": "2017-12-04T16:01:16",
                "createdBy": "admin",
                "modifiedAt": "2017-12-04T16:01:16",
                "name": "Galaxy s9",
                "itemCode": "SS01",
                "quantity": 53,
                "price": 14353200100,
                "storeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "storeCode": "STORE01",
                    "name": "ATT Shop",
                    "address": "123 abc q11 ",
                    "phone": "081236435",
                    "activated": true
                },
                "uomId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Each",
                    "unitAmount": 1
                },
                "typeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Phone",
                    "description": "phone type",
                    "activated": true
                },
                "activated": true,
                "size": 0,
                "ranking": 0
            },
            {
                "id": 4,
                "createdAt": "2017-12-04T16:01:32",
                "createdBy": "admin",
                "modifiedAt": "2017-12-04T16:01:32",
                "name": "Galaxy s10",
                "itemCode": "SS03",
                "quantity": 67,
                "price": 456456000,
                "storeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "storeCode": "STORE01",
                    "name": "ATT Shop",
                    "address": "123 abc q11 ",
                    "phone": "081236435",
                    "activated": true
                },
                "uomId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Each",
                    "unitAmount": 1
                },
                "typeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Phone",
                    "description": "phone type",
                    "activated": true
                },
                "activated": true,
                "size": 0,
                "ranking": 0
            },
            {
                "id": 5,
                "createdAt": "2017-12-04T16:01:46",
                "createdBy": "admin",
                "modifiedAt": "2017-12-04T16:01:46",
                "name": "Galaxy s99",
                "itemCode": "SS04",
                "quantity": 57,
                "price": 3457999870,
                "storeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "storeCode": "STORE01",
                    "name": "ATT Shop",
                    "address": "123 abc q11 ",
                    "phone": "081236435",
                    "activated": true
                },
                "uomId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Each",
                    "unitAmount": 1
                },
                "typeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Phone",
                    "description": "phone type",
                    "activated": true
                },
                "activated": true,
                "size": 0,
                "ranking": 0
            },
            {
                "id": 6,
                "createdAt": "2017-12-05T10:01:42",
                "createdBy": "admin",
                "modifiedAt": "2017-12-05T10:01:41",
                "name": "Iphone 7",
                "itemCode": "IP01",
                "quantity": 27,
                "price": 900000000,
                "storeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "storeCode": "STORE01",
                    "name": "ATT Shop",
                    "address": "123 abc q11 ",
                    "phone": "081236435",
                    "activated": true
                },
                "uomId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Each",
                    "unitAmount": 1
                },
                "typeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Phone",
                    "description": "phone type",
                    "activated": true
                },
                "activated": true,
                "size": 0,
                "ranking": 0
            },
            {
                "id": 7,
                "createdAt": "2017-12-05T10:02:14",
                "createdBy": "admin",
                "modifiedAt": "2017-12-05T10:02:13",
                "name": "Iphone 8+",
                "itemCode": "IP03",
                "quantity": 32,
                "price": 900000000,
                "storeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "storeCode": "STORE01",
                    "name": "ATT Shop",
                    "address": "123 abc q11 ",
                    "phone": "081236435",
                    "activated": true
                },
                "uomId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Each",
                    "unitAmount": 1
                },
                "typeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Phone",
                    "description": "phone type",
                    "activated": true
                },
                "activated": true,
                "size": 0,
                "ranking": 0
            },
            {
                "id": 8,
                "createdAt": "2017-12-05T10:02:28",
                "createdBy": "admin",
                "modifiedAt": "2017-12-05T10:02:28",
                "name": "Iphone X",
                "itemCode": "IP04",
                "quantity": 32,
                "price": 299999986000,
                "storeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "storeCode": "STORE01",
                    "name": "ATT Shop",
                    "address": "123 abc q11 ",
                    "phone": "081236435",
                    "activated": true
                },
                "uomId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Each",
                    "unitAmount": 1
                },
                "typeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Phone",
                    "description": "phone type",
                    "activated": true
                },
                "activated": true,
                "size": 0,
                "ranking": 0
            },
            {
                "id": 9,
                "createdAt": "2017-12-05T10:02:58",
                "createdBy": "admin",
                "modifiedAt": "2017-12-05T10:02:58",
                "name": "Ban Chai Danh Rang",
                "itemCode": "BCR01",
                "quantity": 32,
                "price": 1000000,
                "storeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "storeCode": "STORE01",
                    "name": "ATT Shop",
                    "address": "123 abc q11 ",
                    "phone": "081236435",
                    "activated": true
                },
                "uomId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Each",
                    "unitAmount": 1
                },
                "typeId": {
                    "id": 1,
                    "createdAt": "2017-12-03T15:58:00",
                    "name": "Phone",
                    "description": "phone type",
                    "activated": true
                },
                "activated": true,
                "size": 0,
                "ranking": 0
            },

        ],

    }
}
export default connect(mapStateToProps)(Item);