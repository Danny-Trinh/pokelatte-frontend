import React, { Component } from "react";

export default class ErrorPage extends Component {
  render() {
    return (
      <div className="flex h-screen">
        <div className="m-auto text-5xl font-bold text-black-600">
          404 Error, please try logging in or retyping web address
        </div>
      </div>
    );
  }
}
