import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {
    const [email, setemail] = useState("");
    const {ForgotPswds, loadingactivity} = useContext(AuthContext);
    const navigate = useNavigate();
    const HandleForgot = (e) => {
        e.preventDefault();
        ForgotPswds(email);
        navigate("/ResetPass");
    };
    return (
        <div className="sign-in-container">
            {/* Left side form */}
            <div className="outer-container">
                <div className="form-container">
                    <div className="logo">
                        <img src={require("../../assets/images/Logo.png")} alt="Logo" />
                    </div>
                    <div className="titleForgot">Forgot Password?</div>
                    <div className="subtitle">
                        Don’t worry, happens to all of us. Enter your email below to recover your password
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>

                    <button className="sign-in-btnforgot" onClick={HandleForgot}>
                        Submit
                    </button>
                    <div className="footer">
                        Go back? <a href="/">Sign in</a>
                    </div>
                </div>
                <div className="img">
                    <img
                        src={require("../../assets/images/bottomimg.png")}
                        className="illustration"
                        alt="Illustration"
                    />
                </div>
            </div>

            {/* Right side illustration */}
            <div className="illustration-container"></div>
        </div>
    );
};

export default ForgotPassword;
