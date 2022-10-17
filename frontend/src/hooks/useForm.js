
import {useState, useCallback} from 'react';

export function useForm(defaultValues = {}) {
    const [ values, setValues ] = useState(defaultValues);
    const [ errors, setErrors ] = useState({});
    const [ isValid, setIsValid ] = useState(true);

    const onChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value });
        setErrors({...errors, [name]: e.target.validationMessage});
        setIsValid(e.target.closest('form').checkValidity());
    };

    const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
    }, [setValues, setErrors, setIsValid]);

    return { values, onChange, errors, isValid, resetForm, setValues, setIsValid };
}

