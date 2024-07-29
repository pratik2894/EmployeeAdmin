import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
const Dashboard = () =>{
    const { user } = useSelector((state) => state.user);
    console.log(user.admin.email)
    return(

        <>
        <Navbar/>
         <h1>
            Welcome back {user.admin.email}
        </h1>
        
        <div className="empdashboard">
            <div className="empd1">
                <h3>Total Employee : 7</h3>
                <i className="fa-solid fa-users fa-3x"></i>
            </div>
            <div className="empd2">
                <h3> present employee:9</h3>
                <i className="fa-solid fa-wifi fa-3x"></i>
               
            </div>
            <div className="empd3">
                <h3>Absent employess:3</h3>
                <i className="fa-solid fa-xmark fa-3x"></i>
            </div>
        
        </div>
        </>
    )
}

export default Dashboard;