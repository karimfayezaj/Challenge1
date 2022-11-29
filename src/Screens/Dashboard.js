import { useRef } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {


    const password = useSelector(state => state.auth.password);

    const token = useSelector(state => state.auth.token);
    const searchArticles = useRef("");

    const urlFetch = "http://34.245.213.76:3000/";
    const articles = [];
    const fetchArticles = async () => {
        const response = await fetch(urlFetch, {
            method: "GET",
            headers: {
                'Content-Type': "application-json"
            },
        });

    }

    return (<div>
        <label>Welcome {token}</label>
        <input ref={searchArticles} />
        <div>
            <button onClick={fetchArticles}>Search Articles</button>
        </div>
        <div>
            {articles}
        </div>


    </div >);
}



export default Dashboard;