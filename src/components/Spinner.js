import React, { Component } from "react";
import { RotatingTriangles } from "react-loader-spinner";

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <RotatingTriangles />
      </div>
    );
  }
}
