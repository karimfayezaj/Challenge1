import classes from "./ArticleCard.module.css";

// dd/mm/yyyy format.


const ArticleCard = (props) => {
    const formatDate = new Date();
    const day = formatDate.getDay(props.children.pub_date);
    const month = formatDate.getMonth(props.children.pub_date);
    const year = formatDate.getFullYear(props.children.pub_date);


    return (
        <div className={classes.center}>
            <div className={classes.card}>
                <div>
                    <label className={classes.cardlabel}>{props.children.headline.main}</label>
                    <label className={classes.pubdate}>Publication Date: {day}/{month}/{year}</label>
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
