import React, { Component } from 'react';
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'

import '../styles/customerDetailsModal.css'

class CustomerDetailsModal  extends Component {

  render() {
    return (
      <Modal visible={this.props.isOpen} onCancel={() => this.props.closeModal()} title="Create New Invoice" footer={this.props.footer}>
        <div className="modal-container">
          <div style={{display: 'flex'}}>
            <div style={{width: '90%'}}>
              Customer Details
            </div>
            <Button key="skip" type="secondary" onClick={this.props.onSkip}>
              SKIP
            </Button>
          </div>
          <div>
            <div className="details-container">
              <div style={{width: '50%'}}>
                <div className="details-heading">
                  Full Name
                </div>
                <div>
                  <Input onChange={(value) => this.props.changeCustomerDetails(value, 'fullName')} placeholder="Full Name" />
                </div>
              </div>
              <div style={{marginLeft: 30, width: '50%'}}>
                <div className="details-heading">
                  Phone Number
                </div>
                <div>
                  <Input onChange={(value) => this.props.changeCustomerDetails(value, 'phone')} placeholder="Phone" />
                </div>
              </div>
            </div>
            <div className="details-container">
              <div style={{width: '47%'}}>
                <div className="details-heading">
                  Address
                </div>
                <div>
                  <Input.TextArea onChange={(value) => this.props.changeCustomerDetails(value, 'address')} placeholder="Address" style={{resize:"none", width: '100%'}} rows="5"/>
                </div>
              </div>
              <div style={{width: '53%'}}>
                <div style={{marginLeft: 30}}>
                  <div className="details-heading">
                    Email ID
                  </div>
                  <div>
                    <Input onChange={(value) => this.props.changeCustomerDetails(value, 'email')} placeholder="Email ID" />
                  </div>
                </div>
                <div style={{marginLeft: 30, marginTop: 25}}>
                  <div className="details-heading">
                    Pincode
                  </div>
                  <div>
                    <Input onChange={(value) => this.props.changeCustomerDetails(value, 'pincode')} placeholder="Pincode" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {this.props.showError && <div style={{fontSize: 15, color: 'red'}}>Please enter all the customer details or skip this section</div>}
          </div>
        </div>
      </Modal>
    );
  }
}

export default CustomerDetailsModal;
