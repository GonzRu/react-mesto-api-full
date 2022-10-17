import React from 'react';
import successImg from '../images/reg_success.svg';
import failImg from '../images/reg_fail.svg';

const InfoTooltip = ({success, isOpen, onClose}) => {

    return (
        <div
            className={`popup ${isOpen && 'popup_opened'}`}
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
                <div className='info-tooltip'>
                    <img
                        alt={success ? 'Успех!' : 'Ошибка'}
                        className='info-tooltip__image'
                        src={success ? successImg : failImg}
                    />
                    <span className='info-tooltip__text'>
                        {success
                            ? 'Вы успешно зарегистрировались!'
                            : <span>Что-то пошло не так! <br/>Попробуйте ещё раз</span>
                        }
                    </span>
                </div>
            </div>
        </div>
    );
};

export default InfoTooltip;
