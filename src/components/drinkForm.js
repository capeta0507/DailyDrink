import React,{ useState, useEffect } from 'react';
import Select from 'react-select'

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

const Form = (props) => {
  const [myid, setMyId] = useState(Date.now())
  const [myDrink, setMyDrink] = useState('')
  const [myUnitPrice, setUnitPrice] = useState(20)
  const [myNum, setMyNum] = useState(1)
  const [myPrice, setMyPrice] = useState(myUnitPrice*myNum)
  const [myRemarks, setMyRemarks] = useState('')

    // 獲取網址字串
    let getUrl = window.location.href;
    // console.log('myUrl', getUrl)
    let getSec = getUrl.split("?");
    // console.log(getSec);
    let getParams = getSec[1].split("&");
    // console.log(getParams);
    let getMethod = getParams[0].split("=")[1];
    // console.log(getMethod);
    let getId = getParams[1].split("=")[1];
    // console.log('getId', getId);

  useEffect(() => {
    let item = props.orderItem
    setMyDrink(props.orderItem.name)
    setUnitPrice(props.orderItem.unitPrice)
    setMyNum(props.orderItem.num)
    setMyPrice(props.orderItem.price)
    setMyRemarks(props.orderItem.remarks)
    console.log(item, 'item')
  },[1])

  const send = () => {
    let drink = myDrink
    let unitPrice = myUnitPrice
    let num = myNum
    let price = myPrice
    let remarks = myRemarks
    let id = myid
    props.sendOrder(id, drink, unitPrice, num, price, remarks)
    props.onHistory.history.push('/')
  }

  const update = () => {
    let drink = myDrink
    let unitPrice = myUnitPrice
    let num = myNum
    let price = myPrice
    let remarks = myRemarks
    let id = getId
    props.getUpdate(id, drink, unitPrice, num, price, remarks)
    props.onHistory.history.push('/')
  }
  return (
    <div className="container">
      <h1 className="text-center">DailyDrink</h1>
      <div className="row mt-3 myForm ">
      {(() => {
        if(getMethod === 'U') {
          return (
            <>
              <div className="block"></div>
              <label className="myLabel">飲品：</label>
              <div className="myInput pl-0">
                <Select
                  placeholder='選擇飲品'
                  options={drink}
                  value={{ label: myDrink, value: myDrink }}
                  onChange={(e) => {
                    setMyDrink(e.value)
                  }}
                />
              </div>
              <div className="block"></div>
              <div className="block"></div>
              <label className="myLabel">單價：</label>
              <div className="myInput">
                <Select
                  placeholder='單價'
                  options={price}
                  value={{ label: myUnitPrice, value: myUnitPrice }}
                  onChange={(e) => {
                    setUnitPrice(e.value)
                    setMyPrice(e.value*myNum)
                  }}
                />
              </div>
              <div className="block"></div>
              
            </>
          )
        } else {
          return (
            <>
              <div className="block"></div>
              <label className="myLabel">飲品：</label>
              <div className="myInput">
                <Select
                  placeholder='選擇飲品'
                  options={drink}
                  onChange={(e) => {
                    setMyDrink(e.value)
                  }}
                  />
              </div>
              <div className="block"></div>
            
            
              <div className="block"></div>
              <label className="myLabel">單價：</label>
              <div className="myInput">
                <Select
                  placeholder='單價'
                  options={price}
                  onChange={(e) => {
                    setUnitPrice(e.value)
                    setMyPrice(e.value*myNum)
                }} />
              </div>
              <div className="block"></div>
              
            </>
          )
        }
      })()}
      
        <div className="block"></div>
        <label className="myLabel">數量：</label>
        <div className="myInput">
          <input
          type="number"
          className="form-control"
          value={myNum} placeholder=""
          onChange={(e) => {
            setMyNum(e.target.value)
            setMyPrice(e.target.value*myUnitPrice)
          }} />
        </div>
        <div className="block"></div>
      
      
        <div className="block"></div>
        <label className="myLabel">總價：</label>
        <div className="myInput">
          <input
            type="text"
            className="form-control"
            value={myPrice} placeholder=""
            onChange={(e) => {
              setMyPrice(e.target.value)
            }} disabled />
        </div>
        <div className="block"></div>
      
      
        <div className="block"></div>
        <label className="myLabel">備註：</label>
        <div className="myInput">
          <textarea className="form-control" onChange={(e) => {
            setMyRemarks(e.target.value)
          }} />
        </div>
        <div className="block"></div>
      
      <div className="myBtn text-center">
        <span className='onlytBtn'>
          {(() => {
            if(getMethod === 'U') {
              return (
                <button
                  className="btn btn-success"
                  onClick={update}>修改</button>
              )
            } else {
              return (
                <button
                  className="btn btn-success"
                  onClick={send}>新增</button>
              )
            }
          })()}
        </span>
        <span className='onlytBtn'>
          <button className="btn btn-warning" onClick={() => {props.onHistory.history.push('/')}}>
            返回
          </button>
        </span>
      </div>
      </div>
    </div>
  )
}
export default Form