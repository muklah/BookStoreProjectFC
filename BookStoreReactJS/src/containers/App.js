import React, { Component } from 'react';
import {BrowserRouter , Route} from 'react-router-dom';
import './App.css';
import Content from '../components/Content/Content';
import Navbar from '../components/Navbar/Navbar';
import Provider, { Store } from '../store';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Upload from '../components/Upload/Upload';

class App extends Component {
  static contextType = Store;
  render() {
    
    return (
    <Provider>
      <div className="App">
          
          <BrowserRouter>
            <React.Fragment>
             <Navbar/>
             <Route path="/" exact  component={Content} />
             <Route path="/login" exact  component={Login} />
             <Route path="/register" exact  component={Register} />
             <Route path="/upload" exact  component={Upload} />
            </React.Fragment>
          </BrowserRouter>
      </div>
    </Provider>
    );
  }
}

export default App;
