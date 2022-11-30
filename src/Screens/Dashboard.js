import { render } from "@testing-library/react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ArticleCard from "../Components/ArticleCard";

const Dashboard = () => {


    const token = useSelector(state => state.auth.token);
    const searchArticles = useRef("");

    const urlFetch = "http://34.245.213.76:3000/articles?page=0";
    const [articles, setArticles] = useState([]);
    const fetchArticles = async () => {
        const response = await fetch(urlFetch, {
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + token,
                'Accept': "application-json"
            },
        });
        const responseData = await response.json();
        setArticles(responseData.response.docs);
        console.log(responseData.response.docs)
    }


    return (<div>
        <label>Welcome {token}</label>
        <input ref={searchArticles} />
        <div>
            <button onClick={fetchArticles}>Search Articles</button>
        </div>
        <div>
            {articles.map((element, index) => { return <ArticleCard>{element}</ArticleCard> })}
        </div>


    </div >);
}



export default Dashboard;