import React from "react";

import './Filter.css';

const FilterArea = ({
    filter,
    filterChangeHandler,
    applyFilters,
    resetFilters
    }) => {
    return (
        <div className="filters">
        <input
            type="text"
            name="title"
            placeholder="Search title"
            value={filter.title}
            onChange={filterChangeHandler}
        />

        <select
            name="genre"
            value={filter.genre}
            onChange={filterChangeHandler}
        >
            <option value="">All Genres</option>
            <option value="Environmental">Environmental</option>
            <option value="Party Game">Party Game</option>
            <option value="Bluffing">Bluffing</option>
            <option value="Humor">Humor</option>
            <option value="Animalsl">Animals</option>
            <option value="Economic">Economic</option>
            <option value="Auction">Auction</option>
            <option value="Horror">Horror</option>
            <option value="Zombies">Zombies</option>
            <option value="Miniatures">Miniatures</option>
            <option value="Fighting">Fighting</option>
            <option value="Card Game">Card Game</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Deck Building">Deck Building</option>
            <option value="Trivia">Trivia</option>
            <option value="City Building">City Building</option>
            <option value="Trains">Trains</option>
            <option value="Medieval">Medieval</option>
            <option value="Market">Market</option>
            <option value="Post Napoleonic">Post Napoleonic</option>
            <option value="Action">Action</option>
            <option value="Travel">Travell</option>
            <option value="Transportation">Transportation</option>
            <option value="Civilization">Civilization</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Space Exploration">Space Exploration</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Deduction">Deduction</option>
            <option value="Memory">Memory</option>
            <option value="Dice">Dice</option>
            <option value="Exploration">Exploration</option>
            <option value="Mature">Mature</option>
            <option value="Renaissance">Renaissance</option>
            <option value="Territory Building">Territory Building</option>
            <option value="Ancient">Ancient</option>
            <option value="Adventure">Adventure</option>
            <option value="Strategy">Strategy</option>
            <option value="Medical">Medical</option>
            <option value="Farming">Farming</option>
            <option value="Industry">Industry</option>
            <option value="Social">Social</option>
            <option value="Spies">Spies</option>
            <option value="Word Game">Word Game</option>
            <option value="Educational">Educational</option>
            <option value="Political">Political</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Mythology">Mythology</option>
            <option value="History">History</option>
            <option value="Abstract Strategy">Abstract Strategy</option>
            <option value="Aviation">Aviation</option>
            <option value="Racing">Racing</option>
            <option value="Nautical">Nautical</option>
            <option value="Pirates">Pirates</option>
            <option value="Future">Future</option>
            <option value="Novel Based">Novel Based</option>
            <option value="Sports">Sports</option>
            <option value="Draft">Draft</option>
            <option value="Real Time">Real Time</option>
        </select>

        <select
            name="difficulty"
            value={filter.difficulty}
            onChange={filterChangeHandler}
        >
            <option value="">Any Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
        </select>

        <button onClick={applyFilters}>
            Apply Filters
        </button>

        <button onClick={resetFilters}>
            Reset
        </button>
        </div>
    );
    };

export default FilterArea;