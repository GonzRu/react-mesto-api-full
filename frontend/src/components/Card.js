import React, {useContext} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Card = ({card, onCardClick, onLike, onRemove}) => {

    const currentUser = useContext(CurrentUserContext);

    const likesCount = card.likes.length;
    const isLiked = card.likes.some(like => like === currentUser?._id);
    const isOwn = card.owner === currentUser?._id;

    const likeClasses = isLiked
        ? 'card__like btn-icon card__like_active'
        : 'card__like btn-icon';

    return (
        <li className="card">
            {isOwn &&
                <div
                    className="card__trash btn-icon"
                    onClick={() => onRemove(card)}
                ></div>}
            <img src={card.link}
                 alt={card.name}
                 className="card__image"
                 onClick={() => onCardClick(card)}
            />
            <div className="card__body">
                <h2 className="card__caption">{card.name}</h2>
                <div className="card__like-group">
                    <button type="button"
                            className={likeClasses}
                            onClick={(event) => {
                                event.stopPropagation();
                                onLike(card, !isLiked);
                            }}
                    ></button>
                    <span className="card__like-count">{likesCount}</span>
                </div>
            </div>
        </li>
    );
};

export default Card;
