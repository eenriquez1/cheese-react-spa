import React, { Component } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import request from "../../utilities/api-request";
import Container from "react-bootstrap/Container";
class CategoryForm extends Component {
  state = {
    // TODO: implement initial state 
    name: "",
    disabled: true,
  };
  handleInputChange = event => {
    // the value attribute of the input that was changed
    const { value } = event.target;
    // TODO: implement an expression that will set disabled based on the validity of the input value
    // true means the button is disabled
    // false means the button is enabled, the form can be submitted
    const disabled = value.length < 3 || value.length > 15;
    // TODO: update state with the new values of "disabled" and "name"
    this.setState({ name: value, disabled });
  };
  // sets the value to an empty string to reset the form
  resetForm = () => this.setState({ name: '' });
  handleSubmit = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    const { addCategory } = this.props;
    const res = await request.post("/categories", { name }); // TODO: send a POST request with the form data (don't forget to await the Promise!)
    const category = res.data;
    // TODO: send the new category back to the <CategoriesView> Parent
    addCategory(category);
    this.resetForm();
  };
  render() {
    const { disabled, name } = this.state;
    return (<Container className="text-center">
      <h2>Create a Category</h2>
      <Form>
        <Form.Group as={Col} sm={{ offset: 4, span: 4 }}>
          <Form.Label>Category Name</Form.Label>
          <Form.Control name="name"
            // TODO: implement the remaining props
            value={name} minLength="3" maxLength="15" onChange={this.handleInputChange} />
        </Form.Group>

        <Button type="submit" variant="primary"
          // TODO: implement the remaining props
          disabled={disabled} onClick={this.handleSubmit}>
          Create
          </Button>
      </Form>
      <hr />
    </Container>);
  }
}
CategoryForm.propTypes = {
  // TODO: implement the prop types for this component (see below)
  addCategory: PropTypes.func.isRequired,
};
export default CategoryForm;
