import './Screens/LoginPage';
import './App.css';
import Dashboard from './Screens/Dashboard';
import LoginPage from './Screens/LoginPage';
import { useSelector } from "react-redux";

import Header from './Components/Header';


function App() {

  const loggedIn = useSelector(state => state.auth.isAuth);


  return (
    <div className="App">
      <Header />
      {loggedIn ? <Dashboard /> : <LoginPage />}
    </div>
  );
}

export default App;
