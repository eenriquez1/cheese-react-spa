import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import request from "../utilities/api-request";
import MenusList from "../components/menu/MenusList";
import MenuForm from "../components/menu/MenuForm";

class MenusView extends Component {
  state = {
    menus: [],
  };

  async componentDidMount() {
    // TODO: request the menus from the API
    // TODO: update state with the menus
    const menuRes = await request.get("/menus");
    const menus = menuRes.data;
    this.setState({menus});
  }

    addToMenus = newMenu => 
    // TODO: implement this method
      // it should merge the new menu with the existing menus
      this.setState(state => {
        const { menus } = state;
        const updatedMenus = [newMenu, ...menus];
        return { menus: updatedMenus };
        });

    render() {
    const { menus } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <MenuForm
              addMenu={this.addToMenus}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <MenusList
              menus={menus}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MenusView;