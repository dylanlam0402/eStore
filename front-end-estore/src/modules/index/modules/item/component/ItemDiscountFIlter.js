import React from 'react';
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Layout,  Icon, Row ,Radio} from 'antd';


const RadioGroup = Radio.Group;
class ItemDiscountFIlter extends React.Component {
    constructor() {
        super();
    }
  
 


    render() {
        const { itemtypes, onFilterItemDiscount } = this.props;
        const count = 0;
        return (
            <div>
                <Row>
                    <RadioGroup onChange={onFilterItemDiscount}  >
                        <Radio  value={0} style={{display :"block"}}>All</Radio>
                        <Radio  value={40} style={{display :"block"}}>40%</Radio>
                        <Radio  value={30} style={{display :"block"}}>30%</Radio>
                        <Radio  value={10} style={{display :"block"}}>10%</Radio>
                    </RadioGroup>
                </Row>
            </div>
        );
    }
};

export default ItemDiscountFIlter;