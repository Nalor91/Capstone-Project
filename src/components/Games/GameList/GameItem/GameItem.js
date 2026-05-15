import React from "react";

import './GameItem.css';

const GameItem = props => (
    <li key={props.gameId} className="game-item">
        <div className="thumbnail">
            <img src={props.picture}/>
        </div>
        <div>
            <h1>{props.title}</h1>
        </div>
        <div>            
            <button className="btn" onClick={() => props.onDetail(props.gameId)}>
                View Details
            </button>            
        </div>
    </li>
);

export default GameItem;