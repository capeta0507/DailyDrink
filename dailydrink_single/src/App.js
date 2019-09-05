import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'
// import DrinkList from './components/drinkList';
import Select from 'react-select'
import './App.css';

const drink = [
  { value: '珍珠奶茶', label: '珍珠奶茶' },
  { value: '茉莉綠茶', label: '茉莉綠茶' },
  { value: '黃金烏龍', label: '黃金烏龍' },
  { value: '多多綠', label: '多多綠' },
  { value: '紅茶拿鐵', label: '紅茶拿鐵' },
  { value: '綠茶拿鐵', label: '綠茶拿鐵' },
  { value: '布丁紅茶', label: '布丁紅茶' },
  { value: '檸檬汁', label: '檸檬汁' },
  { value: '觀音奶茶', label: '觀音奶茶' },
  { value: '百香綠茶', label: '百香綠茶' }
]

const price = [
  { value: '30', label: '小杯 30' },
  { value: '45', label: '中杯 45' },
  { value: '60', label: '大杯 60' }
]

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
      },
      modalShow: false,
      method: 'C',
      // 欄位
      myid: Date.now(),
      myDrink: '',
      myUnitPrice: 0,
      myNum: 1,
      myPrice: 0,
      myRemarks: ''
    }
  }
  componentDidMount(){
    if(this.state.method === 'U' || this.state.method === 'D'){
      this.setState({
        myDrink: this.state.orderItem.name,
        myUnitPrice: this.state.orderItem.unitPrice,
        myNum: this.state.orderItem.num,
        myPrice: this.state.orderItem.price,
        myRemarks: this.state.orderItem.remarks
      })
    }
  }
  newModalShow = () => {
    this.setState({
      method: 'C',
      orderItem:{
        id:0,
        name:'',
        unitPrice: 0,
        num: 1,
        price: 0,
        remarks: ""
      },
      modalShow: true
    })
  }

  handModalShow = (data, mothod) => {
    console.log(data, mothod)
    // SetState OrderItem, Method
    this.setState({
      myid: data.id,
      myDrink: data.name,
      myUnitPrice: data.unitPrice,
      myNum: data.num,
      myPrice: data.price,
      myRemarks: data.remarks,
      method: mothod,
      modalShow: true
    })
  }

  handleClose = () => {
    this.setState({
      modalShow: false
    })
  }
  // 回呼 新增一筆訂單
  create = () => {
    // console.log(xid, xdrink, xprice, xremarks)
    let newOrder = {
      id:this.state.myid,
      name:this.state.myDrink,
      unitPrice: this.state.myUnitPrice,
      num: this.state.myNum,
      price:this.state.myPrice,
      remarks:this.state.myRemarks
    };
    console.log('newOrder', newOrder)
    this.setState({
      getOrder : this.state.getOrder.concat(newOrder),
      omyid: Date.now(),
      myDrink: '',
      myUnitPrice: 0,
      myNum: 1,
      myPrice: 0,
      myRemarks: '',
      modalShow: false
    })
    // console.log(this.state.getOrder)
  }

  // 回呼 修改一筆訂單
  myUpdate = () => {
    console.log(this.state.myid)
    // let newOrder = this.state.getOrder;
    let order = this.state.getOrder;
    var theIndex = (xid) =>{
      for(let x=0;x<order.length;x++){
        // console.log(orders[x]);
        console.log("for loop x -> ",x, order[x].id, xid);
        if (order[x].id == xid) {
            // console.log("find the data..." , x);
            return x;
        }
      }
      return -1;
    }
    var myIndex = theIndex(this.state.myid);
    console.log("find index : " , myIndex);
    
    if (myIndex >=0){
      // console.log("myIndex => ",myIndex);
      
      // let neworder = this.state.getOrder;
      // console.log('neworder', order[myIndex])
      order[myIndex].id = this.state.myid
      order[myIndex].name = this.state.myDrink
      order[myIndex].unitPrice = this.state.myUnitPrice
      order[myIndex].num = this.state.myNum
      order[myIndex].price = this.state.myPrice
      order[myIndex].remarks = this.state.myRemarks
      this.setState({
        getOrder: order,
        myid: Date.now(),
        myDrink: '',
        myUnitPrice: 0,
        myNum: 1,
        myPrice: 0,
        myRemarks: '',
        modalShow: false
      })
      // console.log(orders[myIndex].name);
    }else {
        console.log("data not found ...",myIndex);
    }
  }

  // 回呼 刪除一筆訂單
  myDelete = () => {
   
    var myid = this.state.myid;
    let order = this.state.getOrder
    // console.log('order', order)

    var myIndex = find_id(myid);
    if (myIndex >=0){
      console.log("myIndex => ",myIndex);
      // console.log(orders[myIndex].name); 
      //  let newGetOrder = this.state.getOrder;
       let splicorder = order.splice(myIndex,1);
       console.log('splicorder', splicorder)
      this.setState({
        getOrder : order,
        myid: Date.now(),
        myDrink: '',
        myUnitPrice: 0,
        myNum: 1,
        myPrice: 0,
        myRemarks: '',
        modalShow: false
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

  // 繪製畫面
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="myList">
              <h1>DailyDrink</h1>
              <table className="myTable">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">名稱</th>
                    <th scope="col">價錢</th>
                    <th scope="col">
                      <button className="myBtn getcreate" onClick={this.newModalShow}>
                        新增 + 
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.getOrder.map((data, idx) => {
                      return(
                        <tr key={data.id}>
                          <th scope="row">{idx + 1}</th>
                          <td>{data.name}</td>
                          <td>{data.price}</td>
                          <td>
                            <span className='onlytBtn'>
                              <button className='myBtn getedit' onClick={() => {this.handModalShow(data, 'U')}}>修改</button> 
                            </span>
                            <span className='onlytBtn'>
                              <button className='myBtn getdelete' onClick={() => {this.handModalShow(data, 'D')}}>刪除</button>
                            </span>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              <Modal show={this.state.modalShow} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>訂單</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row mt-3">
                    <label className="myLabel">飲品：</label>
                    <div className="myInput2">
                      {(() => {
                        if(this.state.method === 'C') {
                          return(
                            <Select
                              placeholder='選擇飲品'
                              options={drink}
                              onChange={(e) => {
                                this.setState({
                                  myDrink: e.value
                                })
                              }}
                            />
                          )
                        }
                        if (this.state.method === 'U' || this.state.method === 'D'){
                          return (
                            <Select
                              placeholder='選擇飲品'
                              options={drink}
                              value={{ label: this.state.myDrink, value: this.state.myDrink }}
                              onChange={(e) => {
                                this.setState({
                                  myDrink: e.value
                                })
                              }}
                            />
                          )
                        }
                      })()}
                    </div>
                    <label className="myLabel">單價：</label>
                    <div className="myInput2">
                      {(() => {
                        if(this.state.method === 'C'){
                          return(
                            <Select
                              placeholder='單價'
                              options={price}
                              onChange={(e) => {
                                let num = this.state.myNum
                                this.setState({
                                  myUnitPrice: e.value,
                                  myPrice: e.value*num
                                })
                            }} /> 
                          )
                        }
                        if (this.state.method === 'U' || this.state.method === 'D'){
                          return(
                            <Select
                              placeholder='單價'
                              options={price}
                              value={{ label: this.state.myUnitPrice, value: this.state.myUnitPrice }}
                              onChange={(e) => {
                                let num = this.state.myNum 
                                this.setState({
                                  myUnitPrice: e.value,
                                  myPrice: e.value*num
                                })
                            }} /> 
                          )
                        }
                      })()}
                    </div>
                  <label className="myLabel">數量：</label>
                  <div className="myInput2">
                    <input
                    type="number"
                    className="form-control"
                    value={this.state.myNum} placeholder=""
                    onChange={(e) => {
                      let unitPrice = this.state.myUnitPrice
                      this.setState({
                        myNum: e.target.value,
                        myPrice: e.target.value*unitPrice
                      })
                      console.log(e.target.value)
                    }} />
                  </div>
                  <label className="myLabel">總價：</label>
                  <div className="myInput2">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.myPrice} placeholder=""
                      onChange={(e) => {
                        this.setState({
                          myPrice: e.target.value
                        })
                      }} disabled />
                  </div>
                  <label className="myLabel">備註：</label>
                  <div className="myInput2">
                    <textarea className="form-control" value={this.state.myRemarks} onChange={(e) => {
                      this.setState({
                        myRemarks: e.target.value
                      })
                    }} />
                  </div>
                  
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                  {(() => {
                    if(this.state.method === 'U'){
                      return(
                        <Button variant="primary" onClick={this.myUpdate}>
                          修改
                        </Button>
                      )
                    } else if(this.state.method === 'D'){
                      return(
                        <Button variant="danger" onClick={this.myDelete}>
                          刪除
                        </Button>
                      )
                    } else {
                      return(
                        <Button variant="success" onClick={this.create}>
                          新增
                        </Button>
                      )
                    }
                  })()}
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
