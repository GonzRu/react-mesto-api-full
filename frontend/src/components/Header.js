import React, {useState} from 'react';
import logo from '../images/logo.svg';
import {Link, useLocation} from 'react-router-dom';

const Header = ({isLoggedIn, user, onLoggedOut}) => {

    const location = useLocation();
    const [topMenuVisible, setTopMenuVisible] = useState(false);

    const unauthorized = location.pathname === '/sign-in'
        ? (<Link to='/sign-up' className='header__sign-in'>Регистрация</Link>)
        : (<Link to='/sign-in' className='header__sign-in'>Войти</Link>)

    const onBurgerClick = () => setTopMenuVisible(v => !v);

    return (
        <header className="header page__header">
            {isLoggedIn &&
                <div className={`header__top-user-container ${topMenuVisible && 'header__top-user-container_visible'}`}>
                    <span className='header__email'>{user?.email}</span>
                    <span className='header__sign-out' onClick={onLoggedOut}>Выйти</span>
                </div>
            }
            <div className='header__container'>
                <img
                    src={logo}
                    alt="Логотип"
                    className="header__logo"
                />
                {isLoggedIn
                    ?
                    <>
                        <div className="header__user-container">
                            <span className='header__email'>{user?.email}</span>
                            <span className='header__sign-out' onClick={onLoggedOut}>Выйти</span>
                        </div>
                        {topMenuVisible
                            ?
                            <div
                                className='header__close'
                                onClick={onBurgerClick}
                            />
                            :
                            <div
                                className='header__burger'
                                onClick={onBurgerClick}
                            />
                        }

                    </>
                    :
                    unauthorized
                }
            </div>
        </header>
    );
};

export default Header;
