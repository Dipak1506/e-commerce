import '../css/register.css';
import api from "../Api";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { checkEmail, checkUsername } from "../utils/comman";
import { useNavigate } from 'react-router-dom';
import { setIsLogin } from '../redux/reducers/loginReducer';

const Register = () => {
    const navigate = useNavigate();
  
    const [password, setPassword] = useState('');
    const [passError, setPassError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [confirmPass, setConfirmPass] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
  
    const [cpassError, setCpassError] = useState('');
    const [signUpError, setSignupError] = useState('');

    const dispatch = useDispatch();

    const login = () => {
        navigate("/login");
    }

    const home = () => {
        navigate("/");
    }

    const handleSignUp = async () => {
        setNameError('');
        setEmailError('');
        setPassError('');
        setCpassError('');
        setSignupError('');

        if (!name.trim()) {
            setNameError("Name is required");
        }
        else if (!checkEmail(email)) {
            setEmailError("Please enter valid email address")
        }
        else  if (!password.trim()) {
            setPassError("Password is required");
            return;
        }
        else if (password.length < 8) {
            setPassError("Password should be at least 8 characters long");
            return;
        }
        else if (confirmPass === '') {
            setCpassError("Please re-enter your password")
        }
        else if (confirmPass !== password) {
            setCpassError("Both passwords must be the same")
        }
        else {
            console.log("react-data : " + name + email  + password );
            try {
                const response = await   api
                .PostApi(`${process.env.REACT_APP_BACKEND_URL}register/submit`,{
                        name: name,
                        email: email,
                        password: password
                })
                .then((response) => response.json())
                .then((response) => {
                    console.log("Response signin= " + JSON.stringify(response));
                    setSignupError(response.message);
                    if (response.isSuccessful === true) {
                        dispatch(setIsLogin(true));
                        home();
                        sessionStorage.setItem("user", JSON.stringify(response.token));
                      }
                })
                .catch((err) => {
                  console.log(err, "error");
                });
            } catch (error) {
                console.error(error.response.data);
                setSignupError("Error: " + error.response.data.message); // Assuming backend sends error messages in "message" property
            }
           
        }
        }
    




    return (
        <div className="register">
            <h1 className="Title">Register Here</h1>
            <div className="wrapper">
                <div className="right">
                    <input type="text" placeholder=" Name" id="name" value={name} maxLength={16}
                        onChange={(e) => {
                            const re = /^[a-zA-Z ]+$/;
                            if (e.target.value === "" || re.test(e.target.value)) {
                                setName(e.target.value);
                            }
                        }
                        } />
                    <input type="email" placeholder="Email" id="mail" value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                    <input type="password" placeholder="Password" id="password" value={password}
                        maxLength={10}
                        onChange={(e) => {
                            const re = /^[A-Za-z0-9_]+$/;
                            if (e.target.value === "" || re.test(e.target.value)) {
                                setPassword(e.target.value);
                            }
                        }} />

                    <input type="password" placeholder="Confirm Password" id="confirm" value={confirmPass}
                        maxLength={10}
                        onChange={(e) => {
                            const re = /^[A-Za-z0-9_]+$/;
                            if (e.target.value === "" || re.test(e.target.value)) {
                                setConfirmPass(e.target.value);
                            }
                        }} />
                    <div className="inputs">
                        <label className="error">{nameError} {emailError} {} {passError} {cpassError} {signUpError} {} </label>
                    </div>
                    <button className="submit" onClick={handleSignUp} >Register</button>
                    <p className='warning'>already have account? <span onClick={login}> Login Here!</span></p>
                </div>

            </div>
        </div>
    );
};

export default Register;