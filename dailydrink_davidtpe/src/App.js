import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './App.css';

// 飲品 option
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
// 價格 option
const price = [
  { value: '30', label: '小杯 30' },
  { value: '45', label: '中杯 45' },
  { value: '60', label: '大杯 60' }
]
// 給 this.state.orderItem 設定初始值
const initItem = {
  id:0,
  name:'珍珠奶茶',
  unitPrice: 45,
  num: 1,
  price: 45,
  remarks: ""
}

// App Component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 訂購資料
      orderList:[
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
      // Modal Form 的維護資料
      orderItem:{
        id:0,
        name:'',
        unitPrice: 45,
        num: 1,
        price: 45,
        remarks: ""
      },
      modalShow: false,         // Modal Form show (true/false)
      method: 'C',              // 資料維護 (C新增/U修改/D刪除)
      methodButton: '新增',      // Modal Form 執行按鈕 名稱
      listIndex:-1              // 資料陣列索引
    }
  }

  // 由於 Modal Form 裡的資料是指向 this.state.orderItem (物件型態)
  // 一般的物件 = 複製物件乃淺層拷貝Shallow Copy
  // 所以改為 Object.assign 做深層拷貝Deep Copy
  // http://larry850806.github.io/2016/09/20/shallow-vs-deep-copy/
  // ----------------------------------------------------------------
  // 新增紀錄(按鈕)
  newModalShow = () =>{
    console.log("orderList目前:",this.state.orderList);
    let myItem = Object.assign({}, initItem); // 給予新的物件 deep copy
    myItem.id=Date.now();
    this.setState({
      orderItem : myItem,
      method: 'C',
      methodButton: '新增',
      listIndex: -1,
      modalShow: true
    })
  }

  // U修改/D刪除 紀錄 (data單筆紀錄 , method方法 U/D , index -> orderItem陣列索引 )
  handModalShow = (data, method,index) => {
    console.log("data目前:",data, method , index);
    // 顯示紀錄
    let myItem = data;
    let myMethodDesc = ''
    if (method == 'U'){
      myMethodDesc = '修改'
    }else{
      myMethodDesc = '刪除'
    }
    this.setState({
      orderItem: myItem,
      method: method,
      methodButton: myMethodDesc,
      listIndex: index,
      modalShow: true
    })
  }

  // Modal 按鈕 (C新增、U修改、D刪除)
  myButtonFunction = () =>{
    // C新增
    if (this.state.method === 'C') {
      let myItem = Object.assign({}, this.state.orderItem);  // 給予新的物件 deep copy
      this.setState({
        orderList : this.state.orderList.concat(myItem),
        modalShow: false,
        orderItem: Object.assign({}, initItem)  // 給予新的物件 deep copy
      })
    }
    // U修改
    if (this.state.method === 'U') {
      let myItem = Object.assign({}, this.state.orderItem);  // 給予新的物件 deep copy
      console.log("準備修改:",myItem,this.state.listIndex);
      let myList = this.state.orderList;
      myList[this.state.listIndex] = myItem;
      this.setState({
        orderList : myList,
        modalShow: false,
        orderItem: Object.assign({}, initItem), // 給予新的物件 deep copy
      })
    }
    // D刪除
    if (this.state.method === 'D') {
      let myItem = Object.assign({}, this.state.orderItem);  // 給予新的物件 deep copy
      console.log("準備刪除:",myItem,this.state.listIndex);
      let myList = this.state.orderList;
      myList.splice(this.state.listIndex,1);
      this.setState({
        orderList : myList,
        modalShow: false,
        orderItem: Object.assign({}, initItem) // 給予新的物件 deep copy

      })
    }
  }

  // 關閉 Modal Form
  handleClose = () => {
    this.setState({
      modalShow: false
    })
  }

  // 開始繪製畫面
  render() {
    // 製作 Select 物件的 Option
    // 飲料 option
		var drinkOptions = drink.map((drinkData,index) =>{
			return <option key={index} value={drinkData.value}>{drinkData.label}</option>
    });
    // 單價 option
    var priceOptions = price.map((priceData,index) =>{
			return <option key={index} value={priceData.value}>{priceData.label}</option>
    });
    
    return (
      <div className="App">
        <div className="container">
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
                    this.state.orderList.map((data, index) => {
                      return(
                        <tr key={data.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{data.name}</td>
                          <td>{data.price}</td>
                          <td>
                            <span className='onlytBtn'>
                              <button className='myBtn getedit' onClick={() => {this.handModalShow(data, 'U',index)}}>修改</button> 
                            </span>
                            <span className='onlytBtn'>
                              <button className='myBtn getdelete' onClick={() => {this.handModalShow(data, 'D',index)}}>刪除</button>
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
                      <select className="form-control" 
                      value={this.state.orderItem.name}
                      onChange={(e) =>{
                        // 修改 State.orderItem.name
                        let myItem = this.state.orderItem;
                        myItem.name = e.target.value;
                        this.setState({
                          orderItem : myItem
                        })
                      }}>
                        {drinkOptions}
                      </select>
                    </div>

                    <label className="myLabel">單價：</label>
                    <div className="myInput2">
                      <select className="form-control" 
                        value={this.state.orderItem.unitPrice}
                        onChange={(e)=>{
                          // 修改 State.orderItem.unitPrice
                          let myItem = this.state.orderItem;
                          myItem.unitPrice = e.target.value;
                          myItem.price = myItem.unitPrice * myItem.num
                          this.setState({
                            orderItem : myItem
                          })
                        }}>
                        {priceOptions}
                      </select>
                    </div>

                    <label className="myLabel">數量：</label>
                    <div className="myInput2">
                      <input
                      type="number"
                      className="form-control"
                      value={this.state.orderItem.num} placeholder="數量"
                      onChange={(e) => {
                        // 修改 State.orderItem.num
                        let myItem = this.state.orderItem;
                        myItem.num = e.target.value;
                        myItem.price = myItem.unitPrice * myItem.num
                        this.setState({
                          orderItem : myItem
                        })
                      }} />
                    </div>
                  
                    <label className="myLabel">總價：</label>
                    <div className="myInput2">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.orderItem.price} placeholder=""
                        disabled />
                    </div>

                    <label className="myLabel">備註：</label>
                    <div className="myInput2">
                      <textarea className="form-control" 
                        value={this.state.orderItem.remarks} 
                        onChange={(e) => {
                          // 修改 State.orderItem.remarks
                        let myItem = this.state.orderItem;
                        myItem.remarks = e.target.value;
                        this.setState({
                          orderItem : myItem
                        })
                      }} />
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={this.myButtonFunction}>
                    {this.state.methodButton}
                  </Button>
                </Modal.Footer>
              </Modal>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
