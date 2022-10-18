import React from 'react';
import {useForm} from '../hooks/useForm';

const Login = ({onLoggedIn}) => {

    const {errors, onChange, isValid, values} = useForm({email: '', password: ''});

    const submitHandler = (e) => {
        e.preventDefault();

        onLoggedIn({
            email: values.email,
            password: values.password,
        });
    }

    return (
        <div className='page__sign-in'>
            <form
                className="form form_theme_dark"
                name='login'
                noValidate
                onSubmit={submitHandler}
            >
                <h2 className="form__header from__header_theme_dark">Войти</h2>
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
                    Войти
                </button>
            </form>
        </div>
    );
};

export default Login;
