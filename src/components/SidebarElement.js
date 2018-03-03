import React, { Component } from 'react';
import '../styles/sidebarElement.css';

class SidebarElement extends Component {
  render() {
    var background = '#064273'
    if (this.props.isSelected === true) {
      background = '#066e73'
    }
    return (
      <div className="sidebar-element" style={{cursor: 'pointer', backgroundColor: background}} onClick={() => this.props.onSelect(this.props.data.id)}>
        <div>
          <span className="heading">
            INV. # - {this.props.data.id}
          </span>
          <span className="time">
            {this.props.data.time}
          </span>
        </div>
        <div className="items">
          Items - {this.props.data.products.length}
        </div>
        <div>
          <span className="customer-name">
            {this.props.data.customerDetails.fullName}
          </span>
          <span className="price">
            ₹ {parseInt(this.props.data.totalPrice)}
          </span>
        </div>
      </div>
    );
  }
}

export default SidebarElement;
