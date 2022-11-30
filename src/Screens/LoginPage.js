import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/index";
import { useRef, useEffect, useState } from "react";
import classes from './LoginPage.module.css';


const LoginPage = () => {
    const dispatch = useDispatch();

    const userName = useRef("");
    const password = useRef("");

    const [buttonDesign, setButtonDesign] = useState(classes.buttondisabled);
    const [buttonEnabled, setButtonEnabled] = useState(true);



    useEffect(() => {
        console.log(userName.current.value);
    }, [userName.current.value, password.current.value])




    const SubmitForm = (event) => {
        setButtonDesign(classes.buttonddisabled);
        setButtonEnabled(true);
        event.preventDefault();
        const credentials = {
            "username": userName.current.value,
            "password": password.current.value,
        }
        const requestLogin = async () => {

            const response = await fetch("http://34.245.213.76:3000/auth/signin", {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(() => {
                onChangeValue();
            })
            if (!response.ok) {
                throw new Error('Incorrect Credentials');
            }
            const responseData = await response.json();
            dispatch(authActions.logInUser());
            dispatch(authActions.saveCredentials(responseData.accessToken));
            dispatch(authActions.savePassword(password.current.value));
        }
        requestLogin();
    }


    const onChangeValue = () => {
        if (userName.current.value !== "" && password.current.value !== "") {
            setButtonDesign(classes.buttondenabled);
            setButtonEnabled(false);
        }
        else {
            setButtonDesign(classes.buttonddisabled);
            setButtonEnabled(true);
        }
    }

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
                    {<button type="submit" className={buttonDesign} disabled={buttonEnabled}>Login</button>}
                </form >
            </div>
            <div className={classes.logincard}>
                <p>Message Board</p>
            </div>
        </div>
    );
};

export default LoginPage;




