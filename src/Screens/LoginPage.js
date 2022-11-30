import { useDispatch } from "react-redux";
import { authActions } from "../Store/index";
import { useRef, useState } from "react";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
    const dispatch = useDispatch();

    let userName = useRef("");
    let password = useRef("");

    const [buttonDesign, setButtonDesign] = useState(classes.buttondisabled);
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [messageBoard, setMessageBoard] = useState("Message Board");

    const SubmitForm = (event) => {
        setButtonDesign(classes.buttonddisabled);
        setButtonEnabled(true);
        loadingIndicator();
        event.preventDefault();
        const credentials = {
            username: userName.current.value,
            password: password.current.value,
        };
        const requestLogin = async () => {
            const response = await fetch("http://34.245.213.76:3000/auth/signin", {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                setMessageBoard("Incorrect Credentials");
                userName.current.value = "";
                password.current.value = "";
                throw new Error("Invalid Request");
            } else {
                setMessageBoard("Login Successful");
                const responseData = await response.json();
                dispatch(authActions.logInUser());
                dispatch(authActions.saveCredentials(responseData.accessToken));
            }
        };
        try {
            requestLogin();
        }
        catch (error) {
            console.error(error);
        }

    };

    const onChangeValue = () => {
        if (userName.current.value !== "" && password.current.value !== "") {
            setButtonDesign(classes.buttondenabled);
            setButtonEnabled(false);
        } else {
            setButtonDesign(classes.buttonddisabled);
            setButtonEnabled(true);
        }
    };

    const loadingIndicator = () => {
        setMessageBoard("Loading in Progress");
    };

    return (
        <div>
            <div className={classes.logincard}>
                <form onSubmit={SubmitForm}>
                    <div>
                        <div>
                            <label className={classes.loginlabel}>Username</label>
                            <input
                                type='name'
                                ref={userName}
                                className={classes.logininput}
                                onChange={onChangeValue}
                            />
                        </div>
                        <div>
                            <label className={classes.loginlabel}>Password</label>
                            <input
                                type='password'
                                ref={password}
                                className={classes.logininput}
                                onChange={onChangeValue}
                            />
                        </div>
                    </div>
                    {
                        <button
                            type='submit'
                            className={buttonDesign}
                            disabled={buttonEnabled}
                        >
                            Login
                        </button>
                    }
                </form>
            </div>
            <div className={classes.logincard}>
                <p>{messageBoard}</p>
            </div>
        </div>
    );
};

export default LoginPage;
