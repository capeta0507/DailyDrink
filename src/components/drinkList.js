import React from 'react'
import { Link } from 'react-router-dom';

const Home = (props) =>{
  // const [drink, setDrink] = useState([{
  //   id: 1,
  //   name: "珍珠奶茶",
  //   num: 1,
  //   price: 80,
  //   remarks: ""
  // }])
  let order = props.getOrder
  // console.log(order, 'order')
  const getDelete = (id) => {
    console.log(id)
    props.myDelete(id)
  }
  const handleCheck = (id) => {
    console.log(id)
    props.Check(id)
  }
  // setDrink()
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
                  <Link className="myBtn getcreate" to='/Form?method=C&id=00000'>
                    新增 + 
                  </Link>
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
                          <Link className='myBtn getedit' to={`/Form?method=U&id=${id}`} onClick={() => {handleCheck(data)}}>修改</Link> 
                        </span>
                        <span className='onlytBtn'>
                          <button className='myBtn getdelete' onClick={() => {getDelete(id)}}>刪除</button>
                        </span>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Home