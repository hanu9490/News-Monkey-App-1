import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = { articles: [], isLoading: false, page: 1 };
    document.title = `NewsMonkey-${
      this.props.category[0].toUpperCase() + this.props.category.slice(1)
    }`;
  }

  async updateNews(pageStatus) {
    const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=7719bb41740a4d6fa3d548b048d084f2&page=${pageStatus}&pageSize=${this.props.pageSize}`;
    this.setState({ isLoading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      isLoading: false,
    });
    console.log(parsedData);
  }

  async componentDidMount() {
    this.updateNews(this.state.page);
  }

  onChangePagePrevious = async () => {
    this.setState((prevState) => ({
      page: prevState.page - 1,
    }));
    this.updateNews(this.state.page - 1);
  };

  onChangePageNext = async () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
    this.updateNews(this.state.page + 1);
  };

  render() {
    return (
      <div className="container my-4">
        <h2 className="text-center" style={{ marginTop: "80px" }}>
          News - Monkey
        </h2>
        {this.state.isLoading && <Spinner />}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              !this.state.isLoading && (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 120)
                        : ""
                    }
                    imgUrl={element.urlToImage}
                    urlLink={element.url}
                    time={element.publishedAt}
                    author={element.author}
                    source={element.source.name}
                  />
                </div>
              )
            );
          })}
        </div>
        <div className="container mt-3 d-flex justify-content-between top-fixed">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.onChangePagePrevious}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.onChangePageNext}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
