import React from "react";

const NewsItem = (props) => {
  let { title, description, url, newsUrl, author, date } = props;
  return (
    <div className="my-3">
      <div className="card">
        <img src={url} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className=" text-danger">
              Author : {!author ? "Unknown" : author}, Time :{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
