import { useSelector } from "react-redux";

const Dashboard = () => {


    const token = useSelector(state => state.auth.token);

    const articles = [];
    const fetchArticles = async () => {
        const articlesList = await fetch("http://34.245.213.76:3000/articles?page=1", {
            method: "GET",
        });
        articles.concat(articlesList);
        console.log(articles);
    }

    return (<div>
        <label>Welcome {token}</label>
        <div>
            <button onClick={fetchArticles}>Search Articles</button>
        </div>
        <div>
            {articles}
        </div>


    </div >);
}



export default Dashboard;