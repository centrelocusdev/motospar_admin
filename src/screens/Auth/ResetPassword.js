import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";

const ResetPassword = () => {
    const [token, settoken] = useState("");
    const [password, setpassword] = useState("");
    const [cPassword, setcPassword] = useState("");
    const {ForgotResetPswd, loadingactivity} = useContext(AuthContext);

    const HandleResetpass = (e) => {
        e.preventDefault();
        ForgotResetPswd(token, password);
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
                        Don’t worry, happens to all of us. Enter your Token and new password below to recover your
                        password
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Token</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter your Token"
                            value={token}
                            onChange={(e) => settoken(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <div className="password-group">
                            <label htmlFor="password">New Password</label>
                        </div>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your new password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <div className="password-group">
                            <label htmlFor="password">Confirm Password</label>
                        </div>
                        <input
                            type="password"
                            id="cpassword"
                            placeholder="Enter your password"
                            value={cPassword}
                            onChange={(e) => setcPassword(e.target.value)}
                        />
                    </div>

                    <button className="sign-in-btnforgot" onClick={HandleResetpass}>
                        Submit
                    </button>
                    <div className="footer">
                        Go back? <a href="/Forgotpass">Forgot Password</a>
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

export default ResetPassword;
