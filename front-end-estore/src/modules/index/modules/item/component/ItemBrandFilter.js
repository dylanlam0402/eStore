import React from 'react';
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Layout, Icon, Row, Radio } from 'antd';


const RadioGroup = Radio.Group;
class ItemBrandFilter extends React.Component {
    constructor() {
        super();
    }


    renderRadioBrand(brands) {
        let menu = [];
        if (brands !== undefined && brands.length > 0) {
            brands.forEach(element => {
                menu.push(<Radio style={{ display: "block" }} value={element}>{element}</Radio>)
            });
        }
        return menu;
    }

    render() {
        const { brands, onFilterBrand } = this.props;
        return (
            <div>
                <Row>
                    <RadioGroup onChange={onFilterBrand}  defaultValue={null}>
                        <Radio value={null} style={{ display: "block" }}>All</Radio>
                        {this.renderRadioBrand(brands) || null}
                    </RadioGroup>
                </Row>
            </div>
        );
    }
};

export default ItemBrandFilter;