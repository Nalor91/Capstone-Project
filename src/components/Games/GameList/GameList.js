import React from 'react';

import GameItem from './GameItem/GameItem';
import './GameList.css';

const GameList = props => {
    const game = props.games.map(game => {
        return (
            <GameItem
                key={game._id}
                gameId={game._id}
                title={game.title}
                description={game.description}
                genre={game.genre}
                difficulty={game.difficulty}
                players={game.players}
                length={game.length}
                status={game.status}
                picture={game.picture}
                onDetail={props.onViewDetail}
            />
        );
    });

    return <ul className="game-list">{game}</ul>;
};

export default GameList;