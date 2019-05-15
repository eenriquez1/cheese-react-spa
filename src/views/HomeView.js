import React, { Component } from "react";
 
class HomeView extends Component {
  render() {
    return (
        
        <div>
        
          <h1>Welcome to Cheese React</h1>
            <h2>Below are the links in order to create your first cheese!</h2>
                <ul className="header">
                    <li><a href="/menus">Menus</a></li>
                    <li><a href="/cheeses">Cheeses</a></li>
                    <li><a href="/categories">Categories</a></li>
                </ul>
          
        </div>
    );
  }
}
 
export default HomeView;