import React from 'react';
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Layout,  Icon, Row ,Radio} from 'antd';


const RadioGroup = Radio.Group;
class ItemTypeFilter extends React.Component {
    constructor() {
        super();
    }
  
 
    renderRadioItemType(itemtypes){
        let menu = [];
        if(itemtypes !== undefined && itemtypes.length >0){
            itemtypes.forEach(element => {
                menu.push(<Radio style={{display :"block"}}  value={element}>{element.name}</Radio>)
            });
        }
        return menu;
    }


    render() {
        const { itemtypes, onFilterItemType } = this.props;
        const count = 0;
        return (
            <div>
                <Row>
                    <RadioGroup onChange={onFilterItemType}  >
                        <Radio  value={itemtypes} style={{display :"block"}}>All</Radio>
                        {this.renderRadioItemType(itemtypes) || null}
                    </RadioGroup>
                </Row>
            </div>
        );
    }
};

export default ItemTypeFilter;