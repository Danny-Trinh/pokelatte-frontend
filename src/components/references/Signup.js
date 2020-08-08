import React from "react";
import PropTypes from "prop-types";

export default class Signup extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handle_change = (submission) => {
    const name = submission.target.name;
    const value = submission.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <form
        onSubmit={(submission) =>
          this.props.handle_signup(submission, this.state)
        }
      >
        <h4>Sign Up</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        <input type="submit" />
      </form>
    );
  }
}
Signup.propTypes = {
  handle_signup: PropTypes.func.isRequired,
};
