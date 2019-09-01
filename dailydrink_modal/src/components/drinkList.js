import React, {useState} from 'react'
import { Modal, Button } from 'react-bootstrap'
import MyModal from './modal'

const Home = (props) =>{

  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [item,setItem] = useState({})
  const [orderItem,setOrderItem] = useState([])
  const [method, setMethod] = useState('');

  const handleClose = () => setShow(false);
  const newModalShow = () => {
    setMethod('C');
    setItem({
      id:0,
      name:'布丁紅茶',
      unitPrice: 0,
      num: 1,
      price:0,
      remarks:''
    })
    setOrderItem(item)
    setModalShow(true)
  }
  const handModalShow = (data, mothod) => {
    setModalShow(true)
    // console.log(data, mothod)
    setOrderItem(data)
    setMethod(mothod)
  }

  let order = props.getOrder
  // console.log(order, 'order')
  const getDelete = (id) => {
    // console.log(id)
    props.myDelete(id)
  }
  const sendOrder = (id, drink, unitPrice, num, price, remarks) => {
    // console.log(id, drink, unitPrice, num, price, remarks)
    props.order(id, drink, unitPrice, num, price, remarks)
  }
  const getUpdate = (id, drink, unitPrice, num, price, remarks) => {
    props.update(id, drink, unitPrice, num, price, remarks)
  }
  return (
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
                  <button className="myBtn getcreate" onClick={newModalShow}>
                    新增 + 
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                order.map((data, idx) => {
                  // console.log(data, 'l')
                  let id = data.id
                  return(
                    <tr key={data.id}>
                      <th scope="row">{idx + 1}</th>
                      <td>{data.name}</td>
                      <td>{data.price}</td>
                      <td>
                        <span className='onlytBtn'>
                          <button className='myBtn getedit' onClick={() => {handModalShow(data, 'U')}}>修改</button> 
                        </span>
                        <span className='onlytBtn'>
                          <button className='myBtn getdelete' onClick={() => {handModalShow(data, 'D')}}>刪除</button>
                        </span>
                        <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>是否要刪除</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            否
                          </Button>
                          <Button variant="primary" onClick={handleClose}>
                            是
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <MyModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            sendOrder={sendOrder}
            orderItem={orderItem}
            method={method}
            getUpdate={getUpdate}
            getDelete={getDelete}
          />
        </div>
      </div>
    </div>
  )
}
export default Home