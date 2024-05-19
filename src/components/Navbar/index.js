import { Link } from "react-router-dom";
import "./index.css";
import Cookies from "js-cookie";
import { FcTodoList } from "react-icons/fc";

function Navbar() {
    const onLogout = ()=>{
        Cookies.remove("jwt_token")
    }
    return ( <ul className="nav-bar">
       <li className="logo"><FcTodoList /></li>
        <div className="nav-main">
        <h1 className="title">Mbs TodoList</h1>
        </div>
        <li><Link to='/login'><button className="logout-btn" onClick={onLogout}>Logout</button></Link></li>
    </ul> );
}

export default Navbar;