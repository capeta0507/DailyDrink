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
          id: 1566699818972,
          name: "珍珠奶茶",
          unitPrice: 30,
          num: 4,
          price: 120,
          remarks: "感謝"
        },
        { 
          id: 1566699818973,
          name: "多多綠",
          unitPrice: 45,
          num: 2,
          price: 90,
          remarks: "感謝"
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
   
    var myid = id;
    let order = this.state.getOrder
    console.log('order', order)

    var myIndex = find_id(myid);
    if (myIndex >=0){
      console.log("myIndex => ",myIndex);
      // console.log(orders[myIndex].name); 
       let newGetOrder = this.state.getOrder;
       let splicorder = newGetOrder.splice(myIndex,1);
       console.log('splicorder', splicorder)
      this.setState({
        getOrder : newGetOrder
      })  
      
    }else {
        console.log("data not found ...",myIndex);
    }

    function find_id(xid) {
      for(let x=0;x<order.length;x++){
        // console.log(orders[x]);
        console.log("for loop x -> ",x);
        if (order[x].id === xid) {
            // console.log("find the data..." , x);
            return x;
        }
      }
      return -1;
    }
  }
  myCheck = (data) => {
    console.log(data)
    this.setState({
      orderItem: data
    })
  }
  myUpdate = (xid, xdrink, xunitPrice, xnum, xprice, xremarks) => {
    console.log(xid)
    let newOrder = this.state.getOrder;
    let order = this.state.getOrder;
    var myIndex = find_id(xid);
    if (myIndex >=0){
      console.log("myIndex => ",myIndex);
      let neworder = this.state.getOrder;
      console.log('neworder', neworder[myIndex])
      neworder[myIndex].id = xid
      neworder[myIndex].name = xdrink
      neworder[myIndex].unitPrice = xunitPrice
      neworder[myIndex].num = xnum
      neworder[myIndex].price = xprice
      neworder[myIndex].remarks = xremarks
      this.setState({
        getOrder: neworder
      })
      // console.log(orders[myIndex].name);
    }else {
        console.log("data not found ...",myIndex);
    }

    function find_id(id) {
      console.log('find', id)
      for(let x=0;x<order.length;x++){
        // console.log(orders[x]);
        console.log("for loop x -> ",x, order[x].id, id);
        if (order[x].id == id) {
            // console.log("find the data..." , x);
            return x;
        }
      }
      return -1;
    }
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
