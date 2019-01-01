import React, { Component } from 'react';
const Store = React.createContext();

export default class Provider extends Component {
  constructor(props) {
    super(props);
    this.state={
      
      user: JSON.parse(localStorage.getItem("user") || "{}"),
      saveUser:this.saveUser,
      logOut:this.logOut
    }
}
  saveUser=({user})=>{
    this.setState({user})
  }
  logOut= () =>{
    this.setState({user:{}});
    localStorage.removeItem("user");
  }
  render() {
    return (
      <Store.Provider value={this.state}>
        {this.props.children}
      </Store.Provider>
    )
  }
}
export {Store};
