import React from 'react'; 
import {Button} from 'antd';
import {connect} from 'react-redux';
import {Link}   from 'react-router-dom'
import { getItemTypes ,saveItemType} from '../ItemTypeAction';
class ItemType extends React.Component{
    constructor() {
        super();
    }
    onClick = (e) =>{
        this.props.getItemTypes();
    }
    

    render() {
        return (
            <div>
                   <Button onClick={this.onClick}> call api </Button>
            </div>
        );
    }
};
const mapStateToProps = (state) => {
    return {

    }
  }
  const mapDispatchToProps = dispatch => ({
    saveItemType : (ItemType) =>{
        dispatch(saveItemType(ItemType));
      },
      getItemTypes : ()=>{
          dispatch(getItemTypes())
      }
  })
export default connect(null,mapDispatchToProps)(ItemType);