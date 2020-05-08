import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../actions/userActions";

import { Alert } from "reactstrap";
class Login extends Component {
  state = {
    msg: null
  };
  // static propTypes = { errors: this.PropTypes.array.isRequired };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const user = this.state;
    user.email = user.email.toLowerCase();
    this.props.login(user);
  };
  render() {
    return (
      <div>
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card card-body">
              <h1 className="text-center mb-3">
                <i className="fas fa-sign-in-alt"></i> Login
              </h1>
              {this.props.errors.length !== 0 ? (
                <Alert color="danger">{this.props.errors}</Alert>
              ) : null}
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={this.onChange}
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={this.onChange}
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                  />
                </div>
                <p className="lead mt-4">
                  <a href="/forgot">Forgot Password?</a>
                </p>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>

                <p className="lead mt-4">
                  No Account? <a href="/register">Register</a>{" "}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  errors: state.user.errors,
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
