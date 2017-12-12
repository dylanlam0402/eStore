import React from 'react';


import { Route} from 'react-router-dom'

import { Layout } from 'antd';

import Project from '../modules/Project/container/Project'
import ItemType from '../modules/ItemType/container/ItemType'
import Item from '../modules/Item/container/Item'

class Admin extends React.Component {
    constructor() {
        super();
    }

    render() {
        
        return (
            <div>
                   
                   <Route path='/admin/itemtype' component={ItemType} />     
                    <Route path='/admin/project' component={Project} />         
                    <Route path='/admin/item' component={Item} />   
            </div>
        )
    }
}
export default Admin