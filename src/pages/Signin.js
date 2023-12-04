import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import BackgroundImage from "../assets/SigninBackground.svg";
import { useState } from "react";
import "../styles/signin.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Cookies from 'js-cookie';

export default function Signin() {
    const [fieldError, setFieldError] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    function submitForm(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        const formData = new FormData(e.target);

        if (data.username === "" && data.password === "") {
            setFieldError("Please fill all fields!");
        } else {
            setFieldError(null)
            axios
                .post("http://127.0.0.1:8000/login/", formData)
                .then((response) => {
                    if (response.status === 200) {
                        const token = response.data.token;
                        if(isChecked){
                            Cookies.set('token', token, { expires: 7, path: '/' });
                        }
                        else{
                            Cookies.set('token', token, { path: '/' });
                        }
                        window.location.href = "/dashboard";
                    }
                })
                .catch((error) => {
                    toast.error('Username or Password is incorrect', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                });
        }
        console.log(data);
    }

    return (
        <>
            <div className="Signin">
                <nav className="navbar fixed-top shadow-5-strong">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <img
                                src={Logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt=""
                            />
                            <span className="px-3 fw-bold">InfinitraX</span>
                        </Link>
                    </div>
                </nav>
                <section className="vh-100">
                    <div className="container py-5">
                        <div className="text-center p-3 pt-5">
                            <h2 className="heading">Welcome to InfinitraX</h2>
                        </div>
                        <div className="row d-flex align-items-center justify-content-center h-100">
                            <div className="col-md-8 col-lg-7 col-xl-6">
                                <img
                                    src={BackgroundImage}
                                    className="img-fluid"
                                    alt="main image"
                                />
                            </div>
                            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 p-5 bg-light rounded">
                                <form onSubmit={(e) => submitForm(e)}>
                                    <h6 className="text-center text-danger">{fieldError}</h6>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            className="form-control form-control-md"
                                        />
                                        <label className="form-label" htmlFor="username">
                                            Username
                                        </label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="form-control form-control-md"
                                        />
                                        <label className="form-label" htmlFor="password">
                                            Password
                                        </label>
                                    </div>

                                    <div className="d-flex mb-4">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="rememberMe"
                                                checked={isChecked}
                                                    onChange={()=>setIsChecked(!isChecked)}
                                            />
                                            <label className="form-check-label" htmlFor="rememberMe">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg btn-block"
                                    >
                                        Sign in
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
