import React, { Component } from "react";

class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, urlLink, time, author, source } =
      this.props;
    return (
      <div className="m-3">
        <div className="card">
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          <img
            src={
              !imgUrl
                ? "https://imgs.search.brave.com/S3T3B8nahnuwGHbVWX6JrrDTeQ9cKkw7nxC8Vabl9lU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg5LzU1LzE1/LzM2MF9GXzg5NTUx/NTk2X0xkSEFaUnd6/M2k0RU00SjBOSE5I/eTJoRVVZRGZYYzBq/LmpwZw"
                : imgUrl
            }
            className="card-img-top"
            style={{ height: "25vh" }}
            alt="titleImg"
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {!description
                ? "Oops... at the movement the Content is not available and please click the below button to read the content "
                : description}
              ...
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "Unknown " : author + " "}
                {new Date(time).toGMTString()}
              </small>
            </p>
            <a href={urlLink} target="__blank" className="btn btn-dark">
              Click Here
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
