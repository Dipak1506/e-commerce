import "../css/login.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api";
import { setIsLogin } from "../redux/reducers/loginReducer";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [signInError, setSignInError] = useState("");
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();

  const register = () => {
    navigate("/register");
  };

  const home = () => {
    navigate("/");
  };

  const handleSignIn = async () => {
    if (email === "") {
      setUsernameError("Please enter valid Email address");
    } else if (password === "") {
      setPassError("Password is required");
    } else {
      try {
        const response = await api
          .PostApi(`${process.env.REACT_APP_BACKEND_URL}login/submit`, {
            email: email,
            password: password,
          })
          .then((response) => response.json())
          .then((response) => {
            console.log("Response signin= " + JSON.stringify(response));
            setSignInError(response.message);
            if (response.isSuccessful === true) {
              dispatch(setIsLogin(true));
              home();
              sessionStorage.setItem("user", JSON.stringify(response.token));
            }
          })
          .catch((err) => {
            console.log(err, "error");
          });

        //  setSignInError(response.message);
        //setIsLoggedIn(true); // Assuming setIsLoggedIn is a prop passed from parent component
      } catch (error) {
        // console.error(error.response.data);
        // setSignInError("Error: " + error.response.data.message); // Assuming backend sends error messages in "message" property
      }
      // setIsLogIn(true);
    }
  };

  return (
    <div className="login_home">
      <h1 className="Title">Choose a Login Method 🍻</h1>
      <div className="wrapper">
        <div className="right">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="inputs">
            <label className="error">
              {" "}
              {usernameError} {passError} {signInError}
            </label>
          </div>
          <button className="submit" onClick={handleSignIn}>
            Login
          </button>
          <p className="warning">
            Don't have account? <span onClick={register}> Register Here!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
