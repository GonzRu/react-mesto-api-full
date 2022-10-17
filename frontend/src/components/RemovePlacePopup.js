import React from 'react';
import PopupWithForm from './PopupWithForm';

const RemovePlacePopup = ({isOpen, onClose, onRemove}) => {

    const onSubmit = () => {
        onRemove();
    }

    return (
        <PopupWithForm
            name='card-remove'
            title='Вы уверены?'
            submitText='Да'
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={onSubmit}
        >
        </PopupWithForm>
    );
};

export default RemovePlacePopup;
