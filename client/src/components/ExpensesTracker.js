import React, { Component, Fragment } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Badge,
  Row,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import {
  getExpenses,
  deleteExpense,
  addExpense,
} from "../actions/ExpenseActions";
import PropTypes from "prop-types";
import ExpenseModal from "./ExpenseModal";
import Chart from "./Chart";

class Expenses extends Component {
  constructor() {
    super();
    const date = new Date();
    this.state = {
      chartData: {
        labels: ["Φαγητό", "Πάγια έξοδα", "Ποτά/Καφέδες", "Λοιπά έξοδα"],
        datasets: [
          {
            label: "Expenses",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(35, 203, 167, 1)",
            ],
          },
        ],
      },
      data: [],
      sum_drinks: 0,
      sum_food: 0,
      sum_fixed: 0,
      sum_other: 0,
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  }

  componentDidMount() {
    this.props.getExpenses(this.state.month, this.state.year);
  }
  onDeleteClick = (id) => {
    this.props.deleteExpense(id);
  };
  onUpdateClick = (id) => {
    this.props.updateExpense(id);
  };
  // onAddClick = name => {

  //   this.props.addExpense(name, this.state.month, this.state.year);
  // };
  onChange = (e) => {
    if (e.target.name === "month") {
      // this.setState({
      //   month: Number(e.target.value)
      // });
      this.state.month = Number(e.target.value);
    } else if (e.target.name === "year") {
      // this.setState({
      //   year: Number(e.target.value)
      // });
      this.state.year = Number(e.target.value);
    }

    this.props.getExpenses(this.state.month, this.state.year);
  };
  calculate = (expenses) => {
    let sum_fixed = 0;
    let sum_food = 0;
    let sum_drinks = 0;
    let sum_other = 0;
    // const emptyarray = [];
    // this.state.chartData.datasets[0].data = emptyarray;
    this.state.chartData.datasets[0].data.splice(
      0,
      this.state.chartData.datasets[0].data.length
    );

    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].type === "fixed cost") {
        sum_fixed = (sum_fixed * 10 + expenses[i].ammount * 10) / 10;
      } else if (expenses[i].type === "food") {
        sum_food = (sum_food * 10 + expenses[i].ammount * 10) / 10;
      } else if (expenses[i].type === "drinks") {
        sum_drinks = (sum_drinks * 10 + expenses[i].ammount * 10) / 10;
      } else {
        sum_other = (sum_other * 10 + expenses[i].ammount * 10) / 10;
      }
    }

    this.state.chartData.datasets[0].data.push(
      sum_food,
      sum_fixed,
      sum_drinks,
      sum_other
    );
  };
  render() {
    const static_date = new Date();
    const static_month = static_date.getMonth();
    const static_year = static_date.getFullYear();
    const { expenses } = this.props.expense;

    this.calculate(expenses);

    const renderTableData = (
      <Fragment>
        <TransitionGroup component="tbody">
          {expenses.map(({ _id, etiology, ammount, type, date_created }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <tr>
                <td data-label="Date">{date_created}</td>
                <td data-label="Etiology">{etiology}</td>
                <td data-label="Type">{type}</td>
                <td data-label="Ammount">{ammount}</td>

                <td data-label="Edit">
                  <ExpenseModal
                    id={_id}
                    month={this.state.month}
                    year={this.state.year}
                    etiology={etiology}
                    type={type}
                    ammount={ammount}
                    buttonid={<i className="fas fa-edit"></i>}
                    method={"update"}
                  ></ExpenseModal>
                </td>

                <td data-label="Delete">
                  {/* <Button
                    onClick={this.onDeleteClick.bind(this, _id)}
                    color="danger"
                  >
                  
                  </Button> */}
                  <ExpenseModal
                    id={_id}
                    buttonid={<i className="fas fa-eraser"></i>}
                    method={"delete"}
                  ></ExpenseModal>
                </td>
              </tr>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Fragment>
    );
    const total = expenses.reduce(function (prev, cur) {
      return (prev * 10 + cur.ammount * 10) / 10;
    }, 0);
    return (
      <div style={{ textAlign: "center" }}>
        <Row>
          <Col md="3" xs="1" sm="1"></Col>
          <Col md="6" xs="10" sm="10">
            <Card>
              <Row>
                <Col xs="3" sm="3"></Col>
                <Col xs="6" sm="6">
                  <img
                    style={{ height: "50px", width: "50px" }}
                    src="logo192.png"
                    alt="logo"
                  />
                </Col>
                <Col xs="3" sm="3"></Col>
              </Row>
              <CardBody>
                <CardTitle>
                  <h4>Expense Tracker</h4>
                </CardTitle>
                <Row>
                  <Col xs="1" sm="3"></Col>
                  <Col xs="5" sm="3">
                    <select
                      type="select"
                      className="form-control"
                      name="month"
                      id="month"
                      value={this.state.month}
                      onChange={this.onChange}
                    >
                      <option value="0">January</option>
                      <option value="1">Febuary</option>
                      <option value="2">March</option>
                      <option value="3">April</option>
                      <option value="4">May</option>
                      <option value="5">June</option>
                      <option value="6">July</option>
                      <option value="7">August</option>
                      <option value="8">September</option>
                      <option value="9">October</option>
                      <option value="10">November</option>
                      <option value="11">December</option>
                    </select>
                  </Col>
                  <Col xs="5" sm="3">
                    <select
                      type="select"
                      className="form-control"
                      name="year"
                      id="year"
                      onChange={this.onChange}
                      value={this.state.year}
                    >
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                    </select>
                  </Col>
                  <Col xs="1" sm="3"></Col>
                </Row>
                <br></br>
                <CardSubtitle>
                  <Chart chartData={this.state.chartData} />
                  <h6>Ammount</h6>
                  <h3>
                    <Badge color="danger">-{total}€</Badge>
                  </h3>
                </CardSubtitle>
                {static_month === this.state.month &&
                static_year === this.state.year ? (
                  <ExpenseModal
                    month={this.state.month}
                    year={this.state.year}
                    buttoncolor={"success"}
                    buttonid={"Add Expense"}
                    method={"Add"}
                  ></ExpenseModal>
                ) : null}
                <CardText>
                  <Row>
                    <Col xs="2" sm="2"></Col>
                    <Col xs="8" sm="8">
                      <div id="wrapper">
                        <table>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Etiology</th>
                              <th>Type</th>
                              <th>Ammount</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          {renderTableData}
                        </table>
                      </div>
                    </Col>
                    <Col xs="2" sm="2"></Col>
                  </Row>
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="3" xs="1" sm="1"></Col>
        </Row>
      </div>
    );
  }
}
Expenses.propTypes = {
  getExpenses: PropTypes.func.isRequired,
  expense: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  expense: state.expense,
});
export default connect(mapStateToProps, {
  getExpenses,
  deleteExpense,
  addExpense,
})(Expenses);
