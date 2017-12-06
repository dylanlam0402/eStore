import React from 'react';
import { Icon, Card, Button } from 'antd';
import Iphone  from '../../../../../images/iphone7.jpg'
import { connect } from 'react-redux'
import { Col } from 'antd/lib/grid';




class ListRankingItem extends React.Component {
    constructor() {
        super();
    }

  
 


    renderRankingItem = () =>{
        const {rankingItems} = this.props;
        let cardViews = [];
        const gridStyle = {
            width: '20%',
            textAlign: 'center',
            margin : 20,
          };
        
        rankingItems.forEach(element => {
            
            cardViews.push(
           
                <Card.Grid style={gridStyle}>
                    <h3> {element.name} </h3>
                    <img src={Iphone} style={{width : '100%', height : '100%'} }/>
                    <p>Stock {element.quantity}</p>
                    <p>Price {element.price}</p>
                    <Button type="primary">Buy Now </Button>
                </Card.Grid>
               
            )
            
        });
        return (cardViews);

    }
    render() {
        const { rankingItems, itemTypes } = this.props
        return (
            <Card title="Top Ranking Items" style={{padding : 20, margin : 20, textAlign : 'center'}}>
              { rankingItems !== undefined && this.renderRankingItem()}
           </Card>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        rankingItems : [
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
            }
            ,
            {
                'id' : 2,
                'name' : 'iphone8',
                'quanity' : 10,
                'price' : 120000000
            },
            {
                'id' : 3,
                'name' : 'iphone XXX',
                'quanity' : 11,
                'price' : 120000000
            },
            {
                'id' : 4,
                'name' : 'bphone 2',
                'quanity' : 21,
                'price' : 1231230000
            },
            {
                'id' : 5,
                'name' : 'bphasd',
                'quanity' : 21,
                'price' : 1231230000
            }, {
                'id' : 6,
                'name' : 'bph asdasd',
                'quanity' : 21,
                'price' : 1231230000
            }, {
                'id' : 7,
                'name' : 'bphoasdasd',
                'quanity' : 21,
                'price' : 1231230000
            },
        ],
        
        
    }
}
const mapDispatchToProps = dispatch => ({
   
})
export default connect(mapStateToProps, mapDispatchToProps)(ListRankingItem)