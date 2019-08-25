import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select'

const drink = [
  { value: '珍珠奶茶', label: '珍珠奶茶', price: 30 },
  { value: '茉莉綠茶', label: '茉莉綠茶', price: 40 },
  { value: '黃金烏龍', label: '黃金烏龍', price: 40 },
  { value: '多多綠', label: '多多綠', price: 35 },
  { value: '紅茶拿鐵', label: '紅茶拿鐵', price: 40 },
  { value: '綠茶拿鐵', label: '綠茶拿鐵', price: 35 },
  { value: '布丁紅茶', label: '布丁紅茶', price: 35 },
  { value: '檸檬汁', label: '檸檬汁', price: 40 },
  { value: '觀音奶茶', label: '觀音奶茶', price: 35 },
  { value: '百香綠茶', label: '百香綠茶', price: 35 }
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
    // console.log(props.onHistory.history.push, 'props')
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
    <div className="container myForm">
      <h1 className="text-center">DailyDrink</h1>
      {(() => {
        if(getMethod === 'U') {
          return (
            <>
              <div className="row mt-3">
                <div className="col-3"></div>
                <label className="col-lg-2 col-sm-2 col-2 col-form-label text-right px-0">飲品：</label>
                <div className="col-lg-3 col-sm-3 col-3 pl-0">
                  <Select
                    placeholder='選擇飲品'
                    options={drink}
                    value={{ label: myDrink, value: myDrink }}
                    onChange={(e) => {
                      setMyDrink(e.value)
                    }}
                    />
                </div>
                <div className="col-4"></div>
              </div>
              <div className="row mt-3">
                <div className="col-3"></div>
                <label className="col-lg-2 col-sm-2 col-2 col-form-label text-right px-0">單價：</label>
                <div className="col-lg-3 col-sm-3 col-3 pl-0">
                  <input type="number" className="form-control" value={myUnitPrice} placeholder="" onChange={(e) => {setUnitPrice(e.target.value)}} />
                </div>
                <div className="col-4"></div>
              </div>
              <div className="row mt-3">
                <div className="col-3"></div>
                <label className="col-lg-2 col-sm-2 col-2 col-form-label text-right px-0">數量：</label>
                <div className="col-lg-3 col-sm-3 col-3 pl-0">
                  <input type="number" className="form-control" value={myNum} placeholder="" onChange={(e) => {setMyNum(e.target.value)}} />
                </div>
                <div className="col-4"></div>
              </div>
              <div className="row mt-3">
                <div className="col-3"></div>
                <label className="col-lg-2 col-sm-2 col-2 col-form-label text-right px-0">總價：</label>
                <div className="col-lg-3 col-sm-3 col-3 pl-0">
                  <input
                    type="text"
                    className="form-control"
                    value={myPrice} placeholder=""
                    onChange={(e) => {setMyPrice(e.target.value)}} disabled />
                </div>
                <div className="col-4"></div>
              </div>
              <div className="row mt-3">
                <div className="col-3"></div>
                <label className="col-lg-2 col-sm-2 col-2 col-form-label text-right px-0">備註：</label>
                <div className="col-lg-3 col-sm-3 col-3 pl-0">
                  <textarea className="form-control" onChange={(e) => {
                    setMyRemarks(e.target.value)
                  }} />
                </div>
                <div className="col-4"></div>
              </div>
              <div className="myBtn text-center">
                <button
                  className="btn btn-success"
                  onClick={update}>修改</button>
                <Link className="btn btn-warning" to='/'>
                  返回
                </Link>
              </div>
            </>
          )
        } else {
          return (
            <>
              <div className="row mt-3">
                <div className="col-3"></div>
                <label className="col-lg-2 col-sm-2 col-2 col-form-label text-right px-0">飲品：</label>
                <div className="col-lg-3 col-sm-3 col-3 pl-0">
                  <Select
                    placeholder='選擇飲品'
                    options={drink}
                    onChange={(e) => {
                      setMyDrink(e.value)
                    }}
                    />
                </div>
                <div className="col-4"></div>
              </div>
              <div className="row mt-3">
                <div className="col-3"></div>
                <label className="col-lg-2 col-sm-2 col-2 col-form-label text-right px-0">單價：</label>
                <div className="col-lg-3 col-sm-3 col-3 pl-0">
                  <input type="number" className="form-control" value={myUnitPrice} placeholder="" onChange={(e) => {setUnitPrice(e.target.value)}} />
                </div>
                <div className="col-4"></div>
              </div>
              <div className="row mt-3">
                <div className="col-3"></div>
                <label className="col-lg-2 col-sm-2 col-2 col-form-label text-right px-0">數量：</label>
                <div className="col-lg-3 col-sm-3 col-3 pl-0">
                  <input type="number" className="form-control" value={myNum} placeholder="" onChange={(e) => {setMyNum(e.target.value)}} />
                </div>
                <div className="col-4"></div>
              </div>
              <div className="row mt-3">
                <div className="col-3"></div>
                <label className="col-lg-2 col-sm-2 col-2 col-form-label text-right px-0">總價：</label>
                <div className="col-lg-3 col-sm-3 col-3 pl-0">
                  <input
                    type="text"
                    className="form-control"
                    value={myPrice} placeholder=""
                    onChange={(e) => {setMyPrice(e.target.value)}} disabled />
                </div>
                <div className="col-4"></div>
              </div>
              <div className="row mt-3">
                <div className="col-3"></div>
                <label className="col-lg-2 col-sm-2 col-2 col-form-label text-right px-0">備註：</label>
                <div className="col-lg-3 col-sm-3 col-3 pl-0">
                  <textarea className="form-control" onChange={(e) => {
                    setMyRemarks(e.target.value)
                  }} />
                </div>
                <div className="col-4"></div>
              </div>
              <div className="myBtn text-center">
                <button
                  className="btn btn-success"
                  onClick={send}>新增</button>
                <Link className="btn btn-warning" to='/'>
                  返回
                </Link>
              </div>
            </>
          )
        }
      })()}
    </div>
  )
}
export default Form