import React from "react";
import Axios from "axios";

class IntroPage extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  // curl --header "Content-Type: application/json" -X POST https://pokelatte-backend.herokuapp.com/user/create/ --data '{"username":"testuser3","password":"Ilike2eatcheese"}'

  async handle_signup() {
    localStorage.clear();
    try {
      let json = await Axios({
        method: "post",
        url: "https://pokelatte-backend.herokuapp.com/user/create/",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          username: this.state.username,
          password: "password",
        }),
      });
      localStorage.setItem("token", json.data.tokens.access);
      localStorage.setItem("username", this.state.username);
      localStorage.setItem("id", json.data.id);
      this.props.setLogin(true);
    } catch (error) {
      if (error.response) {
        let errorString = "";
        if (error.response.data.username) {
          errorString =
            "Trainer Name: " + error.response.data.username.join(" | ") + "\n";
        }
        // if (error.response.data.password) {
        //   errorString +=
        //     "Password: " + error.response.data.password.join(" | ");
        // }
        alert(errorString);
      } else if (error) {
        alert(
          "Hey you might be wondering how you got this error, well Danny doesnt know either ;-;"
        );
      }
    }
  }
  // decided against having multiple logins, creating temp throwaway account is better

  // async handle_login() {
  //   try {
  //     let json = await Axios({
  //       method: "post",
  //       url: "https://pokelatte-backend.herokuapp.com/token/",
  //       headers: { "Content-Type": "application/json" },
  //       data: JSON.stringify({
  //         username: this.state.username,
  //         password: this.state.password,
  //       }),
  //     });
  //     localStorage.setItem("token", json.tokens.access);
  //     this.setState({
  //       logged_in: true,
  //     });
  //   } catch (error) {
  //     if (error.response) {
  //       let errorString = "";
  //       if (error.response.data.detail) {
  //         errorString = error.response.data.detail + "\n";
  //       }
  //       if (error.response.data.username) {
  //         errorString =
  //           "Username: " + error.response.data.username.join(" | ") + "\n";
  //       }
  //       if (error.response.data.password) {
  //         errorString +=
  //           "Password: " + error.response.data.password.join(" | ");
  //       }
  //       alert(errorString);
  //     } else {
  //       alert("Website malfunction, try again?");
  //     }
  //   }
  // }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="flex h-screen">
          <div className="m-auto text-5xl font-bold text-blue-600">
            Logging in
          </div>
        </div>
      );
    }
    return (
      <div>
        <form
          className="bg-indigo-100 mx-auto shadow-md rounded-lg px-8 pt-6 pb-6 mb-4 w-84 sm:w-120 my-8"
          onSubmit={(submission) => {
            submission.preventDefault();
            this.handle_signup();
          }}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Trainer Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handle_change}
              placeholder="Pick a Trainer Name"
              maxLength="12"
            ></input>
          </div>

          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded border focus:border-blue-900 focus:outline-none"
            type="submit"
          >
            Start Your Adventure
          </button>
          <p className="text-xs text-gray-500">
            (Demonstration Only) accounts are stored on device for 48 hours
          </p>
        </form>
      </div>
      // decided to have quick sign-ups instead of actually having credientials
      // <div>
      //   <form
      //     className="bg-indigo-100 mx-auto shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-84"
      //     onSubmit={(submission) => {
      //       submission.preventDefault();
      //       this.handle_signup();
      //     }}
      //   >
      //     <div className="mb-4">
      //       <label
      //         className="block text-gray-700 text-sm font-bold mb-2"
      //         htmlFor="username"
      //       >
      //         Username
      //       </label>
      //       <input
      //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
      //         type="text"
      //         name="username"
      //         value={this.state.username}
      //         onChange={this.handle_change}
      //         placeholder="Username"
      //       ></input>
      //     </div>
      //     <div className="mb-6">
      //       <label
      //         className="block text-gray-700 text-sm font-bold mb-2"
      //         htmlFor="password"
      //       >
      //         Password
      //       </label>
      //       <input
      //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
      //         type="password"
      //         name="password"
      //         value={this.state.password}
      //         onChange={this.handle_change}
      //         placeholder="******************"
      //       ></input>
      //     </div>
      //     <div className="flex items-center justify-between">
      //       <button
      //         className="bg-blue-500 text-white font-bold py-2 px-4 rounded border hover:bg-blue-600 focus:border-blue-900 focus:outline-none"
      //         type="submit"
      //       >
      //         Sign Up
      //       </button>
      //       <p className="font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">
      //         Already have an account?
      //       </p>
      //     </div>
      //   </form>
      // </div>
    );
  }
}

export default IntroPage;
