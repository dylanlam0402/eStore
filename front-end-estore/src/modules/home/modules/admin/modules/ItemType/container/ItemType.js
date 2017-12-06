import React from 'react'; 
import {Button} from 'antd';
import {connect} from 'react-redux';
import {Link}   from 'react-router-dom'
import { saveItemType } from '../ItemTypeAction';
class ItemType extends React.Component{
    constructor() {
        super();
    }
    onClick = (e) =>{
        this.props.saveItemType({ name : "type01"});
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
      users: state.userReducer.data,
      projects: state.projectReducer.data,
      isLoading: state.projectReducer.isLoading,
      errors: state.projectReducer.errors,
      isSaving : state.projectReducer.isSaving !== undefined || false,
    }
  }
  const mapDispatchToProps = dispatch => ({
    saveItemType : (ItemType) =>{
        dispatch(saveItemType(ItemType));
      },
    
  })
export default connect(null,mapDispatchToProps)(ItemType);