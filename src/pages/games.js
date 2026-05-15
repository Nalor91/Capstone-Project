import React, { Component } from "react";

import GameList from "../components/Games/GameList/GameList";
import Spinner from "../components/Spinner/Spinner";
import Backdrop from "../components/Backdrop/Backdrop";
import FilterArea from "../components/SearchFilter/Filter";
import GamesHeader from "../components/GameHeader/GameHeader";
import GameModal from "../components/GameModal/GameModal";
import Pagination from "../components/Pagination/Pagination";

import AuthContext from "../context/auth-context";
import "./Games.css";

class GamesPage extends Component {
  state = {
    creating: false,
    games: [],
    isLoading: false,
    selectedGame: null,

    filter: {
      title: "",
      genre: "",
      difficulty: "",
      players: "",
    },

    currentPage: 1,
    totalGames: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    limit: 10,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleEl = React.createRef();
    this.rentalDateEl = React.createRef();
  }

  componentDidMount() {
    this.fetchEvents();
  }

  modalRentHandler = () => {  
    const gameId = this.state.selectedGame?._id;

    if (!gameId) return;

    const requestBody = {
      query: `
        mutation RentGame($gameId: ID!) {
          rentGame(gameId: $gameId) {
            _id
            game {
              _id
              title
            }          
            rentalDate
          }
        }
      `,
      variables: {
        gameId: String(gameId),
      },
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        const title = resData?.data?.rentGame?.game?.title;

        alert(`Successfully Rented "${title}"`)
        console.log("Successfully Rented:", resData);
        this.setState({
          selectedGameId: null,
          selectedGame: null
        });
      })      
      .catch(console.log);
  };

  modalCancelHandler = () => {
    this.setState({ selectedGame: null });
  };

  fetchEvents(page = 1) {
    this.setState({ isLoading: true });

    const requestBody = {
      query: `
        query GetGames($page: Int!, $limit: Int!, $filter:GameFilter) {     
          games(page: $page, limit: $limit, filter: $filter) {     
            games {
              _id
              title
              description
              genre
              picture
              difficulty
              players
              length
              status
            }
            
            pageInfo {
              currentPage
              totalPages
              totalGames
              hasNextPage
              hasPreviousPage
            }
          }          
        }
      `,
      variables: {
        page: page,
        limit: this.state.limit,
        filter: this.state.filter,
      },
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        const response = resData.data.games;

        this.setState({
          games: response.games,
          totalGames: response.pageInfo.totalGames,
          hasNextPage: response.pageInfo.hasNextPage,
          hasPreviousPage: response.pageInfo.hasPreviousPage,
          currentPage: response.pageInfo.currentPage,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  filterChangeHandler = (event) => {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      filter: {
        ...prevState.filter,
        [name]: value,
      },
    }));
  };

  applyFilters = () => {
    this.fetchEvents(1);
  };

  resetFilters = () => {
    this.setState(
      {
        filter: {
          title: "",
          genre: "",
          difficulty: "",
          players: "",
        },
      },
      () => {
        this.fetchEvents(1);
      },
    );
  };

  nextPageHandler = () => {
    this.fetchEvents(this.state.currentPage + 1);
  };

  previousPageHandler = () => {
    this.fetchEvents(this.state.currentPage - 1);
  };

  showDetailHandler = (gameId) => {
    const selectedGame = this.state.games.find(
      (g) => g._id === gameId
    );

    if (!selectedGame) {
      console.log("Game not found:", gameId);
      return;
    }

    this.setState({ selectedGame});
  };

  render() {
    return (
      <React.Fragment>
        <div className="page">
          {this.state.selectedGame && <Backdrop />}

          <GamesHeader />

          <FilterArea
            filter={this.state.filter}
            filterChangeHandler={this.filterChangeHandler}
            applyFilters={this.applyFilters}
            resetFilters={this.resetFilters}
          />

          <GameModal
            game={this.state.selectedGame}
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalRentHandler}
          />

          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <GameList
              games={this.state.games}
              authUserId={this.context.userId}
              onViewDetail={this.showDetailHandler}
            />
          )}

          <Pagination
            currentPage={this.state.currentPage}
            hasPreviousPage={this.state.hasPreviousPage}
            hasNextPage={this.state.hasNextPage}
            onPrevious={this.previousPageHandler}
            onNext={this.nextPageHandler}
          />

          <footer className="copyright">
            Copyright &copy; 2026 GameOn. All rights reserved.
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default GamesPage;
