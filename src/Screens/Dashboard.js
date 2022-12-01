import { render } from "@testing-library/react";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArticleCard from "../Components/ArticleCard";
import { articlesAction } from "../Store";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    const searchArticles = useRef("");
    let articles = useSelector((state) => state.articles.listArticles);
    let filtered = useSelector((state) => state.articles.listFiltered);
    let pageNumber = useSelector((state) => state.articles.pageNumber);
    let [messageBoard, setMessageBoard] = useState(
        "Waiting for articles to load"
    );
    let urlFetch = `http://34.245.213.76:3000/articles?page=${pageNumber}`;

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await fetch(urlFetch, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application-json",
                },
            });
            const responseData = await response.json();
            if (!response.ok) {
                setMessageBoard("Invalid Request");
                throw new Error("Invalid request");
            } else if (responseData.response.docs.length === 0) {
                setMessageBoard("No articles found");
                throw new Error("No Data Fetched");
            } else {
                dispatch(articlesAction.loadAllArticles(responseData.response.docs));
            }
        };
        fetchArticles();
    }, [token, dispatch, urlFetch]);

    const filterList = () => {
        articles.forEach((element) => {
            if (element.abstract.includes(searchArticles.current.value)) {
                dispatch(articlesAction.filterArticles(element));
            }
        });
    };

    const renderArticles = () => {
        if (searchArticles.current.value !== "") {
            return filtered.map((element, index) => {
                return <ArticleCard key={element._id}>{element}</ArticleCard>;
            });
        } else {
            return articles.map((element, index) => {
                return <ArticleCard key={element._id}>{element}</ArticleCard>;
            });
        }
    };

    return (
        <div>
            <form onSubmit={() => { }}>
                <div className={classes.dashboardcard}>
                    <label className={classes.dashboardlabel}>Search for: </label>
                    <input className={classes.dashboardinput} ref={searchArticles} />
                    <div>
                        <button type="submit">Search Articles</button>
                    </div>
                </div>
            </form>

            <div>
                {articles.length > 0 ? renderArticles() : <p> {messageBoard}</p>}
            </div>
            <div>
                <button
                    disabled={searchArticles.current.length > 0 ? true : false}
                    onClick={() => {
                        dispatch(articlesAction.changePageNumber(1));
                    }}
                >
                    {pageNumber >= 2 ? <p>No more Data</p> : <p>Load more data... </p>}
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
