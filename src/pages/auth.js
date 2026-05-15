import React, { Component } from "react";
import AuthContext from "../context/auth-context";
import { withNavigation } from "../components/helper/helper";

import "./Auth.css";

class AuthPage extends Component {
  state = {
    isLogin: true,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.firstNameEl = React.createRef();
    this.lastNameEl = React.createRef();
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState((prevState) => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const firstName = this.firstNameEl.current?.value;
    const lastName = this.lastNameEl.current?.value;
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      (!this.state.isLogin &&
        (firstName.trim().length === 0 || lastName.trim().length === 0))
    ) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `,
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(
              userInput: { 
                firstName: "${firstName}", 
                lastName: "${lastName}",
                email: "${email}", 
                password: "${password}"
              }
            )  {
                _id
                firstName
                lastName
                email
            }          
          }
        `,
      };
    }

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.data.login && resData.data.login) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration,
          );

          this.props.navigate("/main");
        }

        if (!this.state.isLogin && resData.data.createUser) {
          alert("Account created! Game On!")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="auth-page">
        <header className="auth-header">
          <h1>GameOn</h1>
        </header>
        <form className="auth-form" onSubmit={this.submitHandler}>
          <h1>{this.state.isLogin ? "Login" : "Sign Up"}</h1>
            {!this.state.isLogin && (
              <>
                <div className="form-control">
                  <label htmlFor="firstName">First Name</label>
                  <input 
                    type="text"
                    id="firstName"
                    ref={this.firstNameEl}
                    required
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="lastName">Last Name</label>
                  <input 
                    type="text"
                    id="lasstName"
                    ref={this.lastNameEl}
                    required
                  />
                </div>
            </>
            )}
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input 
              type= "email" 
              id="email" 
              ref={this.emailEl} 
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              ref={this.passwordEl} 
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">
              {this.state.isLogin ? "Login" : "Sign Up"}
            </button>
            <button type="button" onClick={this.switchModeHandler}>
              {this.state.isLogin ? "Switch to Sign Up" : "Switch to Login"}
            </button>
          </div>
        </form>

        <footer className="copyright">
          Copyright &copy; 2026 GameOn. All rights reserved.
        </footer>
      </div>
    );
  }
}

export default withNavigation(AuthPage);
