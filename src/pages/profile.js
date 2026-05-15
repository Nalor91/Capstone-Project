import React, { Component } from "react";
import AuthContext from "../context/auth-context";

class ProfilePage extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        rentedGames: [],
        isLoading: false
    };

    static contextType = AuthContext;

    componentDidMount() {
        this.fetchProfile();
    }

    fetchProfile = () => {
        this.setState({ isLoading: true }); 

        const requestBody = {
            query: `
                query {
                    profile {
                        _id
                        firstName
                        lastName
                        email
                        rentedGames {
                            _id
                            title
                            picture
                        }
                    }
                }
            `
        };

        fetch("http://localhost:8000/graphql", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.context.token
            }
        })
            .then((res) => res.json())
            .then((resData) => {
                console.log(resData.errors);

                this.setState({
                    isLoading: false
                });

                if (!resData.data || !resData.data.profile) {
                    this.setState({
                        isLoading: false
                    });
                    return;
                }

                const user = resData.data.profile;

                this.setState({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    rentedGames: user.rentedGames || [],
                    isLoading: false
                });
            })
    };

    returnGameHandler = (gameId) => {
        const requestBody = {
            query: `
                mutation ReturnGame($gameId: ID!) {
                    returnGame(gameId: $gameId) {
                        _id
                    }
                }
            `,
            variables: {
                gameId: gameId
            }
        };

        fetch("http://localhost:8000/graphql", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.context.token
            }
        })
        .then(res => res.json())
        .then(resData => {
            console.log("Returned game:", resData);

            // refresh profile after return
            this.fetchProfile();
        })
        .catch(err => {
            console.log(err);
        });
    };

    render() {
        return (
            <div className="profile-page">
                <h1>User Profile</h1>

                <h2>{this.state.firstName} {this.state.lastName}</h2>

                <p>{this.state.email}</p>

                <h3>Rented Games</h3>

                <div className="rented-games">
                    {this.state.rentedGames.map((game) => (
                        <div key={game._id} className="rented-game-card">
                            <img src={game.picture}/>
                            <p>{game.title}</p>

                            <button 
                                onClick={() => this.returnGameHandler(game._id)}
                            >
                                Return Game
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ProfilePage;