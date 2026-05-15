import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

import './MainNavigation.css';

const MainNavigation = (props) => {
    return (
        <AuthContext.Consumer>
            {(context) => {
                return (
                    <header className="main-navigation__header">
                        <div className="main-navigation__logo">
                        </div>
                        <nav className="main-navigation">
                            <ul className="main-navigation__items">
                                {!context.token && (
                                    <li>
                                        <NavLink to="/auth">Login</NavLink>
                                    </li>
                                )}
                                <li>
                                    <NavLink to="/">Home</NavLink>
                                </li>
                                {context.token && (
                                    <li>
                                        <NavLink to="/games">Games</NavLink>
                                    </li>
                                )}
                                {context.token && (
                                    <li>
                                        <NavLink to="/profile">Profile</NavLink>
                                    </li>
                                )}
                                {context.token && (
                                    <li>
                                        <button onClick={context.logout}>
                                            Logout
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </header>
                );
            }}
        </AuthContext.Consumer>
    );
};

export default MainNavigation;
