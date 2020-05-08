import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../actions/userActions";
import { Alert } from "reactstrap";
class Register extends Component {
  state = {
    isAuthenticated: false,
    name: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = this.state;
    newUser.email = newUser.email.toLowerCase();
    this.props.register(newUser);
    this.setState({
      isAuthenticated: true
    });
  };
  render() {
    return (
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3">
              <i className="fas fa-user-plus"></i> Register
            </h1>

            {this.props.errors !== "undefined"
              ? this.props.errors.map((error, index) => (
                  <Alert key={index} color="danger">
                    {error.msg}
                  </Alert>
                ))
              : null}
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  onChange={this.onChange}
                  type="name"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter Name"
                />
              </div>
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
                  placeholder="Create Password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  onChange={this.onChange}
                  type="password"
                  id="password2"
                  name="password2"
                  className="form-control"
                  placeholder="Confirm Password"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>

              <p className="lead mt-4">
                Have An Account? <a href="/login">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  errors: state.user.errors
});

export default connect(mapStateToProps, { register })(Register);
