import React from 'react'; 

import {connect} from 'react-redux';
import {Link}   from 'react-router-dom'




import { Form, Select, Popconfirm, Button, Icon, Spin, Table, Alert} from 'antd'
import EditableTable from '../../../../../../../components/EditableTable'
import EditableCell from '../../../../../../../components/EditableCell'



import * as InputType from '../../../../../../../types/InputType'

import { getItemTypes ,saveItemType, deleteItemType} from '../ItemTypeAction';
class ItemType extends React.Component{
   
  constructor(props) {
    super(props);

  }

  state = {
    data: this.props.itemTypes, filteredInfo: null, sortedInfo: null
  }

  componentDidMount() {
    const { getItemTypes } = this.props;
    if (this.state.data === undefined ) {
        getItemTypes()
            
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.itemTypes !== nextProps.itemTypes) {
      let itemTypes = nextProps.itemTypes || []
      this.setState({
        data: itemTypes
      });
    }
    
  }
  componentDidCatch = (error) => {
      return (<h1>Some thing went wrong</h1>)
  }



  clearFilters = () => {
    this.setState({ filteredInfo: null });
  }
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }

  

  delete(id) {
    const { data } = this.state;
    const target = data.filter(item => id === item.id)[0];
    this.props.deleteItemType(target);
    this.setState({data})
  }

  // develop Adding feature : uncmt this
  // add = ()=>{
  //     const {data} = this.state
  //     const currentData =[...data,{ id : null, name : null,  users : null, state : State.ADDED}] 
  //     this.setState({data : currentData})
  // }

  handleChange(key, id, value) {
    const { data } = this.state;
    const target = data.filter(item => id === item.id)[0];
    target[key] = value;

    this.setState({ data });
  }
  saveItemType =(id) =>{
    const { data } = this.state;
    const target = data.filter(item => id === item.id)[0];
    this.props.saveItemType(target);
    this.setState({data})
  }



  renderColumns = (text, record, column, type, input) => {
    return (
      <div>
        <EditableCell
          rules={input.rules || []}
          type={type}
          value={text}
          input={input}
          onChange={value => this.handleChange(column, record.id, value)}
        />
      </div>);
  }

  handleTableChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }


  renderFilterOption = (column) => {
    let options = [];
    this.state.data.forEach(function (element) {
      let object = { text: element[column], value: element[column] };
      options.push(object);
    })
    return options
  }
 
  render() {
    const { itemTypes, users, isLoading, errors ,isSaving} = this.props;
    const data = this.state.data || [];
    let columns = [];
    const selectionType = {
      options: users,
      mode: "tags",
      placeholder: 'Please select a user'
    }


    const inputTextType = {
      placeholder: '',
      rules: []
    }
    if (data.length != 0) {
      columns = [{
        title: 'Name',
        dataIndex: 'name',
        width: '20%',
        filters: this.renderFilterOption("name"),
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => { return a.name.localeCompare(b.name) }, // localeCompare is Alphabet Sort
        render: (text, record, index) => this.renderColumns(text, record, 'name', InputType.INPUT_TEXT, inputTextType),

      }, {
        title: 'Description',
        dataIndex: 'description',
        width: '30%',
        render: (text, record, index) => this.renderColumns(text, record, 'description', InputType.INPUT_TEXT, inputTextType),
      },
        , {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record, index) => {
          return (
            <div className="editable-row-operations">
              {
                <div>
                <span>

                  <Popconfirm title="Sure to delete?"
                    okText="OK" cancelText="Cancel"
                    onConfirm={() => { this.delete(record.id) }}>
                    &nbsp;<Button shape="circle" icon="delete"></Button>
                  </Popconfirm>

                </span>
                &nbsp;
                <span>
                    <Button icon="save" shape="circle" onClick={(e)=>{this.saveItemType(record.id)}}> </Button>
                </span>
                </div>
              }
            </div>
          );
        },
      }];
    }
    else {
      columns = [{ title: 'message', dataIndex: 'message', key: 'message' }]
    }
    if (isLoading) {
      return (<div className="loadingPage"><Spin tip="loading" size="large" /></div>)
    }
    

    return (
      <div>
        
        <Table
          isLoading={isLoading}
          columns={columns}
          dataSource={data} />
          
        
          

      </div>
    )
  }
}
const mapStateToProps = (state) => {
    return {
        itemTypes : state.itemTypeReducer.data

    }
  }
  const mapDispatchToProps = dispatch => ({
    saveItemType : (itemType) =>{
        dispatch(saveItemType(itemType));
      },
      getItemTypes : ()=>{
          dispatch(getItemTypes())
      },
      deleteItemType : (itemType)=>{
        dispatch(deleteItemType(itemType))
    }
  })
export default connect(mapStateToProps,mapDispatchToProps)(ItemType);