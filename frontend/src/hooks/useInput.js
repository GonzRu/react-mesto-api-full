import {useState} from 'react';

export const useInput = (defaultValue, defaultIsValid = false) => {
    const [value, setValue] = useState(defaultValue);
    const [isValid, setIsValid] = useState(defaultIsValid);
    const [error, setError] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
        setIsValid(e.target.validity.valid);
        setError(e.target.validity.valid ? '' : e.target.validationMessage);
    }

    const resetError = () => setError('');

    return {value, setValue, onChange, isValid, error, resetError};
}
