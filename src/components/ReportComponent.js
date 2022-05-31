import DataContext from "../data/DataContext";
import { useContext } from "react";
import "./ReportComponent.css"

const ReportComponent = () =>{
    const {income,expense,balance} = useContext(DataContext)
    return (
        <div className="container">
            <h4>ยอดเงินคงเหลือ :</h4>
            <h1>฿{balance}</h1>
            <div className="report-container">
                <div>
                    <h4>รายรับทั้งหมด</h4>
                    <p className="report plus">{income}</p>
                </div>
                <div>
                    <h4>รายจ่ายทั้งหมด</h4>
                    <p className="report minus">{expense}</p>
                </div>
            </div>
        </div>
      );
}

 export default ReportComponent