import React from 'react';

const PopupWithForm = ({
                           name,
                           title,
                           children,
                           isOpen,
                           onClose,
                           onSubmit,
                           isLoading,
                           isValid = true,
                           submitText = 'Сохранить',
                           loadingSubmitText = 'Сохранение...',
                       }) => {

    const submitHandler = e => {
        e.preventDefault();
        onSubmit();
    }

    return (
        <div
            className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}
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
                <form
                    className="form"
                    name={name}
                    noValidate
                    onSubmit={submitHandler}
                >
                    <h2 className="form__header">{title}</h2>
                    {children}
                    <button
                        type="submit"
                        disabled={!isValid}
                        className='form__save-btn'
                    >
                        {isLoading ? loadingSubmitText : submitText}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;
