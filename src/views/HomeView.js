import React, { Component } from "react";
 
class HomeView extends Component {
  render() {
    return (
        <div>
          <h1 className="text-center">Welcome to Cheese React</h1>
            <h2 className="text-center">Below are the links in order to create your first cheese!</h2>
                <ul className="text-center">
                 <li><a href="/cheeses">Cheeses</a></li>
                 <li><a href="/menus">Menus</a></li>
                 <li><a href="/categories">Categories</a></li>
                </ul>
        <div className="content">
             
          </div>
        </div>
    );
  }
}
 
export default HomeView;