import React,{ useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'
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

const MyModal = (props) => {

	const [myid, setMyId] = useState(Date.now())
  const [myDrink, setMyDrink] = useState('')
  const [myUnitPrice, setUnitPrice] = useState(20)
  const [myNum, setMyNum] = useState(1)
  const [myPrice, setMyPrice] = useState(myUnitPrice*myNum)
  const [myRemarks, setMyRemarks] = useState('')


  useEffect(() => {
    if(props.method === 'C') {
      setMyId(Date.now())
      setMyDrink(props.orderItem.drink)
      setUnitPrice(props.orderItem.unitPrice)
      setMyNum(props.orderItem.num)
      setMyPrice(props.orderItem.price)
      setMyRemarks(props.orderItem.remarks)
    }
    if(props.method === 'U' || props.method === 'D'){
      setMyDrink(props.orderItem.name)
      setUnitPrice(props.orderItem.unitPrice)
      setMyNum(props.orderItem.num)
      setMyPrice(props.orderItem.price)
      setMyRemarks(props.orderItem.remarks)
    }
  },[props.orderItem])
  // console.log(props.orderItem.id, 'item')
  // console.log(myDrink, 'myDrink')
  // 新增 
  const create = () => {
    let drink = myDrink
    let unitPrice = myUnitPrice
    let num = myNum
    let price = myPrice
    let remarks = myRemarks
    let id = myid
    props.sendOrder(id, drink, unitPrice, num, price, remarks)
    props.onHide()
    setMyDrink('')
    setUnitPrice(0)
    setMyNum(1)
    setMyPrice(0)
    setMyRemarks('')
  }
  //修改 
  const update = () => {
    let drink = myDrink
    let unitPrice = myUnitPrice
    let num = myNum
    let price = myPrice
    let remarks = myRemarks
    let id = props.orderItem.id
    props.getUpdate(id, drink, unitPrice, num, price, remarks)
    props.onHide()
  }
  // 刪除
  const myDelete = () => {
    let id = props.orderItem.id
    props.getDelete(id)
    props.onHide()
  }
  return (
    <Modal {...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<Modal.Header closeButton>
				<Modal.Title>訂單</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="row mt-3">
					<label className="myLabel">飲品：</label>
					<div className="myInput2">
            {(() => {
              if(props.method === 'C') {
                return(
                  <Select
                    placeholder='選擇飲品'
                    options={drink}
                    onChange={(e) => {
                      setMyDrink(e.value)
                    }}
                  />
                )
              }
              if (props.method === 'U' || props.method === 'D'){
                return (
                  <Select
                    placeholder='選擇飲品'
                    options={drink}
                    value={{ label: myDrink, value: myDrink }}
                    onChange={(e) => {
                      setMyDrink(e.value)
                    }}
                  />
                )
              }
            })()}
					</div>
					<label className="myLabel">單價：</label>
					<div className="myInput2">
            {(() => {
              if(props.method === 'C'){
                return(
                  <Select
                    placeholder='單價'
                    options={price}
                    onChange={(e) => {
                      setUnitPrice(e.value)
                      setMyPrice(e.value*myNum)
                  }} /> 
                )
              }
              if (props.method === 'U' || props.method === 'D'){
                return(
                  <Select
                    placeholder='單價'
                    options={price}
                    value={{ label: myUnitPrice, value: myUnitPrice }}
                    onChange={(e) => {
                      setUnitPrice(e.value)
                      setMyPrice(e.value*myNum)
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
					value={myNum} placeholder=""
					onChange={(e) => {
						setMyNum(e.target.value)
						setMyPrice(e.target.value*myUnitPrice)
					}} />
				</div>
				<label className="myLabel">總價：</label>
				<div className="myInput2">
					<input
						type="text"
						className="form-control"
						value={myPrice} placeholder=""
						onChange={(e) => {
							setMyPrice(e.target.value)
						}} disabled />
				</div>
				<label className="myLabel">備註：</label>
				<div className="myInput2">
					<textarea className="form-control" value={myRemarks} onChange={(e) => {
						setMyRemarks(e.target.value)
					}} />
				</div>
				
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.onHide}>
					Close
				</Button>
        {(() => {
          if(props.method === 'U'){
            return(
              <Button variant="primary" onClick={update}>
                修改
              </Button>
            )
          } else if(props.method === 'D'){
            return(
              <Button variant="danger" onClick={myDelete}>
                刪除
              </Button>
            )
          } else {
            return(
              <Button variant="success" onClick={create}>
                新增
              </Button>
            )
          }
        })()}
			</Modal.Footer>
		</Modal>
  )
}
export default MyModal