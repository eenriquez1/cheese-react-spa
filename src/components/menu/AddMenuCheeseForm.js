import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import request from "../../utilities/api-request";
import { cheeseType, menuType } from "../../utilities/prop-types";
import CheesesList from "../cheese/CheesesList";

// if your face melted trying to understand this look below!
const filterAvailableCheeses = (currentCheeses, allCheeses) =>
  allCheeses.filter(
    availableCheese =>
      !currentCheeses.some(
        currentCheese => currentCheese.id === availableCheese.id,
      ),
  );

const createCheeseOption = cheese => (
  // TODO: complete this utility function
  <option key={cheese.id} value={cheese.id}>
        {cheese.name}
    </option>
 

);

class AddMenuCheeseForm extends Component {
  state =  {
    // TODO: implement initial state
    cheeseID: "",
    allCheeses: []
  }

  // TODO: reset the cheeseID value
  resetForm = () => this.setState({ cheeseID: '' });

  async componentDidMount() {
    // get the full list of cheeses
    const res = await request.get("/cheeses");
    const allCheeses = res.data;

    this.setState({ allCheeses });
  }

  handleInputChange = event => {
    // TODO: update state when the select input changes
    const { value } = event.target;
    this.setState({ cheeseID: value});
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { menuID, addCheese } = this.props;
    const { allCheeses, cheeseID } = this.state;

    // TODO: make an API request using the correct endpoint and data
    // check the API reference to see how to add a cheese to a menu
    const res = await request.post("/menus/" + menuID + "/cheeses", { cheeseID });

    // if the request failed exit early
    if (res.status !== 201) {
      return;
    }

    // finds the cheese using its ID
    // Number(cheeseID) is to ensure the form's string cheeseID is comparable to the number cheese.id
    const cheese = allCheeses.find(cheese => cheese.id === Number(cheeseID));

    // TODO: give the cheese to the MenuView Parent component
    addCheese(cheese);
    // TODO: reset the form
    this.resetForm();
  };

  render() {
    const { currentCheeses } = this.props;
    const { cheeseID, allCheeses } = this.state;

    let availableCheeses = []; // TODO: derive the available cheeses with the utility function
    availableCheeses = filterAvailableCheeses(currentCheeses, allCheeses);

    // TODO: complete the if statement
    // render null if the available cheeses list is empty
    if (availableCheeses === "") {
      return null;
    }

    // can you rewrite this if / return section using the short circuit expression?
    // condition && ( );

    return (
      <Container className="text-center">
        <Form>
          <Form.Group as={Col} sm={{ offset: 4, span: 4 }}>
            <Form.Control
              as="select"
              name="cheeseID"
              value={cheeseID}
              onChange={this.handleInputChange}
            >
              <option value="">Select a Cheese</option>
              {/* TODO: transform availableCheeses into option elements */}
                {availableCheeses.map(createCheeseOption)}
              {}
            </Form.Control>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            disabled={cheeseID === ""}
            onClick={this.handleSubmit}
          >
            Add Cheese
          </Button>
        </Form>
      </Container>
    );
  }
}

AddMenuCheeseForm.propTypes = {
  // TODO: complete the prop types
  addCheese: PropTypes.func.isRequired,
  currentCheeses: PropTypes.arrayOf(cheeseType).isRequired,
 




};

export default AddMenuCheeseForm;