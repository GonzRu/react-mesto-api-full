import React, {useContext} from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Main = ({
                  cards,
                  onCardLike,
                  onCardDelete,
                  onEditAvatar,
                  onEditProfile,
                  onAddPlace,
                  onCardClick
              }) => {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile page__profile">
                <div className="profile__avatar-group">
                    <img
                        src={currentUser?.avatar}
                        alt="Аватар пользователя"
                        className="profile__avatar"/>
                    <button
                        type="button"
                        className="profile__avatar-btn btn-icon"
                        onClick={onEditAvatar}
                    />
                </div>
                <div className="profile__info">
                    <div className="profile__name-wrapper">
                        <h1
                            className="profile__name">
                            {currentUser ? currentUser.name : 'Загрузка...'}
                        </h1>
                        <button
                            type="button"
                            className="profile__edit btn-icon"
                            onClick={onEditProfile}
                        />
                    </div>
                    <p className="profile__description">{currentUser?.about}</p>
                </div>
                <button
                    type="button"
                    onClick={onAddPlace}
                    className="profile__add-photo btn-icon"
                />
            </section>
            <section className="cards page__cards">
                <ul className="cards__list">
                    {cards.map(card =>
                        <Card
                            key={card._id}
                            card={card}
                            onLike={onCardLike}
                            onRemove={onCardDelete}
                            onCardClick={onCardClick}
                        />
                    )}
                </ul>
            </section>
        </main>
    );
};

export default Main;
