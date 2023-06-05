import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const str2 = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updatenews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsel = await data.json();
    // console.log(parsel);
    props.setProgress(70);
    setArticles(parsel.articles);
    setTotalResults(parsel.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updatenews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsel = await data.json();
    // console.log(parsel);
    setPage(page + 1);
    setArticles(articles.concat(parsel.articles))
    setTotalResults(parsel.totalResults)
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ marginTop: '70px' }}>
        Today's News on {str2(props.category)} Category
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={page+1>(Math.ceil(totalResults/props.pageSize))?" ":<Spinner/>}
        // loader={<Spinner/>}
      >
        <div className="container">
          <div className="row">
            {articles.map((elements) => {
              return (
                <div className="col-md-4" key={elements.url}>
                  <NewsItem
                    title={elements.title}
                    description={elements.description}
                    url={
                      !elements.urlToImage
                        ? `https://images.indianexpress.com/2022/02/kashmir-police-1200-1.jpg`
                        : elements.urlToImage
                    }
                    newsUrl={elements.url}
                    author={elements.author}
                    date={elements.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
