import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import request from '../../utilities/api-request';
import { categoryType } from '../../utilities/prop-types';
import CheeseCategorySelector from "./CheeseCategorySelector";

const shouldDisable = fields => {
  // TODO: implement the utility
   // disabled flag, notice we use "let"
  // this is to allow the variable to be re-assigned in the loop
  let disabled = false;

  for (const [fieldName, value] of Object.entries(fields)) {
    if (fieldName === "name") {
      // name field less than 3 or greater than 15 characters should disable
      if (value.length < 3 || value.length > 15) {
        disabled = true;
      }
      // other fields that are empty strings should disable
    } else if (value === "") {
      disabled = true;
    }
  }

  return disabled;
};
// we write the initial state object externally
// this way we can use it both to set initial state and when resetting the form
// single source of truth, DRY principles!
const initialState = {
  // TODO: implement initial state
  disabled: true,
  fields: 
      {
       name: "", description: "", categoryID: "" 
  }
}

class CheeseForm extends Component {
  state = initialState;

  // resets the form by setting state back to the initial state
  resetForm = () => this.setState(initialState);

  handleInputChange = event => {
    const { name, value } = event.target;
    const disabled = shouldDisable(value);

    this.setState(currentState => {
      // TODO: implement the rest of the change handler
      const { fields } = currentState;
      const updatedFields = { ...fields };
      updatedFields[name] = value;
      
      return { fields: updatedFields, disabled };
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { fields } = this.state;
    const { addCheese } = this.props;

    // TODO: submit the form with a request to the API
    const res = await request.post("/cheeses", fields);// use the correct request method, endpoint, and data
    const cheese = res.data;

    // TODO: report the new cheese data to the <CheesesView> Parent
    addCheese(cheese);
    this.resetForm();
  }

  render() {
    const { categories } = this.props;
    const { disabled, fields: { name, description, categoryID } } = this.state;

    return (
      <Form className="text-center">
        <h2>Create a Cheese</h2>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Cheese Name</Form.Label>
            <Form.Control
              name='name'
              value={name}
              minLength={3}
              maxLength={15}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Cheese Category</Form.Label>
            {/* TODO: render the <CheeseCategorySelector> with appropriate props */}
            <CheeseCategorySelector
              categories={categories}
              categoryID={categoryID}
              handleChange={this.handleInputChange}

                />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Cheese Description</Form.Label>
            <Form.Control
              name='description'
              // TODO: complete the props for this component
              value={description}
              onChange={this.handleInputChange}

            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Col>
            <Button
              type='submit'
              variant='primary'
              // TODO: complete the props for this component
              disabled={disabled}
              onClick={this.handleSubmit}
            >
              Create Cheese
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

CheeseForm.propTypes = {
  // TODO: implement the prop types
  categories: PropTypes.arrayOf(categoryType).isRequired,
  categoryID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,

};

export default CheeseForm;