import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MainNavigation from './components/Navigation/MainNavigation';
import './App.css';

import ProfilePage from './pages/profile';
import GamesPage from './pages/games';
import MainPage from './pages/main';
import AuthPage from './pages/auth';
import AuthContext from './context/auth-context';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Routes>
                {!this.state.token && (
                  <Route path="/main" element={<MainPage />} />
                )}
                {this.state.token && (
                  <Route path="/main" element={<MainPage />} />
                )}
                {this.state.token && (
                  <Route path="/games" element={<GamesPage /> } />
                )}
                {!this.state.token && (
                  <Route path="/auth" element={<AuthPage />} />
                )}
                {this.state.token && (
                  <Route path="profile" element={<ProfilePage/>} />
                )}
                <Route path="/" element={<Navigate to="/main" />} />
              </Routes>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
