import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from '../hooks/useForm';

const Register = ({onRegistration}) => {

    const {errors, onChange, isValid, setIsValid, values, setValues} = useForm({email: '', password: ''});

    const submitHandler = (e) => {
        e.preventDefault();

        onRegistration({
            email: values.email,
            password: values.password,
        });
    }

    return (
        <div className='page__sign-in'>
            <form
                className="form form_theme_dark"
                name='registration'
                noValidate
                onSubmit={submitHandler}
            >
                <h2 className="form__header from__header_theme_dark">Регистрация</h2>
                <label className="form__field">
                    <input
                        type="email"
                        className="form__textbox from__textbox_theme_dark"
                        name="email"
                        id="edit-profile-form-name"
                        placeholder="Email"
                        required
                        value={values.email}
                        onChange={onChange}
                    />
                    <span className="form__error" id="edit-profile-form-name-error">{errors.email}</span>
                </label>
                <label className="form__field">
                    <input
                        type="password"
                        className="form__textbox from__textbox_theme_dark"
                        name="password"
                        id="edit-profile-form-name"
                        placeholder="Пароль"
                        required minLength='4'
                        value={values.password}
                        onChange={onChange}
                    />
                    <span className="form__error" id="edit-profile-form-name-error">{errors.password}</span>
                </label>
                <button
                    type="submit"
                    disabled={!isValid}
                    className='form__save-btn from__save-btn_theme_dark'
                >
                    Зарегистрироваться
                </button>
                <Link to='/sign-in' className='sign-up__has-account'>Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    );
};

export default Register;
