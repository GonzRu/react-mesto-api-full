import React from 'react';

const ImagePopup = ({card, onClose, onLike}) => {

    if (!card) return null;

    return (
        <div
            className="popup popup_type_card-details popup_opened"
            onClick={onClose}
        >
            <div
                className="popup__container"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="popup__close-btn btn-icon"
                    onClick={onClose}
                ></button>
                <div className="card-details">
                    <img
                        src={card.link}
                        alt={card.name}
                        onClick={onLike}
                        className="card-details__image"
                    />
                    <p
                        className="card-details__description">
                        {card.name}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImagePopup;
