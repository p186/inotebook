import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';


const Navbar = (props) => {
    let history = useHistory();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        history.push('/login');
    }

    let location = useLocation();
    // useEffect(() => {
    //     console.log(location.pathname);
    // }, [location]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">INoteBook</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                   {!localStorage.getItem('token')?<form className="form-inline my-2 my-lg-0">
                    <Link className = "btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    <Link className = "btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form>:<button onClick={handleLogout} className="btn btn-primary">Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
