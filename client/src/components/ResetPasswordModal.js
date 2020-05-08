import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import { connect } from "react-redux";

import { forgot } from "../actions/userActions";

class ResetPasswordModal extends Component {
  state = {
    modal: false
  };
  toggle = () => {
    this.props.returnMessage(null);
    this.setState({
      modal: !this.state.modal
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e, email) => {
    e.preventDefault();

    const user = {
      email: email,
      password: this.state.password,
      password2: this.state.password2
    };
    user.email = user.email.toLowerCase();
    this.props.forgot(user);

    this.setState({
      modal: false
    });
    this.props.returnMessage("password changed");
  };
  render() {
    let email = this.props.email;

    return (
      <div>
        <Button
          color="warning"
          style={{ marginBottom: "1rem", width: "100%" }}
          onClick={this.toggle}
        >
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Reset Password</ModalHeader>
            <ModalBody>
              {email === undefined ? (
                <Alert color="danger">
                  Παρακαλώ Πολύ εισάγεται email και ξαναπροσπαθήστε
                </Alert>
              ) : (
                <Form onSubmit={e => this.onSubmit(e, email)}>
                  <FormGroup>
                    <Label for="etiology">New Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="New Password"
                      onChange={this.onChange}
                    />

                    <Label for="password2">Confirm Password</Label>
                    <Input
                      type="password"
                      id="password2"
                      name="password2"
                      placeholder="Confirm Password"
                      onChange={this.onChange}
                    />

                    <Button color="dark" style={{ marginTop: "2rem" }} block>
                      Confirm
                    </Button>
                  </FormGroup>
                </Form>
              )}
            </ModalBody>
          </Modal>
          Reset Password
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.user.errors
});

export default connect(mapStateToProps, { forgot })(ResetPasswordModal);
