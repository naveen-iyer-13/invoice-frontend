import React, {Component} from 'react'
import {connect} from 'react-redux'
import './styles/list.css'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import CustomerDetailsModal from './components/CustomerDetailsModal'
import AddProductsModal from './components/AddProductsModal'
import columns from './constants'
import axios from 'axios'
import 'antd/dist/antd.css';
import {getData} from './redux/actions'
import {setData} from './redux/actions'

class List extends Component{
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      isCustomerOpen: false,
      selectedRow: [],
      selectedDetails: props.data,
      showError: false,
      discount: 0,
      showMinError: false,
      tax: 0,
      productDetails: [],
      customerDetails: {
        fullName: '',
        phone: '',
        address: '',
        email: '',
        pincode: ''
      }
    }
    this.closeModal=this.closeModal.bind(this)
    this.onNext=this.onNext.bind(this)
    this.onSkip=this.onSkip.bind(this)
    this.changeCustomerDetails=this.changeCustomerDetails.bind(this)
    this.onBack=this.onBack.bind(this)
    this.submitData=this.submitData.bind(this)
    this.setValue=this.setValue.bind(this)
    this.submitInvoice=this.submitInvoice.bind(this)
  }

  changeCustomerDetails(e, key) {
    var customerDetails = this.state.customerDetails
    customerDetails[key] = e.target.value
    this.setState({customerDetails: customerDetails})
  }

  submitData(data) {
    this.setState({productDetails: data})
  }

  setValue(key, value) {
    this.setState({[key] : value})
  }

  submitInvoice() {
    if (this.state.productDetails.length === 0) {
      this.setState({showMinError: true})
    }
    else {
      this.setState({showMinError: false})
      axios.post('https://fathomless-everglades-46245.herokuapp.com/invoice', {
        products: this.state.productDetails,
        customerDetails: this.state.customerDetails,
        tax: this.state.tax,
        discount: this.state.discount
      })
      .then((response) => {
        this.setState({productDetails: [], customerDetails: {
          fullName: '',
          phone: '',
          address: '',
          email: '',
          pincode: ''
        }, tax: 0, discount: 0, isOpen: false})
        this.props.getData()
      })
    }
  }

  componentDidMount() {
    // this.props.getData()
    // setInterval(() => this.props.getData(), 20000)
  }

  closeModal() {
    this.setState({isOpen: false, isCustomerOpen: false})
  }

  onSelectRow(selectedRow) {
    this.setState({selectedRow: selectedRow, isCustomerOpen: true})
  }

  onSkip() {
    this.setState({isCustomerOpen: false, isOpen: true, showError: false})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({selectedDetails: nextProps.data})
  }

  onNext() {
    var error = false
    for (var key in this.state.customerDetails) {
      if (this.state.customerDetails[key].length === 0) {
        error = true;
        break;
      }
    }
    if (error) {
      this.setState({showError: true})
    }
    else {
      this.setState({isCustomerOpen: false, isOpen: true, showError: false})
    }
  }

  onBack() {
    this.setState({isCustomerOpen: true, isOpen: false})
  }

  render(){
    const { selectedDetails } = this.state
    var footer =
      [
        <Button key="proceed" type="primary" onClick={this.submitInvoice}>
          Save
        </Button>
      ]
    var customerFooter =
      [
        <Button key="proceed" type="primary" onClick={this.onNext}>
          Proceed
        </Button>
      ]

    var subTotalAmount = 0
    var discountAmount = 0
    var taxAmount = 0
    var grandTotal = 0
    if (selectedDetails.products) {
      selectedDetails.products.map(product => {
        subTotalAmount = subTotalAmount + product.price
      })
    }
    discountAmount = (subTotalAmount*selectedDetails.discount/100)
    taxAmount = (subTotalAmount*selectedDetails.tax/100)
    grandTotal = subTotalAmount + taxAmount - discountAmount
    return(
      <div style={{padding: '100px', position: 'relative'}} className="container">
        <div style={{display: 'flex', marginTop: 30, marginBottom: 20}} className="print-portion">
          <div style={{width: '50%'}}>
            <div style={{fontWeight: 'bolder'}}>
              INVOICE
            </div>
            <div style={{fontSize: 13}}>
              #INV - {selectedDetails && selectedDetails.id ? selectedDetails.id : ''}
            </div>
            <div style={{fontSize: 10}}>
              {selectedDetails && selectedDetails.time ? selectedDetails.time : ''}
            </div>
          </div>
          <div style={{width: '50%', float: 'right', textAlign: 'right', display: 'inline-flex'}}>
            <div style={{width: '80%', marginRight: 20}}>
              <div style={{fontSize: 10, opacity: 0.8}}>
                Customer Details
              </div>
              <div style={{fontWeight: 'bold'}}>
                {selectedDetails && selectedDetails.customerDetails ? selectedDetails.customerDetails.fullName : ''}
              </div>
              <div style={{fontSize: 10}}>
                {selectedDetails && selectedDetails.customerDetails ? selectedDetails.customerDetails.email : ''}
              </div>
            </div>
            <div style={{width: '5%'}}>
              <Button onClick={() => window.print()} className="no-print">PRINT</Button>
            </div>
          </div>
        </div>
        <Icon type="plus-circle" onClick={() => this.setState({isCustomerOpen: true})} className="add-icon no-print"/>
        <Table
          columns={columns}
          bordered={true}
          rowKey="name"
          dataSource={selectedDetails && selectedDetails.products ? selectedDetails.products : []}
          pagination={false}
        />
        <div className="price-footer">
          <div className="price-container">
            <div className="price-heading">
              Sub Total
            </div>
            <div className="price-details">
              ₹ {subTotalAmount}
            </div>
          </div>
          <div className="price-container">
            <div className="price-heading">
              Tax ({selectedDetails.tax}%)
            </div>
            <div className="price-details">
              ₹ {taxAmount}
            </div>
          </div>
          <div className="price-container">
            <div className="price-heading">
              Discount ({selectedDetails.discount}%)
            </div>
            <div className="price-details">
              ₹ {discountAmount}
            </div>
          </div>
          <div className="total-container">
            <div className="price-heading">
              Grand Total
            </div>
            <div className="price-details">
              ₹ {parseInt(grandTotal)}
            </div>
          </div>
        </div>
        <AddProductsModal customerDetails={this.state.customerDetails} showMinError={this.state.showMinError} setValue={this.setValue} submitData={this.submitData} footer={footer} selectedRow={this.state.selectedRow} closeModal={this.closeModal} isOpen={this.state.isOpen} onBack={this.onBack}/>
        <CustomerDetailsModal customerDetails={this.state.customerDetails} changeCustomerDetails={this.changeCustomerDetails} showError={this.state.showError} footer={customerFooter} selectedRow={this.state.selectedRow} closeModal={this.closeModal} onSkip={this.onSkip} isOpen={this.state.isCustomerOpen}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return(
    {data: state.data}
  )
}

const mapDispatchToProps = {
  setData,
  getData
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
