import React, {useRef, useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar, isLoading}) => {

    const ref = useRef();
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = () => {
        onUpdateAvatar({
            avatar: ref.current.value
        });
    }

    useEffect(() => {
        ref.current.value = '';
        setError('');
    }, [isOpen])


    useEffect(() => {
        const onChange = (e) => {
            setIsValid(e.target.validity.valid)
            setError(e.target.validationMessage)
        }

        ref.current.addEventListener('input', onChange)

        return () => {
            ref.current.removeEventListener('input', onChange)
        }
    }, [])

    return (
        <PopupWithForm
            name='edit-avatar'
            title='Обновить аватар'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isValid={isValid}
        >
            <label className="form__field">
                <input
                    type="url"
                    className="form__textbox"
                    name="link"
                    id="link"
                    placeholder="Ссылка на картинку"
                    ref={ref}
                    required
                />
                <span className="form__error" id="link-error">{error}</span>
            </label>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;
