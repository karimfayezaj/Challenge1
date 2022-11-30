import classes from "./ArticleCard.module.css";

const ArticleCard = (props) => {
    return (
        <div className={classes.center}>
            <div className={classes.card}>
                <div>
                    <label className={classes.cardlabel}>{props.children.headline.main}</label>
                    <label className={classes.pubdate}>Publication Date: {props.children.pub_date}</label>
                </div>

                <div className={classes.lead_paragraph}>
                    <p>{props.children.lead_paragraph}</p>
                </div>
                <hr></hr>
                <div>
                    {props.children.byline.original}
                </div>

            </div>
        </div>
    );
};

export default ArticleCard;
