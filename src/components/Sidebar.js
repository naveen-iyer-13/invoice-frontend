import React, { Component } from 'react';
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import '../styles/sidebar.css';
import {getData} from '../redux/actions'
import {setData} from '../redux/actions'
import {connect} from 'react-redux'
// import axios from 'axios'
import SidebarElement from './SidebarElement'
// const Search = Input.Search

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedId: 0,
      filterValue: '',
      dataSet: props.dataSet ? props.dataSet : []
    }
    this.onSelect = this.onSelect.bind(this)
  }

  componentDidMount() {
    this.props.getData()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dataSet: nextProps.dataSet, selectedId: nextProps.dataSet[0].id})
    this.props.setData(nextProps.dataSet[0])
  }

  onSelect(id) {
    var data = this.state.dataSet.filter(selected => {
      if (selected.id === id) {
        return selected
      }
    })
    this.props.setData(data[0])
    this.setState({selectedId: id})
  }

  render() {
    var sidebarElement = this.state.dataSet.map((element, index) => {
      var isSelected = false
      if (element.id.toString().includes(this.state.filterValue)) {
        if (this.state.selectedId === element.id) {
          isSelected = true
        }
        return (
          <SidebarElement data={element} key={index} isSelected={isSelected} onSelect={this.onSelect}/>
        )
      }
    })
    return (
      <div className="sidebar">
        <div className="search-container">
          <div>
          <Input
            placeholder="Search by invoice id"
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => this.setState({filterValue: e.target.value})}
          />
          </div>
          <div className="invoice-count">
            <span>
              Invoices - {this.state.dataSet.length}
            </span>
          </div>
        </div>
        <div className="sidebar-element-container">
          {sidebarElement}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return(
    {dataSet: state.dataSet}
  )
}


const mapDispatchToProps = {
  getData,
  setData
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
