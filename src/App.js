import "./components/Item.css";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';
import { useState,useEffect } from 'react'
import PropTypes from 'prop-types';
import FormComponent from "./components/FormComponent";
import DataContext from "./data/DataContext"; 
// import { useContext } from "react";
import ReportComponent from "./components/ReportComponent";
import { BrowserRouter as Link, Routes } from "react-router-dom"

// const Title = () =>
//   <h1 className="item">
//     โปรแกรมรายรับ - รายจ่าย
//   </h1>

const Item = (props) => {
  const { title, amount } = props
  const status = amount < 0 ? "expense" : "income"
  const symbol = amount < 0 ? "-" : "+"
  // const name = useContext(DataContext)
  return (
    <li className={status}>{title}<span>{symbol}{Math.abs(amount)}</span></li>
  );
}
Item.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired
}

const Transaction = (props) => {
  const { items } = props
  return (
    <div>
      <ul className="item-list">
        {items.map((i) => {
          return <Item {...i} key={uuidv4()} />
        }
        )}
      </ul>
    </div>

  );
}

function App() {
  // const initData = [
  //   {id:1,title:"ค่าเช่าบ้าน",amount:3000},
  //   {id:2,title:"ค่าอาหาร",amount:-3000}
  // ]
    
  const [items, setItems] = useState([])
  const [reportIncome,setReportIncome] = useState(0)
  const [reportExpense,setReportExpense] = useState(0)
  const [reportBalance,setReportBalance] = useState(0)
  const onAddNewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem, ...prevItem]
    })
  }
  useEffect(()=>{
    const amounts = items.map(items=>items.amount)
    const income = amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0)
    const expense = (amounts.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1
    const balance = income - expense
    setReportIncome(income)
    setReportExpense(expense)
    setReportBalance(balance)
    // console.log(`รายได้ = ${income}`)
    // console.log(`รายจ่าย = ${expense}`)
    // console.log(`ยอดเงินคงเหลือ = ${balance}`)
  },[items,reportIncome,reportExpense,reportBalance])

  // const[showReport,setShowReport] = useState(false)
  // const reducer = (action)=>{
  //   switch(action.type){
  //     case "SHOW" :
  //       return setShowReport(true)
  //     case "HIDE" :
  //       return setShowReport(false)
  //   }
  // }
  // const [result,dispatch] = useReducer(reducer,showReport)
  return (
    <DataContext.Provider value={
      {
        income: reportIncome,
        expense: reportExpense,
        balance: reportBalance,
      }
    }>
      <div className="container">
        <h1 className="item">โปรแกรมรายรับ - รายจ่าย</h1>
        
        <Routes>
        <div>
          <ul className="horizontal-memu">
            <li>
              <Link to="#">ข้อมูลบัญชี</Link>
            </li>
            <li>
              <Link to="#">บันทึกข้อมูล</Link>
            </li>
          </ul>
        </div>
        </Routes>
      
        {/* {showReport && <ReportComponent/>} */}
        <ReportComponent/>
        <FormComponent onAddItem={onAddNewItem} />
        <Transaction items={items} />
        {/* <h1>{result}</h1> */}
        {/* <button onClick={()=>dispatch({type:"SHOW",playload:10})}>แสดง</button>
        <button onClick={()=>dispatch({type:"HIDE",playload:5})}>ซ่อน</button> */}
      </div>
    </DataContext.Provider>
    
  );
}

export default App;
