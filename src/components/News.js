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

  getNewsApi = async () => {
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=9f4613e280b04c8d8525951305f3c631&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ isLoading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      isLoading: false,
    });
  };

  async componentDidMount() {
    this.getNewsApi();
  }

  onChangePagePrevious = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.getNewsApi();
  };

  onChangePageNext = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      this.setState({
        page: this.state.page + 1,
      });
      this.getNewsApi();
    }
  };

  render() {
    return (
      <div className="container my-4">
        <h2 className="text-center my-3">News - Monkey</h2>
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
        <div className="container mt-3 d-flex justify-content-between">
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
