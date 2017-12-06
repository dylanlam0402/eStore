
import React from 'react'
import * as State from '../types/State'
import _ from  'lodash'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';

export default class EditableTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data : this.props.data
      };
 
      
    }
    componentWillReceiveProps = (nextProps)=>{
      if(nextProps.data !== this.props.data){
          this.setState({data : nextProps.data})
      }
    }
 
    render() {
      const { isLoading, handleChange, columns } = this.props;
      const {data} = this.state || []
      let dataSource = Object.assign([],data.filter(function(element){
        return element.state !== State.DELETED
      }))
      return(<Table 
      size="middle" 
      bordered dataSource={dataSource} 
      onChange={handleChange} 
      isLoading={isLoading} 
      columns={columns} />)
    }
  }