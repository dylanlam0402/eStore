import { Table, Input, Icon, Button, Popconfirm, Select, InputNumber, Form } from 'antd';
import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as InputType from '../types/InputType'


const Option = Select.Option
const FormItem = Form.Item
const SAVE = 'save'
const CANCEL = 'cancel'

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
      props.onChange(changedFields.input.value);
  },
  mapPropsToFields(props) {
    return {
      input: {
        ...props.value,
        value: props.value.input,
      },
    };
  },
 
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form  style={{width: '100%'}}>
      <FormItem style={{width: '100%'}}>
        {getFieldDecorator('input', {
          rules: [{ required: true, message: 'value  is required!' }],
        })(props.children)}
      </FormItem>
    </Form>
  );
});

class EditableCell extends React.Component {

  state = {
    value: this.props.value ,
    validateStatus : "success",
    message : '',
    cachedValue : this.props.value,

  }

  componentWillReceiveProps = (nextProps) =>{
    if(nextProps.value != this.props.value){
      this.setState({value : nextProps.value})
    }
  }
  shouldComponentUpdate =(nextProps,nextState) =>{
    return (nextState.value !== this.state.value || nextState.validateStatus!== this.state.validateStatus);
  }
 
  doneChange = (action) =>{
    if (this.props.onChange) {
      switch(action){
        case SAVE:
          this.props.onChange(this.state.value);
          break;
        case CANCEL :
          const {cachedValue} = this.state
          this.setState({value : cachedValue ,validateStatus: 'success', message : ''});    
          break;
        default :
          // do nothing
      }
    }
  }



  handleSelection = (e, option) => {
    const selection = e;
    const mode = this.props.input.mode
    const value = option.filter(item => selection === item.id)[0];
    switch (mode) {
      case 'multiple':
      case 'tags':
        this.saveSelectionValue(selection);
        break;
      default:
        this.setState({ value })
    }
  }

  saveSelectionValue = (selection) =>{ 
    let arraySelection = this.props.input.options    
    let value = [];
    _.forEach(selection, function (element) {
      let pattern = { id: element }
      let object = _.find(arraySelection, pattern);
      if(object!== undefined || object !== null){
        value.push(object);
      }
    }); 
    this.setState({ value });
  }

  handleInputChange = (e) =>{
    const value = e.target.value;
    if(value === null || value === ""){
      this.setState({value,validateStatus : 'error', message : 'this is required field'})
    }
    else {
      this.setState({value,validateStatus : 'success', message : ''})
    }
    
  }

  handleNumbInputChange = (e) => {
    const value = e;
    this.setState({value})
  }

  onPressEnterInputText = (e) =>{
    const value = e.target.value;
    this.setState({value})
  }


  onBlurInput = (e)=>{
    const value = e.target.value;
    if(value === "" || !value ){
      this.doneChange(CANCEL)
    }
    else{
      this.doneChange(SAVE)
    }
      
    
  }

  onBlurNumbInput = (e) =>{
    const value = e;
    if(value ==null){
        this.doneChange(CANCEL)
    }
    else{
      this.doneChange(SAVE)
    }
  }

  onBlurSelection =(e) =>{
    this.doneChange(SAVE);
  }

  onFieldsChange = (value) =>{
    this.setState({value})
  }

  renderTextInput = (textInput, value) => {
      return (
        <Input
        value={value}
        onChange={this.handleInputChange}
        onBlur={this.onBlurInput}
        />
      )
  }

  renderNumberInput = (numberInput, value) => {
    return (
    <InputNumber 
      value = { this.state.value || 0}
      size={numberInput.size || '-'}
      id={numberInput.id || null}
      style={{ width: '100%' }}
      min = {numberInput.min || 0}
      max={ numberInput.max || 1000}
      onChange={this.handleNumbInputChange}
      onBlur ={ numberInput.onBlur || this.onBlurNumbInput}
    />)
  }

  renderSelectionInput = (selectInput, values) => {
    let options = [];
    let selectedOptions = [];
    let defaultValue = null;
    selectInput.options != null && selectInput.options.forEach(function (element) {
      options.push(<Option value={element.id} >{element.name}</Option>)
    }, this);

    if(Array.isArray(values)){
      values != null && values.forEach(function (element) {
        selectedOptions.push(element.id)
      }, this);
      defaultValue = selectedOptions  
    }
    else{
      defaultValue = values.id
    }
   

    return (
      <div>
        <Select
          value={defaultValue}
          mode={selectInput.mode || '-'}
          size={options.size}
          onChange={(e)=>this.handleSelection(e,selectInput.options)}
          placeholder={selectInput.placeholder}
          style={{ width: '100%' }}
          onBlur={selectInput.onBlur || this.onBlurSelection}
        >
          {options}
        </Select>
      </div>)
  }

  renderInput = (type,input, value) =>{
    switch (type) {
      case InputType.SINGLE_SELECT:
        return ( this.renderSelectionInput(input, value))
      case InputType.INPUT_TEXT:
        return (this.renderTextInput(input, value))
      case InputType.INPUT_NUMBER:
        return this.renderNumberInput(input, value || 0)
      default:
        return (<div> {value} </div>)
  }
}
  

  render() {
    const {value, validateStatus, message} = this.state
    const { type, input , rules } = this.props


    return (
      <Form>
      <FormItem
      validateStatus={validateStatus}
      help={message }
      >
            {this.renderInput(type,input,value)}
      
      </FormItem>
      </Form>
      )
  }
   
}
export default (EditableCell)