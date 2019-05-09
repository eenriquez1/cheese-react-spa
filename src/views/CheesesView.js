import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import request from "../utilities/api-request";
import CheesesList from "../components/cheese/CheesesList";
import CheeseForm from "../components/cheese/CheeseForm";
import CheeseCategorySelector from "../components/cheese/CheeseCategorySelector";

class CheesesView extends Component {
  state = {
    // TODO: implement the initial state
    cheeses: [],
    categories: [],
    selectedCategoryID: ""

  };

  async componentDidMount() {
    const cheeseRes = await request.get("/cheeses") // TODO: implement a request to the cheeses collection
    const cheeses = cheeseRes.data;

    const categoriesRes = await request.get("/categories") // TODO: implement a request to the categories collection
    const categories = categoriesRes.data;

    this.setState({ cheeses, categories });
  }

  addToCheeses = cheese =>
    this.setState(state => {
      const { cheeses } = state;
      // TODO: return the new state that merges the cheeses list with the new cheese
      const updatedCheeses = [cheese, ...cheeses];
      return {cheeses: updatedCheeses};
    });

  deleteCheese = async cheeseID => {
    const res =  await request.delete("/cheeses/" + cheeseID)// TODO: implement a request to the correct endpoint to delete the cheese (be mindful of the HTTP method you need)

    // if the DELETE request was unsuccessful exit early
    if (res.status !== 200) { // <-- normally success DELETE is status 204
      return;
    }

    // otherwise update state by removing the cheese
    this.setState(state => {
      const cheeses = state.cheeses.filter(cheese => cheese.id !== cheeseID);
      return { cheeses };
    });
  };

  getCategoryCheeses = async categoryChangeEvent => {
    // extract the chosen option value from the event object
    const selectedCategoryID = categoryChangeEvent.target.value;

    // exit early if the same category ID is chosen
    if (selectedCategoryID === this.state.selectedCategoryID) return;

    // selects the "all cheeses" or "cheeses by category" endpoint depending on the category ID
    const endpoint = selectedCategoryID === "" ? "/cheeses" : `/cheeses/category/${selectedCategoryID}`;

    const res =  await request.get(endpoint);  // TODO: fetch the cheeses using the endpoint
    const cheeses = res.data;

    // updates state with the new selectedCategoryID and cheeses list
    this.setState({ selectedCategoryID, cheeses });
  };

  render() {
    const { cheeses, categories, selectedCategoryID } = this.state;

    return (
      <Container>
        <Row>
					<Col lg={{ span: 8, offset: 2 }}>
            <CheeseForm
              // TODO: complete the props
              addCheese={this.addToCheeses}
              categories={categories}

            />
					</Col>
				</Row>
				<hr />
        <Row className="text-center">
          <Col xs={12} md={8} lg={4}>
            <h5>Cheeses by Category</h5>
            <CheeseCategorySelector
              //TODO: complete the props for this component 
              categories={categories}
              handleChange={this.getCategoryCheeses}
              categoryID={selectedCategoryID}
              firstOption="All Cheeses"
            />
          </Col>
        </Row>
        <CheesesList
          // TODO: complete the props for this component 
          // only show [remove] button if in 'All' category (selectedCategoryID is an empty string)
          cheeses={cheeses}
          removeCheese={selectedCategoryID === "" && this.deleteCheese}
        />
      </Container>
    );
  }
}

export default CheesesView;