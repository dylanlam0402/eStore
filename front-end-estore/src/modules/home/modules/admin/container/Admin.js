import React from 'react';


import { Route} from 'react-router-dom'

import { Layout } from 'antd';

import Project from '../modules/Project/container/Project'
import ItemType from '../modules/ItemType/container/ItemType'


class Admin extends React.Component {
    constructor() {
        super();
    }

    render() {
        
        return (
            <div>
                   
                   <Route path='/admin/itemtype' component={ItemType} />     
                    <Route path='/admin/project' component={Project} />          
            </div>
        )
    }
}
export default Admin