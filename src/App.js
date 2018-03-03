import React, { Component } from 'react';
import { store } from './redux/store';
import {Provider} from 'react-redux'
import List from './List'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { persistStore } from 'redux-persist'

class App extends Component{

  render() {
    let persistor = persistStore(store)
    return(
      <Provider store={store} persistor={persistor}>
        <div>
          <Header />
          <div>
            <Sidebar />
            <List/>
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
