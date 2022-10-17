import React, {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import {useInput} from '../hooks/useInput';

const AddPlacePopup = ({isOpen, onClose, onAddPlace, isLoading}) => {

    const name = useInput('');
    const link = useInput('');
    const [isValid, setIsValid] = useState(false);

    const onSubmit = () => {
        onAddPlace({
            name: name.value,
            link: link.value,
        });
    }

    useEffect(() => {
        name.setValue('');
        name.resetError();
        link.setValue('');
        link.resetError();
    }, [isOpen])

    useEffect(() => {
        setIsValid(name.isValid && link.isValid);
    }, [name, link])

    return (
        <PopupWithForm
            name='add-place'
            title='Новое место'
            submitText='Создать'
            loadingSubmitText='Создаю...'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isValid={isValid}
        >
            <label className="form__field">
                <input
                    type="text"
                    className="form__textbox"
                    name="name"
                    id="add-card-form-name"
                    placeholder="Название"
                    required
                    minLength="2"
                    maxLength="30"
                    value={name.value}
                    onChange={name.onChange}
                />
                <span className="form__error" id="add-card-form-name-error">{name.error}</span>
            </label>
            <label className="form__field">
                <input
                    type="url"
                    className="form__textbox"
                    name="link"
                    id="add-card-form-link"
                    placeholder="Ссылка на картинку"
                    required
                    value={link.value}
                    onChange={link.onChange}
                />
                <span className="form__error" id="add-card-form-link-error">{link.error}</span>
            </label>
        </PopupWithForm>
    );
};

export default AddPlacePopup;
