import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import {useEffect, useState} from 'react';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import {api} from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import RemovePlacePopup from './RemovePlacePopup';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {

    const history = useHistory();

    // isOpen
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = useState(false);
    const [infoTooltip, setInfoTooltip] = useState({isOpen: false, success: false});

    // isLoading
    const [isLoading, setIsLoading] = useState(false);

    const [currentUser, setCurrentUser] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [cards, setCards] = useState([]);
    const [removedCard, setRemovedCard] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);

    const onEditAvatar = () => setIsEditAvatarPopupOpen(true);
    const onEditProfile = () => setIsEditProfilePopupOpen(true);
    const onAddPlace = () => setIsAddPlacePopupOpen(true);
    const onCloseAll = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsRemovePlacePopupOpen(false);
        setInfoTooltip({isOpen: false, success: false});
        setRemovedCard(null);
        setSelectedCard(null);
    }
    const onCardClick = (card) => setSelectedCard(card);

    const doRequest = (promise) => {
        setIsLoading(true);
        promise
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }

    const onUpdateUser = (data) => {
        doRequest(api.updateMyUser(data)
            .then(user => {
                setCurrentUser(user);
                onCloseAll();
            }));
    }

    const onUpdateAvatar = (data) => {
        doRequest(api.updateAvatar(data)
            .then(user => {
                setCurrentUser(user);
                onCloseAll();
            }));
    }

    const onCardLike = (card, like) => {
        const promise = like ? api.likeCard(card._id) : api.unlikeCard(card._id);

        promise
            .then(card => {
                const newCardsList = cards.map(c => c._id === card._id ? card : c);

                setCards(newCardsList);
            })
            .catch(error => console.log(error));
    }

    const onCreateCard = (data) => {
        doRequest(api.createCard(data)
            .then(card => {
                setCards([card, ...cards]);
                onCloseAll();
            }));
    }

    const onCardDelete = card => {
        setRemovedCard(card);
        setIsRemovePlacePopupOpen(true);
    }

    const onRemoveCard = () => {
        doRequest(api.removeCard(removedCard._id)
            .then(res => {
                setCards(cards.filter(c => c._id !== removedCard._id));
                onCloseAll();
            }));
    }

    const loadCurrentUser = () => {
        return api.getMyUser()
            .then(user => setCurrentUser(user))
            .catch(error => console.log(error));
    }

    const onLoggedIn = (data) => {
        api.signIn(data.email, data.password)
            .then(res => {
                const jwt = res.token;
                localStorage.setItem('jwt', jwt);
                setIsLoggedIn(true);
                history.push('/');
                loadCurrentUser();
            })
            .catch(err => console.log(err));
    }

    const onLoggedOut = () => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        history.push('/sign-in');
    }

    const onRegistration = (data) => {
        api.signUp(data.email, data.password)
            .then(res => {
                setInfoTooltip({isOpen: true, success: true});
                history.push('/sign-in');
            })
            .catch(err => {
                setInfoTooltip({isOpen: true, success: false});
            });
    }

    useEffect(() => {
        loadCurrentUser()
            .then(() => setIsLoggedIn(true));
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then(cards => setCards(cards))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        const onMouseDown = e => {
            if (e.key === 'Escape') {
                onCloseAll();
            }
        }

        if (isEditProfilePopupOpen || isEditAvatarPopupOpen ||
            isRemovePlacePopupOpen || isAddPlacePopupOpen) {
            document.addEventListener('keydown', onMouseDown);

            return () => {
                document.removeEventListener('keydown', onMouseDown);
            }
        }
    }, [
        isEditProfilePopupOpen,
        isEditAvatarPopupOpen,
        isRemovePlacePopupOpen,
        isAddPlacePopupOpen
    ])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <Header
                    isLoggedIn={isLoggedIn}
                    onLoggedOut={onLoggedOut}
                    user={currentUser}
                />
                <Switch>
                    <Route exact path='/'>
                        <Main
                            cards={cards}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                            onCardClick={onCardClick}
                            onEditAvatar={onEditAvatar}
                            onEditProfile={onEditProfile}
                            onAddPlace={onAddPlace}
                        />
                    </Route>
                    <Route path="/sign-in">
                        <Login onLoggedIn={onLoggedIn}/>
                    </Route>
                    <Route path="/sign-up">
                        <Register onRegistration={onRegistration}/>
                    </Route>
                    <Redirect to='/'/>
                </Switch>
                <Footer/>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={onCloseAll}
                    onUpdateUser={onUpdateUser}
                    isLoading={isLoading}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={onCloseAll}
                    onAddPlace={onCreateCard}
                    isLoading={isLoading}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={onCloseAll}
                    onUpdateAvatar={onUpdateAvatar}
                    isLoading={isLoading}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={onCloseAll}
                />
                <RemovePlacePopup
                    isOpen={isRemovePlacePopupOpen}
                    onRemove={onRemoveCard}
                    onClose={onCloseAll}
                    isLoading={isLoading}
                />
                <InfoTooltip
                    isOpen={infoTooltip.isOpen}
                    onClose={onCloseAll}
                    success={infoTooltip.success}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
