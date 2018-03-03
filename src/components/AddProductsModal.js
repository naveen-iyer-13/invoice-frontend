import React, { Component } from 'react';
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import Select from 'antd/lib/select'
import columns from '../constant'
import '../styles/addProductsModal.css'
const Option = Select.Option

var data = [
  {id: 1, name: "Beef dry fry half", price: 400},
  {id: 2, name: "Mojito", price: 500},
  {id: 3, name: "Dosa", price: 720},
  {id: 4, name: "Chicken Fry", price: 120},
  {id: 5, name: "Fried Rice", price: 78},
  {id: 6, name: "Biriyani", price: 90},
  {id: 7, name: "Vada", price: 78},
  {id: 8, name: "Beef dry fry full", price: 35},
]

class AddProductsModal  extends Component {
  constructor(props){
    super(props)
    this.state = {
      alreadySelected: [],
      quantity: 1,
      item: null,
      price: null,
      data: [],
      showError: false,
      tax: '',
      discount: ''
    }
  }

  handleSelect(value) {
    var alreadySelected = this.state.alreadySelected
    alreadySelected[alreadySelected.length] = value
    var item = data.filter(product => {
      if (product.id ===value) {
        return product
      }
    })
    var price = item[0].price*parseInt(this.state.quantity)
    this.setState({item: item[0], price: price, alreadySelected: alreadySelected})
  }

  handleQuantity(e) {
    var price = 0
    if (this.state.item !== null & e.target.value !== "") {
      price = this.state.item.price*parseInt(e.target.value)
    }
    this.setState({quantity: e.target.value, price: price})
  }

  onSubmit() {
    const {item, quantity, price} = this.state
    var data = this.state.data
    if (item && item.name && quantity && price) {
      data.push({name: item.name, id: item.id, quantity: quantity, price: price})
      this.setState({data: data, showError: false})
      this.props.submitData(data)
    }
    else {
      this.setState({showError: true})
    }
  }

  render() {
    var dropDownData = data.filter(option => {
      if (!this.state.alreadySelected.includes(option.id)) {
        return option
      }
    })
    var options = dropDownData.map(item => {
      return (
        <Option value={item.id} key={item.id}>{item.name}</Option>
      )
    })
    var subTotal = 0
    this.state.data.map(item => {
      subTotal = subTotal + item.price
    })
    return (
      <Modal visible={this.props.isOpen} onCancel={() => this.props.closeModal()} title="Create New Invoice" footer={this.props.footer}>
        <div className="modal-container">
          <div className="heading-container">
            <div className="heading-left">
              Product Details
            </div>
            <div className="heading-right-container">
              <div className="heading-right">
                Customer Details
              </div>
              <div style={{fontWeight: 'bold'}}>
                {this.props.customerDetails.fullName}
              </div>
              <div style={{fontSize: 10}}>
                {this.props.customerDetails.email}
              </div>
            </div>
            <div>
              <Button key="skip" type="secondary" onClick={this.props.onBack}>
                Edit
              </Button>
            </div>
          </div>
          <Table
            columns={columns}
            bordered={true}
            rowKey="name"
            dataSource={this.state.data}
            size="small"
          />
          <div className="input-container">
            <Select
              showSearch
              style={{ width: 750 }}
              placeholder="Please enter item name"
              optionFilterProp="name"
              onChange={(value) => this.handleSelect(value)}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
            {options}
            </Select>
            <Input placeholder="0" value={this.state.quantity} onChange={(value) => {this.handleQuantity(value)}} className="input-box"/>
            <Input placeholder="0" disabled={true} className="input-box" value={this.state.price}/>
            <Button type="primary" onClick={() => this.onSubmit()}>Enter</Button>
          </div>
          {this.state.showError && <div className="error-message">Please enter a valid item name and quantity</div>}
          {this.props.showMinError && <div className="error-message">Please select atleast one item</div>}
          <div className="footer-container">
            <Input placeholder="Tax" onChange={(e) => {this.setState({tax: e.target.value}); this.props.setValue('tax', e.target.value)}} style={{width: 100}} value={this.state.tax}/>
            <Input placeholder="Discount" onChange={(e) => {this.setState({discount: e.target.value}); this.props.setValue('discount', e.target.value)}} style={{marginLeft: 20, width: 100}} value={this.state.discount}/>
            <div className="subtotal-container">
              <span style={{width: 150, padding: 5}}>Sub Total</span>
              <Input placeholder="0" style={{marginLeft: 20}} value={subTotal}/>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddProductsModal;
