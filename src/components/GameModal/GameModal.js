import React from "react";
import Modal from "../Modal/Modal";

const GameModal = ({
  game,
  onCancel,
  onConfirm
}) => {
    if (!game) return null;

    return (
        <Modal
        title={game.title}
        canCancel
        canConfirm
        onCancel={onCancel}
        onConfirm={onConfirm}
        confirmText="Rent"
        >
        <h2>
            Genre: {game.genre?.join(", ") || "N/A"}
        </h2>

        <img
            className="modal-img"
            src={game.picture}
            alt={game.title}
        />

        <p>{game.description}</p>
        <p>Difficulty: {game.difficulty}</p>
        <p>Players: {game.players}</p>
        <p>Length: {game.length}</p>
        </Modal>
    );
    };

export default GameModal;