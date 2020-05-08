import React, { Component } from "react";
import { connect } from "react-redux";
import { forgot } from "../actions/userActions";
import ResetPasswordModal from "./ResetPasswordModal";
// import PropTypes from "prop-types";
import { Alert } from "reactstrap";
import axios from "axios";

class ForgottenPW extends Component {
  state = {
    msg: null,
    param_token: Math.random(),
    dbtoken: Math.random()
  };
  returnMessage(msg) {
    this.setState({ msg });
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    let emailtolower = this.state.email.toLowerCase();
    axios
      .post("/checkmail", {
        email: emailtolower
      })
      .then(res => {
        if (res.data.message === "mail sent") {
          this.setState({ success: res.data.message, token: res.data.token });
          return res.data;
        } else {
          this.setState({ errors: res.data[0].msg });
          return res.data;
        }
      });

    setTimeout(() => {
      axios
        .post("/forget_token", {
          email: emailtolower
        })
        .then(res => {
          this.setState({ errors: res.data.message });
        });
    }, 5 * 60 * 1000);
  };
  componentDidMount() {
    this.checkparams();
    this.getdbToken();
  }
  checkparams = () => {
    let search = this.props.location.search;
    let n = search.indexOf("?");

    let n2;
    let param_email;
    let param_token;
    if (n > -1) {
      n2 = search.indexOf("&");

      param_email = search.slice(n + 7, n2);
      param_token = search.slice(n2 + 7);
      this.setState({
        param_email,
        param_token
      });
    }
  };
  getdbToken = async () => {
    await this.componentDidMount;
    if (this.state.param_token) {
      axios
        .post("/get_token", {
          email: this.state.param_email
        })
        .then(res => {
          this.setState({ dbtoken: res.data.dbtoken });
        });
    }
  };
  render() {
    return (
      <div>
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card card-body">
              <h1 className="text-center mb-3">
                <i className="fas fa-sign-in-alt"></i> Reset Password
              </h1>
              {this.state.msg !== null ? (
                <Alert color="success">{this.state.msg}</Alert>
              ) : null}
              {this.state.dbtoken === "" ? (
                <Alert color="danger">token expired</Alert>
              ) : null}
              {this.state.errors != null ? (
                <Alert color="danger">{this.state.errors}</Alert>
              ) : this.state.success != null ? (
                <Alert color="success">{this.state.success}</Alert>
              ) : null}

              {this.state.param_token === this.state.dbtoken ? (
                <ResetPasswordModal
                  returnMessage={this.returnMessage.bind(this)}
                  email={this.state.param_email}
                />
              ) : null}

              {this.state.param_token === this.state.dbtoken ? null : (
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

                  <button type="submit" className="btn btn-primary btn-block">
                    Reset
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  //   user: state.user,
  errors: state.user.errors
  //   isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps, { forgot })(ForgottenPW);
