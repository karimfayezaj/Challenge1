import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/index";
import { useRef, useEffect } from "react";


const LoginPage = () => {
    const dispatch = useDispatch();

    const userName = useRef("");
    const password = useRef("");

    const SubmitForm = (event) => {
        console.log(userName.current.value);
        console.log(password.current.value);
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
            });
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

    return (
        <form onSubmit={SubmitForm}>
            <div>
                <div>
                    <input
                        type='name'
                        ref={userName}
                    />
                </div>
                <div>
                    <input
                        type='password'
                        ref={password}

                    />
                </div>
            </div>
            {<button type="submit" >Login</button>}
        </form >
    );
};

export default LoginPage;




