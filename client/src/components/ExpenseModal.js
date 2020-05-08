import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter
} from "reactstrap";
import { connect } from "react-redux";
import {
  addExpense,
  updateExpense,
  deleteExpense
} from "../actions/ExpenseActions";

class ExpenseModal extends Component {
  state = {
    modal: false,
    name: "",
    type: "food"
  };

  componentDidMount() {
    if (this.props.method === "update") {
      this.setState({
        etiology: this.props.etiology,
        type: this.props.type,
        ammount: this.props.ammount
      });
    }
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  onDeleteClick = id => {
    this.props.deleteExpense(id);
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e, id) => {
    e.preventDefault();
    if (this.props.method === "update") {
      const updateExpense = this.state;

      this.props.updateExpense(updateExpense, id);
    } else {
      const newExpense = this.state;
      this.props.addExpense(newExpense, this.props.month, this.props.year);
    }
    if (this.props.method === "update") {
      this.setState({
        modal: false
        // type: "food"
      });
    } else {
      this.setState({
        modal: false,
        type: "food"
      });
    }
  };
  render() {
    let id = this.props.id;

    return (
      <div>
        {this.props.method === "delete" ? (
          <Fragment>
            <Button color="danger" onClick={this.toggle}>
              {this.props.buttonid}
            </Button>
            <Modal isOpen={this.state.modal}>
              <ModalHeader toggle={this.toggle}>Erase Expense</ModalHeader>
              <ModalBody>Are sure you want to erase this expense?</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={this.onDeleteClick.bind(this, this.props.id)}
                >
                  Yes
                </Button>{" "}
                <Button color="warning" onClick={this.toggle}>
                  No
                </Button>
              </ModalFooter>
            </Modal>
          </Fragment>
        ) : (
          <Button
            color={this.props.method === "update" ? "warning" : "success"}
            onClick={this.toggle}
          >
            <Modal isOpen={this.state.modal}>
              <ModalHeader toggle={this.toggle}>
                {this.props.method === "update"
                  ? "Update Expense"
                  : "Add Expense"}
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={e => this.onSubmit(e, id)}>
                  <FormGroup>
                    <Label for="etiology">Etiology</Label>
                    <Input
                      value={
                        this.props.method === "update"
                          ? this.state.etiology
                          : null
                      }
                      type="text"
                      name="etiology"
                      id="etiology"
                      placeholder={
                        this.props.method === "update"
                          ? "Update Expense Etiology"
                          : "Add Expense Etiology"
                      }
                      onChange={this.onChange}
                    />
                    <Label for="type">Type</Label>

                    <select
                      value={
                        this.props.method === "update" ? this.state.type : null
                      }
                      type="select"
                      className="form-control"
                      name="type"
                      id="type"
                      onChange={this.onChange}
                    >
                      <option value="food">food</option>
                      <option value="fixed cost">fixed cost</option>
                      <option value="drinks">drinks</option>
                      <option value="other">other</option>
                    </select>

                    <Label for="ammount">Ammount</Label>
                    <Input
                      value={
                        this.props.method === "update"
                          ? this.state.ammount
                          : null
                      }
                      type="number"
                      name="ammount"
                      id="ammount"
                      step="0.1"
                      placeholder={
                        this.props.method === "update"
                          ? "Update Expense Ammount"
                          : "Add Expense Ammount"
                      }
                      onChange={this.onChange}
                    />

                    <Button color="dark" style={{ marginTop: "2rem" }} block>
                      {this.props.method === "update"
                        ? "Update Expense"
                        : "Add Expense"}
                    </Button>
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
            {this.props.method === "update" ? (
              <i className="fas fa-edit"></i>
            ) : (
              "Add Expense"
            )}
          </Button>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  expense: state.expense
});
export default connect(mapStateToProps, {
  addExpense,
  updateExpense,
  deleteExpense
})(ExpenseModal);
