import React, { createContext, useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { postGoogle, postUser, postUserLogout } from "../repository/Repo";
import { useNavigate } from "react-router-dom";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { useGoogleLogin } from "@react-oauth/google";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // GoogleSignin.configure({
    //     webClientId: "818269488302-svso0iqe2cfb53d87s99q2b4h4betkj1.apps.googleusercontent.com",
    //     offlineAccess: true,
    // });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loggedIn, setloggedIn] = useState(false);
    const [loadingactivity, setloadingactivity] = useState(false);
    const [user, setuser] = useState("");
    const [userToken, setuserToken] = useState("");
    // const showAlert = (navigateto,msg) => {
    //  return(
    //   alert(
    //     'Success',
    //     msg,
    //     [
    //       {
    //         text: "Cancel",
    //         style: "cancel"
    //       },
    //       { text: "OK", onPress: () => navigation.navigate(navigateto) }
    //     ]
    //   )
    //  );
    // };
    const isLoggedIn = async () => {
        try {
            let value = localStorage.getItem("usertoken");
            let users = await JSON.parse(localStorage.getItem("userdetails"));
            let refreshToken = localStorage.getItem("user_refreshtoken");
            if (users) {

                dispatch({
                    type: "SET_TOKEN",
                    payload: value,
                });
                dispatch({
                    type: "SET_REFRESHTOKEN",
                    payload: refreshToken,
                });
                dispatch({
                    type: "SET_USER_DATA",
                    payload: users,
                });
                dispatch({
                    type: "SET_LOGGEDIN",
                    payload: true,
                });
                setloggedIn(true);
            }
        } catch (e) {
            console.log(e);
            setloggedIn(false);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, [loggedIn]);

    const Login = async (email, pswd) => {
        setloadingactivity(true);
        if (email === "" || pswd === "") {
            setloadingactivity(false);
            return alert("Validation Error", "Please enter both email and password.");
        } else {
            try {
                var body = {
                    email: email,
                    password: pswd,
                };

                const res = await postUser("login-via-email/", body);
                console.log(">>res..SignIn.", res);

                if (res?.data) {
                    localStorage.setItem("usertoken", res?.data?.access);
                    localStorage.setItem("user_refreshtoken", res?.data?.refresh);
                    localStorage.setItem("userdetails", JSON.stringify(res?.data.user));

                    dispatch({
                        type: "SET_TOKEN",
                        payload: res?.data?.access,
                    });
                    dispatch({
                        type: "SET_REFRESHTOKEN",
                        payload: res?.data?.refresh,
                    });
                    dispatch({
                        type: "SET_USER_DATA",
                        payload: res?.data?.user,
                    });
                    dispatch({
                        type: "SET_LOGGEDIN",
                        payload: true,
                    });
                    setloggedIn(true);
                    setloadingactivity(false);
                    // alert("Success", res?.message);
                    // navigation.navigate('Home')
                } else {
                    setloadingactivity(false);
                    alert(res?.message);
                    console.log(res?.message);
                }
            } catch (e) {
                setloadingactivity(false);
                console.log("errorr... in Login..authcontext", e);
            }
        }
    };

    const GoogleLogin = async (token, account_type) => {
        setloadingactivity(true);
        try {
            var body = {
                access_token: token,
                account_type: account_type,
            };

            const res = await postUser("google/login/callback/", body);
            console.log(">>res", res);
            if (res?.data) {
                localStorage.setItem("usertoken", res?.data?.access);
                localStorage.setItem("user_refreshtoken", res?.data?.refresh);
                localStorage.setItem("userdetails", JSON.stringify(res?.data.user));

                dispatch({
                    type: "SET_TOKEN",
                    payload: res?.data?.access,
                });
                dispatch({
                    type: "SET_REFRESHTOKEN",
                    payload: res?.data?.refresh,
                });
                dispatch({
                    type: "SET_USER_DATA",
                    payload: res?.data?.user,
                });
                dispatch({
                    type: "SET_LOGGEDIN",
                    payload: true,
                });
                setloggedIn(true);
                setloadingactivity(false);
                // alert("Success", res?.message);
                // navigation.navigate('Home')
            } else {
                setloadingactivity(false);
                alert("Error", res?.message);
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                setloadingactivity(false);
                alert("Error", "user cancelled the login flow");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                setloadingactivity(false);
                alert("In Progress", "sign in already in progress");
            } else if (error.response) {
                setloadingactivity(false);
                console.log(error.response.data);
                const errorData = error.response.data;
                alert("error", errorData["non_field_errors"][0] + "Kindly Login through Email and Password");
                await GoogleSignin.signOut();
            }
            // else {
            //   setloadingactivity(false)
            //   Alert.alert('Error', "Something went wrong!");
            //   console.log("Erroorr...", error)
            // }
        }
    };

    const Register = async (f_name, l_name, email, pswd, conPswd, c_code, phone) => {
        setloadingactivity(true);
        if (f_name === "" || l_name === "" || email === "" || pswd === "" || conPswd === "") {
            setloadingactivity(false);
            return alert("Validation Error", "All feilds are required.");
        } else if (pswd != conPswd) {
            setloadingactivity(false);
            return alert("Validation Error", "Password and confirm password do not match.");
        } else {
            try {
                var body = {
                    first_name: f_name,
                    last_name: l_name,
                    email: email,
                    password: pswd,
                    confirm_password: conPswd,
                };
                const res = await postUser("admin/register/", body);

                if (res?.data) {
                    localStorage.setItem("usertoken", res?.data?.access);
                    localStorage.setItem("user_refreshtoken", res?.data?.refresh);
                    localStorage.setItem("userdetails", JSON.stringify(res?.data.user));
                    setloadingactivity(false);
                    dispatch({
                        type: "SET_LOGGEDIN",
                        payload: true,
                    });
                    dispatch({
                        type: "SET_REFRESHTOKEN",
                        payload: res?.data?.refresh,
                    });
                    dispatch({
                        type: "SET_TOKEN",
                        payload: res?.data?.access,
                    });
                    dispatch({
                        type: "SET_USER_DATA",
                        payload: res?.data?.user,
                    });
                    setloggedIn(true);
                    // alert("Success", res?.message);
                    //navigation.navigate('Home')
                } else {
                    setloadingactivity(false);
                    // alert("Success", res?.message);
                }
            } catch (e) {
                setloadingactivity(false);
                console.log("errorr... in Sign Up..authcontext", e);
            }
        }
    };
    const ForgotPswds = async (email) => {
        setloadingactivity(true);
        if (email === "") {
            setloadingactivity(false);
            return alert("Validation Error", "Email is required.");
        } else {
            try {
                var body = {
                    email: email,
                };
                const res = await postUser("pasword-reset/", body);

                if (res?.status == "success") {
                    // setForEmail(email);
                    setloadingactivity(false);
                    alert("Alert", res?.message);
                    // showAlert('Resetpass',res?.message)
                    navigate("/ResetPass");
                    return "success";
                } else {
                    setloadingactivity(false);
                    alert("Alert", res?.message);
                    // showAlert('Resetpass',res?.message)
                }
            } catch (e) {
                setloadingactivity(false);
                console.log("errorr... in ForgotPswds..authcontext", e);
            }
        }
    };

    const ForgotResetPswd = async (token, password) => {
        setloadingactivity(true);
        if (token === "" || password === "") {
            setloadingactivity(false);
            return alert("Validation Error", "All feilds are required.");
        } else {
            try {
                var body = {
                    token: token,
                    password: password,
                };
                const res = await postUser("password-reset/confirm/", body);
                console.log(">>Body", body, ">>respone", res);
                if (res?.status == "success") {
                    setloadingactivity(false);
                    alert("success", res?.message);
                } else {
                    setloadingactivity(false);
                    alert("Error", res?.message);
                }
            } catch (e) {
                setloadingactivity(false);
                console.log("errorr... in Sign Up..authcontext", e);
            }
        }
    };
    return (
        <AuthContext.Provider
            value={{
                Login,
                Register,
                ForgotPswds,
                ForgotResetPswd,
                GoogleLogin,
                loadingactivity,
                loggedIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export { AuthProvider, AuthContext };
