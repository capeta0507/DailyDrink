import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import DrinkList from './components/drinkList';
import DrinkForm from './components/drinkForm';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      getOrder:[
        { 
          id: 1,
          name: "珍珠奶茶",
          unitPrice: 20,
          num: 4,
          price: 80,
          remarks: ""
        }
      ],
      orderItem:{
        id:0,
        name:'',
        unitPrice: 0,
        num: 1,
        price: 0,
        remarks: ""
      }
    }
  }
  order = (xid, xdrink, xunitPrice, xnum, xprice, xremarks) => {
    // console.log(xid, xdrink, xprice, xremarks)
    let newOrder = {
      id:xid,
      name:xdrink,
      unitPrice: xunitPrice,
      num: xnum,
      price:xprice,
      remarks:xremarks
    };
    console.log('newOrder', newOrder)
    this.setState({
      getOrder : this.state.getOrder.concat(newOrder)
    })
    // console.log(this.state.getOrder)
  }
  myDelete = (id) => {
    this.setState({
      getOrder : this.state.getOrder.filter((order) => {
        return (order.id !== id)
      })
    })
  }
  myCheck = (data) => {
    console.log(data)
    this.setState({
      orderItem: data
    })
  }
  myUpdate = (xid, xdrink, xunitPrice, xnum, xprice, xremarks) => {
    console.log(xdrink)
    let newOrder = [...this.state.orderItem]
    for(let x = 0;x<newOrder.length;x++){
      if(newOrder[x].id === xid){
        newOrder[x].name= xdrink;
        newOrder[x].unitPrice= xunitPrice;
        newOrder[x].num= xnum;
        newOrder[x].price= xprice;
        newOrder[x].remarks= xremarks;
      }
    }
    this.setState({
      getOrder: newOrder
    })
    console.log('newOrder', newOrder)
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* <Switch> */}
            <Route exact path='/' render={() => (
              <DrinkList getOrder={this.state.getOrder} myDelete={this.myDelete} Check={this.myCheck}/>
            )}/>
            <Route exact path='/Form' render={(history) =>(
              <DrinkForm onHistory={history} sendOrder={this.order} orderItem={this.state.orderItem} getUpdate={this.myUpdate}/>
            )}/>
          {/* </Switch> */}
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
