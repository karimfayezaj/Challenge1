import { useSelector, useDispatch } from 'react-redux';

import classes from './Header.module.css';
import { authActions } from '../Store/index';

const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuth);

    const logoutHandler = () => {
        dispatch(authActions.logOutUser());
    };

    return (
        <header className={classes.header}>
            <h1>Articles web application</h1>
            {isAuth && (
                <nav>

                    <button onClick={logoutHandler}>Logout</button>

                </nav>
            )}
        </header>
    );
};

export default Header;