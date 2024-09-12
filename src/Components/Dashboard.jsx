import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
import "./dashboard.css"
import Toastify from './utils/Toastify';
import axios from 'axios';

const Dashboard = () => {
    const location = useLocation();
    const anvigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleLogout = () => {
        axios.get('http://localhost:3000/auth/logout')
            .then(result => {
                if(result.data.Status){
                    localStorage.removeItem('valid')
                    anvigate('/');
                    Toastify({message:"Bạn đã đăng xuất", type:"success"})
                }
            })
    }

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link
                            to="/dashboard/home"
                            className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
                        >
                            <span className="fs-5 fw-bolder d-none d-sm-inline">
                                Quản lý học sinh
                            </span>
                        </Link>
                        <ul
                            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
                            id="menu"
                        >
                            <li className="w-100">
                                <Link
                                    to="/dashboard/home"
                                    className={`nav-link text-white px-0 align-middle ${location.pathname === '/dashboard/home' ? 'active' : ''}`}
                                >
                                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Trang chủ</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/dashboard/student"
                                    className={`nav-link text-white px-0 align-middle ${location.pathname === '/dashboard/student' ? 'active' : ''}`}
                                >
                                    <i className="fs-4 bi-people ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Học sinh</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/dashboard/class"
                                    className={`nav-link text-white px-0 align-middle ${location.pathname === '/dashboard/class' ? 'active' : ''}`}
                                >
                                    <i className="fs-4 bi-columns ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Lớp</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to="/dashboard/attendance"
                                    className={`nav-link text-white px-0 align-middle ${location.pathname === '/dashboard/attendance' ? 'active' : ''}`}
                                >
                                    <i className="fs-4 bi-calendar-check ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Điểm danh</span>
                                </Link>
                            </li>
                            <li className='w-100' onClick={handleLogout}>
                               <Link
                                    className='nav-link text-white px-0 align-middle'
                                >
                                <i className="fs-4 ms-2 bi bi-box-arrow-right"></i>
                                <span className='ms-2 d-none d-sm-inline'>Đăng xuất</span>
                               </Link> 
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <div className="p-2 d-flex justify-content-center shadow">
                        <h4>Quản lý học sinh</h4>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard