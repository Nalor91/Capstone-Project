import react, { Component } from "react";

import Modal from "../components/Modal/Modal";
import AuthContext from "../context/auth-context";

import "./Main.css";

class MainPage extends Component {
  static contextType = AuthContext;

  render() {
    return (
      <div className="main-page">
        <header className="main-header">
          <h1>Welcome to GameOn!</h1>
        </header>
            <div className="main-image">
                <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSUTAkLodUbe88MPJ1dQ4lvIFjaWwD_xYyDN4OGu-brjdfI7x_tSeCmyu187I7Dc1tJhWz5AXatjuHChdlQfJzQdD4wLQei8Dnud9Oj4aQRg1v2vR_QUmsJ&usqp=CAc" />
            </div>
        <div className="main-content">
            <p>
            A platform for renting and playing board games. Share our passion for
            gaming with others! Whether you're a casual player or a dedicated
            enthusiast, we have something for everyone.
            </p>

            <p>
            Explore our extensive collection of board games, connect with fellow
            gamers, and discover new favorites. Join us today and let the fun
            begin!
            </p>
        </div>
        <footer className="copyright">Copyright &copy; 2026 GameOn. All rights reserved.</footer>
      </div>
    );
  }
}

export default MainPage;
