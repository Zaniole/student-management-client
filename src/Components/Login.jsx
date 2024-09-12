import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "./style.css"
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader"
import Toastify from "./utils/Toastify";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3000/verify')
        .then(result => {
          if(result.data.Status) {
            navigate('/dashboard/home')
          }
        }).catch(err =>console.log(err))
      }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3000/auth/login', values)
            .then(result => {
                if (result.data.loginStatus) {
                    setLoading(true);

                    setTimeout(() => {
                        setLoading(false);
                        localStorage.setItem('valid', true);
                        navigate('/dashboard/home');
                        Toastify({ message: "Đăng nhập thành công!", type: "success" });
                    }, 1000);
                } else {
                    Toastify({message: "Sai thông tin tài khoản hoặc mật khẩu", type:"error"})
                }
            })
            .catch(error => console.log(error))

        // setLoading(true);

        // setTimeout(() => {
        //     setLoading(false);
        //     navigate('/dashboard/home');
        //     Toastify({ message: "Đăng nhập thành công!", type: "success" });
        // }, 1000);

    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
            <div className="p-3 rounded w-25 border loginForm">
                {!loading &&
                    <>
                        <h2 className="text-center">Đăng nhập</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username"><strong>Tài khoản:</strong></label>
                                <input
                                    type="text"
                                    name="username"
                                    autoComplete="off"
                                    placeholder="Nhập Tài khoản"
                                    onChange={(e) => setValues({ ...values, username: e.target.value })}
                                    className="form-control rounded-0" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password"><strong>Mật khẩu:</strong></label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Nhập mật khẩu"
                                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                                    className="form-control rounded-0" />
                            </div>
                            <button className="btn btn-success w-100 rounded-0">Đăng nhập</button>
                        </form>
                    </>}
                {loading &&
                    <div className="d-flex justify-content-center align-items-center">
                        <PulseLoader color="#36d7b7"></PulseLoader>
                    </div>
                }
                {/* <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input type="email" name="email" autoComplete="off" placeholder="Nhập Email"
                         className="form-control rounded-0"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Mật khẩu:</strong></label>
                        <input type="password" name="password" placeholder="Nhập mật khẩu"
                         className="form-control rounded-0"/>
                    </div>
                    <button className="btn btn-success w-100 rounded-0">Đăng nhập</button>
                </form> */}
            </div>
        </div>
    )
}

export default Login