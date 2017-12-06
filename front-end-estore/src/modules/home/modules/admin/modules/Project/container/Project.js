import React from 'react';


import { connect } from 'react-redux'
import { Form, Select, Popconfirm, Button, Icon, Spin, Table, Alert} from 'antd'
import EditableTable from '../../../../../../../components/EditableTable'
import EditableCell from '../../../../../../../components/EditableCell'
import CardView from '../../../../../../../components/CardView'
import ToolsBar from '../../../../../../../components/ToolsBar'

import * as State from '../../../../../../../types/State'
import * as InputType from '../../../../../../../types/InputType'
import _ from 'lodash'
import { getProjects , saveProjects} from '../ProjectAction'

import Notification, {notify} from 'react-notify-toast';

const TAG = "projects"

 
class Project extends React.Component {

  constructor(props) {
    super(props);

  }

  state = {
    data: this.props.data, filteredInfo: null, sortedInfo: null
  }

  componentDidMount() {
    const { getProjects } = this.props;
    if (this.state.data === undefined ) {
      getProjects();
 
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.projects !== nextProps.projects) {
      let projects = nextProps.projects || []
      this.setState({
        data: projects
      });
    }
    
  }
  componentDidCatch = (error) => {
      return (<h1>Some thing went wrong</h1>)
  }

  onDiscard = () => {
    this.props.getProjects()

  }

  onSaveChanges = () => {
    const {data} = this.state
    const project = Object.assign([], data.filter(function (element) {
      return element.state !== State.NONE
    }));
    saveProjects(project);

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

    if (target.state === State.ADDED) {
      const newData = data.filter((e) => e != target);
      this.setState({ data: newData })
    }
    else {
      target.state = State.DELETED;
      this.setState({ data })
    }
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
    target[key] = value
    if (target.state !== State.ADDED || target.state !== State.EDITED) {
      target.state = State.EDITED
    }
    this.setState({ data });
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
    _.forEach(this.state.data, function (element) {
      let object = { text: element[column], value: element[column] };
      options.push(object);
    })
    return options
  }
 
  render() {
    const { projects, users, isLoading, errors ,isSaving} = this.props;
    const data = this.state.data || [];
    let columns = [];
    const selectionType = {
      options: users,
      mode: "tags",
      placeholder: 'Please select a user'
    }
    const dataSource = Object.assign([], data.filter(function (element) {
      return element.state !== State.DELETED
    }));

    const inputTextType = {
      placeholder: '',
      rules: []
    }
    if (dataSource.length != 0) {
      columns = [{
        title: 'Project Name',
        dataIndex: 'name',
        width: '20%',
        filters: this.renderFilterOption("name"),
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => { return a.name.localeCompare(b.name) }, // localeCompare is Alphabet Sort
        render: (text, record, index) => this.renderColumns(text, record, 'name', InputType.INPUT_TEXT, inputTextType),

      }, {
        title: 'adminRoles',
        dataIndex: 'adminRoles',
        width: '30%',
        render: (text, record, index) => this.renderColumns(text, record, 'adminRoles', InputType.SINGLE_SELECT, selectionType),
      },
      {
        title: 'devRoles',
        dataIndex: 'devRoles',
        width: '30%',
        render: (text, record, index) => this.renderColumns(text, record, 'devRoles', InputType.SINGLE_SELECT, selectionType),
      }
        , {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record, index) => {
          return (
            <div className="editable-row-operations">
              {
                <span>

                  <Popconfirm title="Sure to delete?"
                    okText="OK" cancelText="Cancel"
                    onConfirm={() => { this.delete(record.id) }}>
                    &nbsp;<Button shape="circle" icon="delete"></Button>
                  </Popconfirm>
                </span>

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
         {  errors !== undefined &&  <Alert type="error" style={{zIndex:5000}} message={errors[0].message} closeText="Close" banner />}
        <Table
          isLoading={isLoading}
          columns={columns}
          dataSource={dataSource} />
          
        <ToolsBar isSaving={isSaving} onSaveChanges={this.onSaveChanges.bind(this)} onDiscard={this.onDiscard.bind(this)} />
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          sdj,áhdkjahsdasjkdhasdasdasdjkasd <br/>
          

      </div>
    )
  }
}


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

  getProjects: () => {
    dispatch(getProjects());
  },
  saveProjects : (projects) =>{
    dispatch(getProjects());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Project);