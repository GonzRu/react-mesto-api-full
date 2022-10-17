import React, {useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import {useForm} from '../hooks/useForm';

const EditProfilePopup = ({isOpen, onClose, onUpdateUser, isLoading}) => {

    const currentUser = React.useContext(CurrentUserContext);
    const {errors, onChange, isValid, resetForm, setIsValid, values, setValues} = useForm({name: '', about: ''});

    useEffect(() => {
        if (currentUser) {
            resetForm(
                {
                    name: currentUser.name,
                    about: currentUser.about,
                },
                {},
                true
            );
        }
    }, [currentUser, isOpen]);

    useEffect(() => {
        if (currentUser) {
            if (values.name === currentUser.name &&
                values.about === currentUser.about) {
                setIsValid(false);
            }
        }
    }, [values])

    const onSubmit = () => {
        onUpdateUser(values);
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
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
                    id="edit-profile-form-name"
                    placeholder="Имя"
                    required minLength="2"
                    maxLength="40"
                    value={values.name}
                    onChange={onChange}
                />
                <span className="form__error" id="edit-profile-form-name-error">{errors.name}</span>
            </label>
            <label className="form__field">
                <input
                    type="text"
                    className="form__textbox"
                    name="about"
                    id="edit-profile-form-description"
                    placeholder="Профессия"
                    required minLength="2"
                    maxLength="200"
                    value={values.about}
                    onChange={onChange}
                />
                <span
                    id="edit-profile-form-description-error"
                    className="form__error"
                >{errors.about}</span>
            </label>
        </PopupWithForm>
    );
};

export default EditProfilePopup;
